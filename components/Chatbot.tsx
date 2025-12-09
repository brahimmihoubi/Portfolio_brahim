import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
};

const STORAGE_KEY = 'GEMINI_API_KEY';

const Chatbot: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem(STORAGE_KEY);
    if (key) setApiKey(key);
  }, []);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const saveKey = (k: string) => {
    localStorage.setItem(STORAGE_KEY, k);
    setApiKey(k);
  };

  const clearKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: String(Date.now()) + '-u', role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    // Prepare system prompt to answer only about you and your experiences
    const systemPrompt = `You are a helpful assistant that only answers questions about the portfolio owner (Brahim) and their experiences, projects and skills. If asked something outside that scope, reply briefly that you only answer questions about the owner.`;

    setLoading(true);
    try {
      // Frontend-only fetch to Gemini-like endpoint. User must provide API key.
      if (!apiKey) {
        setMessages((m) => [...m, { id: String(Date.now()) + '-a', role: 'assistant', text: 'No API key configured. Please set your Gemini API key.' }]);
        setLoading(false);
        return;
      }

      // NOTE: This is a frontend example. For production keep your API key on a server.
      const url = 'https://api.labs.google.com/v1beta/generateText?model=gemini-1.0';

      const payload = {
        prompt: `${systemPrompt}\nUser: ${text}\nAssistant:`,
        // Depending on the API you use, adapt these fields. This is a minimal example.
        maxOutputTokens: 256,
        temperature: 0.2,
      } as any;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const textErr = await res.text();
        setMessages((m) => [...m, { id: String(Date.now()) + '-a', role: 'assistant', text: `Error from API: ${res.status} ${textErr}` }]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      // Extract the assistant text depending on response shape
      const assistantText = data?.candidates?.[0]?.content || data?.output || JSON.stringify(data);

      setMessages((m) => [...m, { id: String(Date.now()) + '-a', role: 'assistant', text: String(assistantText) }]);
    } catch (err: any) {
      setMessages((m) => [...m, { id: String(Date.now()) + '-a', role: 'assistant', text: `Request failed: ${String(err)}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.18 }}
            className="max-w-xl mx-auto bg-card p-4 rounded-lg shadow-lg"
            role="dialog"
            aria-label="Chatbot"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Chatbot (Gemini)</h3>
              <div className="flex items-center gap-2">
                {apiKey ? (
                  <button className="text-sm text-slate-400 hover:text-white" onClick={clearKey}>Clear Key</button>
                ) : null}
                <button
                  aria-label="Close chat"
                  className="ml-2 p-1 rounded hover:bg-slate-800"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="text-sm text-slate-400">API Key (stored in browser)</label>
              <input
                className="w-full mt-1 p-2 rounded bg-slate-800 text-slate-200"
                placeholder="Paste your Gemini API key here"
                value={apiKey ?? ''}
                onChange={(e) => setApiKey(e.target.value)}
                onBlur={(e) => saveKey(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">For production, keep the key on a server. This demo stores it locally.</p>
            </div>

            <div ref={messagesRef} className="h-64 overflow-y-auto p-2 mb-3 bg-slate-900 rounded">
              {messages.length === 0 ? (
                <div className="text-sm text-slate-500">Ask questions about Brahim's experience, projects and skills.</div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-200'}`}>
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                className="flex-1 p-2 rounded bg-slate-800 text-slate-200"
                placeholder="Ask about my projects or experience..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-primary rounded text-white" disabled={loading}>
                {loading ? '...' : 'Send'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <div className="flex justify-end">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chatbot' : 'Open chatbot'}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg mt-3"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Chatbot;
