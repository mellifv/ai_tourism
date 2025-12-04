// /api/auth/login.js
import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function normalizeEmail(email = '') {
  return email.trim().toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const normalized = normalizeEmail(email);
    const userKey = `user:${normalized}`;

    const user = await redis.hgetall(userKey);
    if (!user || !user.email) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordHash = user.passwordHash;
    const match = await bcrypt.compare(password, passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    if (!JWT_SECRET) {
      console.error('Missing JWT_SECRET env var');
      return res.status(500).json({ error: 'Server misconfigured' });
    }

    const token = jwt.sign({ email: normalized }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return token and basic user info
    return res.status(200).json({
      token,
      user: { email: normalized, createdAt: user.createdAt || null },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
