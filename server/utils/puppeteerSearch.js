const puppeteer = require('puppeteer');

/**
 * Searches DuckDuckGo using Puppeteer and returns top results.
 * @param {string} query - The search query
 * @param {number} maxResults - Number of results to return (default 5)
 * @returns {Promise<string>} - Formatted string of results
 */
async function puppeteerSearch(query, maxResults = 5) {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
            ],
        });

        const page = await browser.newPage();

        // Set a realistic user agent to avoid bot detection
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        );

        // Navigate to DuckDuckGo search
        const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' luxury travel')}`;
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

        // Scrape search result titles and snippets
        const results = await page.evaluate((max) => {
            const items = document.querySelectorAll('.result');
            const data = [];
            for (let i = 0; i < Math.min(items.length, max); i++) {
                const titleEl = items[i].querySelector('.result__title a');
                const snippetEl = items[i].querySelector('.result__snippet');
                const title = titleEl ? titleEl.innerText.trim() : null;
                const snippet = snippetEl ? snippetEl.innerText.trim() : null;
                if (title && snippet) {
                    data.push({ title, snippet });
                }
            }
            return data;
        }, maxResults);

        if (!results || results.length === 0) {
            return null;
        }

        // Format results into a readable context string for the LLM
        const formatted = results
            .map((r, i) => `${i + 1}. **${r.title}**\n   ${r.snippet}`)
            .join('\n\n');

        return `[LIVE SEARCH RESULTS for "${query}"]:\n\n${formatted}`;
    } catch (error) {
        console.error('[PuppeteerSearch] Error during search:', error.message);
        return null;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

/**
 * Detects if a user message is travel-related and needs a live web search.
 * @param {string} message
 * @returns {boolean}
 */
function isTravelQuery(message) {
    const keywords = [
        'best place', 'best places', 'top place', 'top places',
        'best hotel', 'best hotels', 'top hotel', 'top hotels',
        'places to visit', 'things to do', 'where to stay', 'where to go',
        'luxury hotel', 'luxury resort', 'luxury villa', 'top resort',
        'fine dining', 'best restaurant', 'top restaurant',
        'attraction', 'must see', 'must visit',
        'things to see', 'top destination', 'best destination',
        'beach resort', 'private villa', 'overwater villa',
        'travel to', 'trip to', 'visit in', 'vacation in',
        'honeymoon in', 'holiday in', 'weekend in',
    ];
    const lower = message.toLowerCase();
    return keywords.some((kw) => lower.includes(kw));
}

module.exports = { puppeteerSearch, isTravelQuery };
