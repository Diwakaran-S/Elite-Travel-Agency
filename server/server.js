require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const fs   = require('fs');
const path = require('path');
const express = require('express');
const cors    = require('cors');
const OpenAI  = require('openai');
const systemPrompt = require('./prompts/systemPrompt');
const { puppeteerSearch, isTravelQuery } = require('./utils/puppeteerSearch');

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ──────────────────────────────────────────
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// ── Static: AI chat UI at /agent ──────────────────────────
app.use('/agent', express.static(path.join(__dirname, '../client')));

// ── Static: Built React app at root ──────────────────────
const reactDist = path.join(__dirname, '../Elite Travel Agency/dist');
if (fs.existsSync(reactDist)) {
    app.use(express.static(reactDist));
    console.log('[Server] Serving React dist from:', reactDist);
} else {
    console.warn('[Server] React dist NOT found. Run npm run build first.');
}

// ── NVIDIA NIM / OpenAI client ────────────────────────────
const openaiClient = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY || '',
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

// ── AI Chat API ───────────────────────────────────────────
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        // Hard-limit user message length to prevent token overflow
        const trimmedMessage = message.trim().slice(0, 2000);

        const messages = [
            { role: 'system', content: systemPrompt },
        ];

        // Optionally enrich with live web search (non-fatal if it fails)
        if (isTravelQuery(trimmedMessage)) {
            console.log(`[Search] Travel query detected: "${trimmedMessage}"`);
            try {
                const searchTimeout = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Search timeout')), 12000)
                );
                const liveResults = await Promise.race([
                    puppeteerSearch(trimmedMessage),
                    searchTimeout,
                ]);
                if (liveResults) {
                    // Truncate to ~3000 chars (~750 tokens) to stay well under context limit
                    const safeResults = liveResults.slice(0, 3000);
                    console.log(`[Search] Injecting ${safeResults.length} chars of live results.`);
                    messages.push({ role: 'system', content: safeResults });
                }
            } catch (searchErr) {
                console.warn('[Search] Skipped (failed or timed out):', searchErr.message);
            }
        }

        messages.push({ role: 'user', content: trimmedMessage });

        const completion = await openaiClient.chat.completions.create({
            model: 'meta/llama-3.1-8b-instruct',
            messages,
            temperature: 0.7,
            max_tokens: 800,
            top_p: 0.9,
        });

        const reply = completion.choices?.[0]?.message?.content;
        if (!reply) {
            return res.status(500).json({ error: 'The AI returned an empty response. Please try again.' });
        }

        res.json({ reply });

    } catch (error) {
        console.error('[Chat] Error:', error?.status, error?.message);

        // Friendly error messages for known NVIDIA NIM errors
        let userMessage = 'Something went wrong. Please try again.';

        if (error?.status === 401 || error?.status === 403) {
            userMessage = 'AI service authentication error. Please check the API key configuration.';
        } else if (error?.status === 429) {
            userMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error?.message?.includes('token')) {
            userMessage = 'Your message is too long. Please shorten it and try again.';
        } else if (error?.status === 404) {
            userMessage = 'AI model not available. Please contact support.';
        } else if (error?.status >= 500) {
            userMessage = 'The AI service is temporarily unavailable. Please try again shortly.';
        }

        res.status(error?.status || 500).json({ error: userMessage });
    }
});

// ── SPA catch-all ─────────────────────────────────────────
app.get('*', (req, res) => {
    const indexFile = path.join(reactDist, 'index.html');
    if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
    } else {
        res.status(200).send(`
            <html><body style="background:#0a0a0f;color:#00f0ff;font-family:monospace;padding:40px;text-align:center">
                <h2>Elite Travel Agency — Server Running</h2>
                <p>Frontend build not found. The React app may still be building.</p>
                <a href="/health" style="color:#9200e6">/health</a> &nbsp;
                <a href="/agent" style="color:#9200e6">/agent (AI Chat)</a>
            </body></html>
        `);
    }
});

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on port ${PORT}`);
    console.log(`[Server] NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`[Server] NVIDIA_API_KEY set: ${!!process.env.NVIDIA_API_KEY}`);
    console.log(`[Server] React dist exists: ${fs.existsSync(reactDist)}`);
});