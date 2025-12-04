// File: Registration.jsx
// React + Tailwind + Framer Motion component (single-file export)
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks — you\'re on the list!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error — try again.');
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/6 backdrop-blur-lg border border-white/6 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xl font-semibold">
          ✉️
        </div>
        <div>
          <h3 className="text-lg font-semibold">Join the Collective</h3>
          <p className="text-sm opacity-70">Get futuristic travel tips, early features and rare promos — directly to your inbox.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5">
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="you@futuremail.example"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl px-4 py-3 bg-transparent border border-white/10 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="absolute -right-1 -top-1 rounded-xl px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-lg hover:scale-[1.02] active:scale-100 transition"
          >
            {status === 'loading' ? 'Sending...' : 'Subscribe'}
          </button>
        </div>

        {/* honeypot for bots */}
        <input aria-hidden="true" tabIndex={-1} style={{display:'none'}} name="hp_name" />

        <div className="mt-3 text-sm">
          {status === 'success' && <p className="text-green-400">{message}</p>}
          {status === 'error' && <p className="text-rose-400">{message}</p>}
        </div>

        <div className="mt-4 text-xs opacity-60">We respect your inbox. Unsubscribe anytime.</div>
      </form>
    </motion.section>
  );
}


// ---------------------------------------------
// File: api/register.js (Vercel Serverless Function)
// Place this file under /api/register.js in your Vercel project
// It accepts POST { email } and submits to SendGrid Marketing Contacts.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, hp_name } = req.body || {};

    // simple honeypot spam check
    if (hp_name) return res.status(400).json({ error: 'Bot detected' });

    if (!email || typeof email !== 'string') return res.status(400).json({ error: 'Invalid email' });

    // basic email regex (small, safe server-side validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

    // SendGrid marketing endpoint
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    if (!SENDGRID_API_KEY) return res.status(500).json({ error: 'Server misconfigured: missing SENDGRID_API_KEY' });

    const payload = { contacts: [{ email }] };

    const sgRes = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT', // SendGrid accepts PUT here to upsert contacts
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const sgData = await sgRes.json();

    if (!sgRes.ok) {
      // return SendGrid message for debugging
      return res.status(502).json({ error: 'Upstream error', detail: sgData });
    }

    return res.status(200).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


/*
README & Deployment notes

1) What this does
- Modern, compact React registration component styled with Tailwind and Framer Motion.
- Serverless endpoint for Vercel (/api/register) that upserts emails into SendGrid Marketing Contacts.

2) Environment variables (set these in Vercel dashboard)
- SENDGRID_API_KEY: your SendGrid API key with Marketing write access

3) How to deploy
- Put Registration.jsx into your React app (e.g. components/Registration.jsx) and import where you want it.
- Add api/register.js to your project root under /api/register.js (Vercel will pick it up as a serverless function).
- Push to your Git provider and deploy on Vercel. Add the SENDGRID_API_KEY in the Vercel project Settings → Environment Variables.

4) Optional improvements
- Add list membership: call the SendGrid "lists" API or add contact list IDs when calling contacts endpoint.
- Use double opt-in: send confirmation emails (SendGrid transactional) and only add to marketing list after confirmation.
- Add rate limiting or use a lightweight store (Redis / Upstash / Vercel KV) to prevent mass signups.
- Replace SendGrid with Mailchimp, Brevo, ConvertKit, or your CRM — adapt the serverless function to their API.

5) Privacy & legal
- Add a link to your privacy policy. Store only necessary data and follow GDPR/email rules for your target audience.

6) Aesthetic tweaks
- Tweak gradients, icons, micro-interactions in Framer Motion for extra futuristic polish.
*/
