require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const fs      = require('fs');
const path    = require('path');
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
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

// ── Static: AI chat UI at /agent ──────────────────────────
app.use('/agent', express.static(path.join(__dirname, '../client')));

// ── Static: Built React app at root ──────────────────────
const reactDist = path.join(__dirname, '../Elite Travel Agency/dist');
if (fs.existsSync(reactDist)) {
    app.use(express.static(reactDist));
} else {
    console.warn('[Server] React dist not found:', reactDist);
}

// ── AI Chat API ───────────────────────────────────────────
// OpenAI client is created per-request so a missing key never crashes startup
app.post('/chat', async (req, res) => {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
        console.error('[Chat] NVIDIA_API_KEY is not set!');
        return res.status(503).json({
            error: 'AI service not configured. NVIDIA_API_KEY is missing on the server.',
        });
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        // Cap input to prevent token overflow
        const trimmedMessage = message.trim().slice(0, 2000);

        const messages = [
            { role: 'system', content: systemPrompt },
        ];

        // Optionally enrich with live web search (non-fatal)
        if (isTravelQuery(trimmedMessage)) {
            console.log(`[Search] Travel query: "${trimmedMessage.slice(0, 60)}"`);
            try {
                const liveResults = await Promise.race([
                    puppeteerSearch(trimmedMessage),
                    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000)),
                ]);
                if (liveResults) {
                    // Hard-cap at 3000 chars (~750 tokens) to stay under 64K context limit
                    messages.push({ role: 'system', content: liveResults.slice(0, 3000) });
                    console.log('[Search] Live results injected.');
                }
            } catch (e) {
                console.warn('[Search] Skipped:', e.message);
            }
        }

        messages.push({ role: 'user', content: trimmedMessage });

        const openaiClient = new OpenAI({
            apiKey,
            baseURL: 'https://integrate.api.nvidia.com/v1',
        });

        const completion = await openaiClient.chat.completions.create({
            model: 'meta/llama-3.1-8b-instruct',
            messages,
            temperature: 0.7,
            max_tokens: 600,
        });

        const reply = completion.choices?.[0]?.message?.content;
        if (!reply) {
            return res.status(500).json({ error: 'The AI returned an empty response. Please try again.' });
        }

        res.json({ reply });

    } catch (error) {
        const status = error?.status || 500;
        const errMsg = error?.error?.message || error?.message || '';
        console.error(`[Chat] Error ${status}:`, errMsg);

        let userMessage = 'Something went wrong. Please try again.';
        if (status === 401 || status === 403) userMessage = 'Invalid API key. Please check your NVIDIA_API_KEY on Render.';
        else if (status === 429)             userMessage = 'Too many requests — please wait a moment and try again.';
        else if (status === 404)             userMessage = 'AI model not found. Contact support.';
        else if (errMsg.toLowerCase().includes('token')) userMessage = 'Your message is too long. Please shorten it.';

        res.status(status).json({ error: userMessage });
    }
});

// ── SPA catch-all (GET only) ──────────────────────────────
app.get('*', (_req, res) => {
    const indexFile = path.join(reactDist, 'index.html');
    if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
    } else {
        res.status(200).send(`
            <html><body style="background:#0a0a0f;color:#00f0ff;font-family:monospace;padding:40px;text-align:center">
                <h2>Elite Travel Agency — Server Running</h2>
                <p>Frontend build not found. Please trigger a redeploy on Render.</p>
                <p><a href="/health" style="color:#9200e6">/health</a> &nbsp;
                   <a href="/agent"  style="color:#9200e6">/agent (AI Chat)</a></p>
            </body></html>
        `);
    }
});

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n[Server] ✓ Running on port ${PORT}`);
    console.log(`[Server] NODE_ENV          : ${process.env.NODE_ENV || 'development'}`);
    console.log(`[Server] NVIDIA_API_KEY set: ${!!process.env.NVIDIA_API_KEY}`);
    console.log(`[Server] React dist exists : ${fs.existsSync(reactDist)}\n`);
});
