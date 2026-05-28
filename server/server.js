require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const path = require('path');
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const systemPrompt = require('./prompts/systemPrompt');
const { puppeteerSearch, isTravelQuery } = require('./utils/puppeteerSearch');

const app = express();

app.use(cors());
app.use(express.json());

// ── Static files ─────────────────────────────────────────
// 1. Serve the standalone AI chat UI at /agent
app.use('/agent', express.static(path.join(__dirname, '../client')));

// 2. Serve the built React frontend at root (production)
const reactDist = path.join(__dirname, '../Elite Travel Agency/dist');
app.use(express.static(reactDist));

// ── AI Chat API ───────────────────────────────────────────
const client = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Build messages array starting with the base system prompt
        const messages = [
            {
                role: 'system',
                content: systemPrompt,
            },
        ];

        // If the user is asking a travel-related question, enrich with live search results
        if (isTravelQuery(message)) {
            console.log(`[Search] Travel query detected: "${message}"`);

            try {
                // Race the Puppeteer search against a 15-second timeout
                const searchTimeout = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Search timeout')), 15000)
                );
                const liveResults = await Promise.race([
                    puppeteerSearch(message),
                    searchTimeout,
                ]);

                if (liveResults) {
                    console.log('[Search] Live results injected into prompt.');
                    messages.push({
                        role: 'system',
                        content: liveResults,
                    });
                }
            } catch (searchErr) {
                // Non-fatal — just log and continue without search results
                console.warn('[Search] Puppeteer search failed or timed out:', searchErr.message);
            }
        }

        // Add the user message
        messages.push({
            role: 'user',
            content: message,
        });

        const completion = await client.chat.completions.create({
            model: 'meta/llama-3.1-8b-instruct',
            messages,
            temperature: 0.8,
            max_tokens: 500,
        });

        res.json({
            reply: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        const statusCode = error?.status || 500;
        const message = error?.error?.message || 'Something went wrong. Please try again.';

        res.status(statusCode).json({
            error: message,
        });
    }
});

// ── SPA catch-all — serve React app for all unknown routes ─
app.get('*', (req, res) => {
    res.sendFile(path.join(reactDist, 'index.html'));
});

// ── Start server ───────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});