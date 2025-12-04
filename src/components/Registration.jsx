// Registration.jsx (auth register page)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (password !== confirm) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        // auto-login: call login endpoint to get token
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginRes.json();
        if (loginRes.ok) {
          loginWithToken(loginData.token);
          setStatus('success');
          setMessage('Account created. Redirecting…');
          setEmail('');
          setPassword('');
          setConfirm('');
          // redirect to home or profile
          setTimeout(() => navigate('/'), 700);
        } else {
          setStatus('error');
          setMessage(loginData.error || 'Registration succeeded but login failed');
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Network error — try again.');
    }
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/6 backdrop-blur-lg border border-white/6 shadow-2xl"
    >
      <h3 className="text-lg font-semibold mb-2">Create account</h3>
      <p className="text-sm opacity-70 mb-4">Use email & password. Password must be at least 8 characters.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" required placeholder="you@example.com"
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-transparent border border-white/10 outline-none" />

        <input type="password" required placeholder="Password (min 8 chars)"
          value={password} onChange={e => setPassword(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-transparent border border-white/10 outline-none" />

        <input type="password" required placeholder="Confirm password"
          value={confirm} onChange={e => setConfirm(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-transparent border border-white/10 outline-none" />

        <div className="flex justify-end">
          <button type="submit" disabled={status === 'loading'}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
            {status === 'loading' ? 'Creating…' : 'Create account'}
          </button>
        </div>

        <div className="text-sm">
          {status === 'success' && <p className="text-green-400">{message}</p>}
          {status === 'error' && <p className="text-rose-400">{message}</p>}
        </div>
      </form>
    </motion.section>
  );
}
