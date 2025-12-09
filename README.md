
# Brahim Mihoubi — Personal Portfolio

This repository is a personal portfolio built with React, TypeScript and Vite. It showcases the owner's (Brahim Mihoubi) projects, skills, achievements and contact information. A small, optional frontend Chatbot widget is included to demonstrate integrating a generative model API (e.g., Gemini) for answering questions about the portfolio owner.

This README documents how to run the project, the app structure, how the Chatbot works, and an example server-side proxy pattern to keep API keys secure.

---

## Quick start

Requirements: Node.js (LTS recommended)

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Type-check the project:

```bash
npx tsc --noEmit
```

## Technology stack

- React 19 + TypeScript
- Vite (dev server & build)
- Tailwind CSS (via CDN in index.html)
- framer-motion (animations)
- lucide-react (icons)

## Project layout

Top-level files

- `index.html` — app entry HTML (includes Tailwind via CDN).
- `index.tsx` — React entry point.
- `App.tsx` — top-level layout, mounts the Chatbot widget.
- `vite.config.ts` — Vite configuration.
- `tsconfig.json` — TypeScript configuration.

Key directories

- `components/` — React components used throughout the app.
- `Chatbot.tsx` — Frontend-only chat UI and request logic.
- `About.tsx`, `Hero.tsx`, `Projects.tsx`, `Skills.tsx`, `Contact.tsx`, etc.
- `public/` — static assets served directly by Vite (e.g., `brahim.jpeg`).
- `assetes/` — image resources (note: directory spelled `assetes` in this repo).

## Chatbot — frontend behavior

File: `components/Chatbot.tsx`

Overview:

- The Chatbot is a small UI rendered as a floating widget (bottom-right). Clicking the round toggle button opens an animated chat panel.
- The component stores the Gemini API key in `localStorage` under key `GEMINI_API_KEY` when the user pastes it into the API Key input (this is deliberately simple for demos).
- When a user sends a message, the Chatbot adds a system prompt forcing the assistant to answer only about the portfolio owner and sends the combined prompt to a configured endpoint.

Important security note:

- Do NOT expose your production API keys in the browser. Use the server-proxy pattern below to avoid leaking secrets.

## Example server-side proxy (recommended)

Below is a minimal Express example to forward chat requests to the real model service while keeping the API key on the server.

1. Create a small `server/` directory and add the following `proxy.js` file:

```js
// server/proxy.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/generate', async (req, res) => {
 const prompt = req.body.prompt;
 if (!prompt) return res.status(400).json({ error: 'prompt required' });

 try {
  const resp = await fetch('https://api.labs.google.com/v1beta/generateText?model=gemini-1.0', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
   },
   body: JSON.stringify({ prompt, maxOutputTokens: 256, temperature: 0.2 }),
  });

  const data = await resp.json();
  res.json(data);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'upstream request failed' });
 }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Proxy listening on', port));
```

2. Add `.env` or `.env.local` with:

```
GEMINI_API_KEY=YOUR_KEY_HERE
```

3. Start the proxy:

```bash
cd server
npm init -y
npm install express node-fetch dotenv
node proxy.js
```

4. Update `components/Chatbot.tsx` to POST to `/api/generate` on your server instead of the public model URL.

## Scripts & commands

- `npm run dev` — start Vite dev server
- `npm run build` — build production files
- `npm run preview` — preview production build
- `npx tsc --noEmit` — type-check without emitting files

## Troubleshooting

- If dev server doesn't open on port 3000, check terminal — Vite will use the next free port.
- If the Chatbot shows API errors, either the API key or endpoint is incorrect. Use the server-proxy to inspect and log upstream responses.
- If icons or framer-motion are missing, run:

```bash
npm install lucide-react framer-motion
```

## Contributing

- Fork, branch, and open a PR for changes. Keep commits small and focused.
- If you add environment-backed features, create a `.env.example` showing required variables.

## License

This repo has no license specified. Add a LICENSE file if you want to open-source it.

---

If you'd like, I can commit a small `server/` proxy example into the repo and update `Chatbot.tsx` to use it, so keys never leave the server — let me know and I will add that next.

---

## Project structure

- `App.tsx` — main app layout; mounts the floating Chatbot widget.
- `components/` — all React components: `Hero`, `About`, `Projects`, `Skills`, `Contact`, `Chatbot`, etc.
- `public/` — static assets served by Vite (e.g. `brahim.jpeg`).
- `assetes/` — image resources present in the repo (note spelling).
- `vite.config.ts`, `tsconfig.json` — project configuration files.

---

## Chatbot (frontend)

Location: `components/Chatbot.tsx` — a small, animated chat widget that opens from the bottom-right.

How to use (demo):

1. Start dev server: `npm run dev`.
2. Open the site at the Local URL printed by Vite (e.g., `http://localhost:3000/`).
3. Click the round chatbot button in the bottom-right to open the chat panel.
4. Paste your Gemini API key into the API Key input and blur the field to save it (the key is stored in `localStorage`).
5. Ask questions about the portfolio owner — the assistant is constrained to answer only about the owner, their projects and experience.

Important security note:

- Storing API keys in the browser is insecure. For real-world usage, create a server-side proxy or serverless function that stores the key and forwards requests from the frontend.

Example server-side proxy is available on request.

---

## Notes and troubleshooting

- If Vite attempts to use another port because the default is occupied, check the terminal for the Local URL (Vite auto-increments the port).
- If images don't appear, ensure `public/brahim.jpeg` exists.
- If you see TypeScript errors about missing types (e.g., `node`), install them:

```bash
npm install --save-dev @types/node
```

- The project uses `lucide-react` (icons) and `framer-motion` (animations). If missing, install:

```bash
npm install lucide-react framer-motion
```

---

## Next improvements (optional)

- Move chatbot API calls to a server-side proxy for secure key handling.
- Persist chatbot open/closed state and add unread message indicator.
- Add unit tests and CI checks.

If you'd like, I can add a minimal serverless proxy example and wire the chatbot to it so keys are never exposed to the browser.
