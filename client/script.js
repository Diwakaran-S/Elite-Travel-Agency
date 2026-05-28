const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ─────────────────────────────────────────────────
   Inline markdown → HTML  (safe, no XSS)
   Handles: **bold**, *italic*, `code`
───────────────────────────────────────────────── */
function applyInline(text) {
    // Escape raw HTML first to avoid XSS
    const esc = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return esc
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.+?)__/g,     '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g,     '<em>$1</em>')
        .replace(/`(.+?)`/g,       '<code>$1</code>');
}

/* ─────────────────────────────────────────────────
   Markdown TABLE parser
   Input lines like:
     | Col A | Col B | Col C |
     |-------|-------|-------|
     | val1  | val2  | val3  |
───────────────────────────────────────────────── */
function parseTable(tableLines) {
    const rows = tableLines.map(l =>
        l.replace(/^\||\|$/g, '').split('|').map(c => c.trim())
    );
    if (rows.length < 1) return '';

    const headers = rows[0];
    // Skip separator row (---|---)
    const dataRows = rows.slice(1).filter(r => !r.every(c => /^[-:]+$/.test(c)));

    let html = '<div class="msg-table-wrap"><table class="msg-table"><thead><tr>';
    headers.forEach(h => { html += `<th>${applyInline(h)}</th>`; });
    html += '</tr></thead><tbody>';
    dataRows.forEach(row => {
        html += '<tr>';
        row.forEach((cell, i) => {
            // If no cell for this column, output empty
            html += `<td>${applyInline(cell || '')}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
}

/* ─────────────────────────────────────────────────
   Main formatter — converts AI plain-text to HTML
───────────────────────────────────────────────── */
function formatBotMessage(text) {
    const lines = text.split('\n');
    let html = '';
    let inList     = false;
    let inNumList  = false;
    let inDayBlock = false;
    let tableBuffer = [];   // accumulate table lines

    const closeList = () => {
        if (inList)    { html += '</ul>'; inList = false; }
        if (inNumList) { html += '</ol>'; inNumList = false; }
    };
    const closeDayBlock = () => {
        if (inDayBlock) { html += '</div>'; inDayBlock = false; }
    };
    const flushTable = () => {
        if (tableBuffer.length) {
            closeList();
            html += parseTable(tableBuffer);
            tableBuffer = [];
        }
    };

    lines.forEach((raw) => {
        const line = raw.trim();

        // ── Markdown table row ──
        if (line.startsWith('|')) {
            closeList();
            tableBuffer.push(line);
            return;
        } else {
            flushTable();
        }

        // ── Empty line ──
        if (!line) {
            closeList();
            return;
        }

        // ── Day N: heading ──
        const dayMatch = line.match(/^(Day\s+\d+)\s*[:\-–]?\s*(.*)/i);
        if (dayMatch) {
            closeList();
            closeDayBlock();
            const dayLabel = dayMatch[1].trim();
            const dayTitle = dayMatch[2].trim();
            html += `<div class="day-card">`;
            html += `<div class="day-header">`;
            html += `<span class="day-badge">${dayLabel}</span>`;
            if (dayTitle) html += `<span class="day-title">${applyInline(dayTitle)}</span>`;
            html += `</div><div class="day-body">`;
            inDayBlock = true;
            return;
        }

        // ── ## Heading ──
        const h2 = line.match(/^##\s+(.*)/);
        const h3 = line.match(/^###\s+(.*)/);
        if (h2) { closeList(); closeDayBlock(); html += `<p class="msg-heading">${applyInline(h2[1])}</p>`; return; }
        if (h3) { closeList(); closeDayBlock(); html += `<p class="msg-subheading">${applyInline(h3[1])}</p>`; return; }

        // ── Bullet list: -, •, * ──
        const bullet = line.match(/^[-•]\s+(.*)/);
        if (bullet) {
            if (inNumList) { html += '</ol>'; inNumList = false; }
            if (!inList)   { html += '<ul class="msg-list">'; inList = true; }
            html += `<li><span>${applyInline(bullet[1])}</span></li>`;
            return;
        }

        // ── Numbered list: 1. ──
        const numbered = line.match(/^(\d+)\.\s+(.*)/);
        if (numbered) {
            if (inList) { html += '</ul>'; inList = false; }
            if (!inNumList) { html += '<ol class="msg-list numbered">'; inNumList = true; }
            html += `<li><span>${applyInline(numbered[2])}</span></li>`;
            return;
        }

        // ── Regular paragraph ──
        closeList();
        html += `<p class="msg-para">${applyInline(line)}</p>`;
    });

    flushTable();
    closeList();
    closeDayBlock();

    return html;
}

/* ─────────────────────────────────────────────────
   addMessage — renders a chat bubble
───────────────────────────────────────────────── */
function addMessage(text, type) {
    const isBot = type === 'bot' || type === 'bot error';

    const wrapper = document.createElement('div');
    wrapper.classList.add('message', isBot ? 'bot' : 'user');
    if (type === 'bot error') wrapper.classList.add('error');

    // Avatar
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar', isBot ? 'bot-avatar' : 'user-avatar');
    if (isBot) {
        avatar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
            <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>
        </svg>`;
    } else {
        avatar.textContent = 'YOU';
    }

    // Body
    const body = document.createElement('div');
    body.classList.add('message-body');

    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');

    if (isBot && type !== 'bot error') {
        bubble.innerHTML = formatBotMessage(text);
    } else {
        bubble.textContent = text;
    }

    const time = document.createElement('div');
    time.classList.add('message-time');
    time.textContent = getTime();

    body.appendChild(bubble);
    body.appendChild(time);
    wrapper.appendChild(avatar);
    wrapper.appendChild(body);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    typingIndicator.classList.remove('hidden');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    typingIndicator.classList.add('hidden');
}

function setLoading(loading) {
    sendBtn.disabled = loading;
    userInput.disabled = loading;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';
    setLoading(true);
    showTyping();

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        hideTyping();

        if (data.reply)       addMessage(data.reply, 'bot');
        else if (data.error)  addMessage('⚠️ ' + data.error, 'bot error');
        else                  addMessage('⚠️ Unexpected response from server.', 'bot error');
    } catch (err) {
        hideTyping();
        addMessage('⚠️ Unable to connect to the AI server. Please try again.', 'bot error');
    } finally {
        setLoading(false);
        userInput.focus();
    }
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) sendMessage();
});