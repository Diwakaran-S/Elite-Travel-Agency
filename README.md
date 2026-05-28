# Elite Travel Agency — AI-Powered Luxury Travel Platform

A full-stack luxury travel SaaS featuring a premium React frontend and an AI-powered concierge chat agent backed by **Llama 3.1** via the NVIDIA NIM API.

---

## 📁 Project Structure

```
Task 1/
├── Elite Travel Agency/        # React + Vite frontend (port 3000)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Fixed top navigation bar
│   │   │   ├── HomeSection.tsx     # Hero + featured packages
│   │   │   ├── GallerySection.tsx  # Destination gallery with vibe filters
│   │   │   ├── PackagesSection.tsx # All travel packages
│   │   │   ├── BookingsSection.tsx # Booking form
│   │   │   ├── AiAgentSection.tsx  # Embeds the AI chat (iframe)
│   │   │   ├── AboutSection.tsx    # Agency about page
│   │   │   ├── ContactSection.tsx  # Contact form
│   │   │   ├── HelpSection.tsx     # FAQ section
│   │   │   └── Footer.tsx          # Global footer
│   │   ├── App.tsx                 # Root SPA router
│   │   ├── types.ts                # Shared TypeScript types
│   │   ├── data.ts                 # Travel packages dataset
│   │   └── index.css               # Global design system (Tailwind v4)
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── server/                     # Express backend (port 5000)
│   ├── server.js               # API server + static file server
│   ├── prompts/
│   │   └── systemPrompt.js     # AI concierge persona & formatting rules
│   ├── utils/
│   │   └── puppeteerSearch.js  # Live DuckDuckGo web search via Puppeteer
│   └── .env                    # Environment variables (not committed)
│
└── client/                     # Standalone AI chat UI (served by Express)
    ├── index.html              # Chat interface markup
    ├── style.css               # Dark cyberpunk chat theme
    └── script.js               # Chat logic + markdown formatter
```

---

## ✨ Features

### Frontend — Elite Travel Agency
| Page | Description |
|------|-------------|
| **Home** | Hero section with featured luxury packages and CTAs |
| **Gallery** | Destination photo gallery with vibe-based filters (Cybercity, Abyss, Celestial, etc.) |
| **Packages** | Full catalogue of travel packages with filters |
| **Bookings** | Multi-step booking form with class tiers (Standard / Orbital / Quantum) |
| **AI Travel Agent** | Embedded AI concierge chat interface |
| **About** | Agency story and team |
| **Contact** | Contact form |
| **Help** | FAQ accordion |

### AI Concierge Agent
- **Model:** `meta/llama-3.1-8b-instruct` via NVIDIA NIM
- **Live web search:** Puppeteer scrapes DuckDuckGo for real-time travel data when relevant keywords are detected
- **Rich message rendering:** Inline markdown parser renders bold, bullet lists, numbered lists, day-wise itinerary cards, and comparison tables
- **Luxury persona:** System prompt enforces premium concierge tone, structured itineraries, and markdown table output for comparisons

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Backend | Node.js + Express |
| AI Model | Llama 3.1 8B via NVIDIA NIM |
| AI Client | OpenAI SDK (NVIDIA-compatible) |
| Web Scraping | Puppeteer (DuckDuckGo) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher
- A valid **NVIDIA NIM API key** — get one at [build.nvidia.com](https://build.nvidia.com)

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Task 1"
```

---

### 2. Set Up the Backend Server

```bash
cd server
```

Create a `.env` file inside `server/`:

```env
NVIDIA_API_KEY=your_nvidia_nim_api_key_here
PORT=5000
```

Install dependencies and start:

```bash
npm install
node server.js
```

> The server starts at **http://localhost:5000**
> The AI chat UI is served at **http://localhost:5000** (from the `client/` folder)

---

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd "Elite Travel Agency"
npm install
npm run dev
```

> The frontend starts at **http://localhost:3000**

---

### 4. Open the App

Navigate to **http://localhost:3000** in your browser.

Click **"AI Travel Agent"** in the navigation bar to open the embedded AI concierge chat.

---

## 🔑 Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `NVIDIA_API_KEY` | `server/.env` | Your NVIDIA NIM API key |
| `PORT` | `server/.env` | Express server port (default: `5000`) |

---

## 💬 AI Chat — How It Works

```
User types a message
        ↓
Express /chat endpoint receives the message
        ↓
isTravelQuery() checks for travel-related keywords
        ↓ (if travel query)
Puppeteer searches DuckDuckGo and scrapes top 5 results
        ↓
Live results injected as a system message → Llama 3.1 receives full context
        ↓
AI responds in structured format (Day cards / bullet lists / tables)
        ↓
client/script.js formatBotMessage() parses markdown → renders rich HTML
```

### Formatting the AI renders:
- **Day N: Title** → Neon-blue framed itinerary day cards
- **- bullet points** → `▸` neon bullet lists
- **1. numbered lists** → Purple-accented ordered lists
- **\*\*bold\*\*** → Highlighted keywords
- **| table |** → Responsive comparison tables with neon headers

---

## 📦 Available Scripts

### Frontend (`Elite Travel Agency/`)
```bash
npm run dev       # Start Vite dev server (port 3000)
npm run build     # Build for production
npm run lint      # TypeScript type check
```

### Backend (`server/`)
```bash
node server.js    # Start Express server (port 5000)
```

---

## 🎨 Design System

The entire project uses a unified **dark cyberpunk** design language:

| Token | Value | Usage |
|-------|-------|-------|
| `--cyber-dark` | `#0a0a0f` | Page background |
| `--cyber-card` | `#12121e` | Card backgrounds |
| `--neon-blue` | `#00f0ff` | Primary accent, borders, bullets |
| `--neon-purple` | `#9200e6` | AI/Tech accents, status indicators |
| `--neon-pink` | `#ff007f` | Error states, highlights |
| Font (sans) | Inter | Body text |
| Font (mono) | JetBrains Mono | Labels, badges, timestamps |

---

## 📝 Notes

- The `client/` folder is served as **static files** by the Express server. The React frontend embeds it via an `<iframe>` on the AI Travel Agent page.
- The Puppeteer live search has a **15-second timeout** — if it fails or times out, the AI responds using its own knowledge only (non-fatal fallback).
- The system prompt instructs the AI to **never reveal** that a live web search is being performed.
