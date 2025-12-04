// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        loginWithToken(data.token);
        setStatus('success');
        setMessage('Logged in. Redirecting…');
        setTimeout(() => navigate('/'), 400);
      } else {
        setStatus('error');
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Network error — try again.');
    }
  }

  return (
    <motion.section className="max-w-md mx-auto p-6 rounded-2xl bg-white/3 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h3 className="text-lg font-semibold mb-2">Login</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-transparent border border-white/10 outline-none" />

        <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-transparent border border-white/10 outline-none" />

        <div className="flex justify-end">
          <button type="submit" disabled={status === 'loading'} className="px-4 py-2 rounded-xl bg-indigo-600 text-white">
            {status === 'loading' ? 'Signing in…' : 'Sign in'}
          </button>
        </div>

        <div className="text-sm">
          {status === 'error' && <p className="text-rose-400">{message}</p>}
        </div>
      </form>
    </motion.section>
  );
}
