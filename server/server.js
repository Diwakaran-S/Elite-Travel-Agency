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

// ── Health check (for Render) ─────────────────────────────
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// ── Static files ──────────────────────────────────────────
// 1. AI chat UI served at /agent
app.use('/agent', express.static(path.join(__dirname, '../client')));

// 2. Built React app served at root
const reactDist = path.join(__dirname, '../Elite Travel Agency/dist');
if (fs.existsSync(reactDist)) {
    app.use(express.static(reactDist));
} else {
    console.warn('[Server] React dist not found at:', reactDist, '— skipping static serve');
}

// ── AI Chat API ───────────────────────────────────────────
const openaiClient = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const messages = [
            { role: 'system', content: systemPrompt },
        ];

        // Enrich with live search results for travel queries
        if (isTravelQuery(message)) {
            console.log(`[Search] Travel query detected: "${message}"`);
            try {
                const searchTimeout = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Search timeout')), 15000)
                );
                const liveResults = await Promise.race([
                    puppeteerSearch(message),
                    searchTimeout,
                ]);
                if (liveResults) {
                    console.log('[Search] Live results injected into prompt.');
                    messages.push({ role: 'system', content: liveResults });
                }
            } catch (searchErr) {
                console.warn('[Search] Puppeteer failed or timed out:', searchErr.message);
            }
        }

        messages.push({ role: 'user', content: message });

        const completion = await openaiClient.chat.completions.create({
            model: 'meta/llama-3.1-8b-instruct',
            messages,
            temperature: 0.8,
            max_tokens: 500,
        });

        res.json({ reply: completion.choices[0].message.content });

    } catch (error) {
        console.error('[Chat] Error:', error);
        const statusCode = error?.status || 500;
        const msg = error?.error?.message || 'Something went wrong. Please try again.';
        res.status(statusCode).json({ error: msg });
    }
});

// ── SPA catch-all — React frontend ───────────────────────
app.get('*', (req, res) => {
    const indexFile = path.join(reactDist, 'index.html');
    if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
    } else {
        res.status(200).send(`
            <html><body style="background:#0a0a0f;color:#00f0ff;font-family:monospace;padding:40px;text-align:center">
                <h2>Elite Travel Agency</h2>
                <p>Server is running. Frontend build not found.</p>
                <p>Run <code>npm run build</code> to generate the React app.</p>
                <p><a href="/health" style="color:#9200e6">/health</a> &nbsp; 
                   <a href="/agent" style="color:#9200e6">/agent (AI Chat)</a></p>
            </body></html>
        `);
    }
});

// ── Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on port ${PORT}`);
    console.log(`[Server] React dist: ${reactDist}`);
    console.log(`[Server] React dist exists: ${fs.existsSync(reactDist)}`);
});