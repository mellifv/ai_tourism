// /api/auth/register.js
import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function normalizeEmail(email = '') {
  return email.trim().toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password } = req.body || {};

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const normalized = normalizeEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) return res.status(400).json({ error: 'Invalid email format' });

    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const userKey = `user:${normalized}`;

    // Check if user exists
    const exists = await redis.exists(userKey);
    if (exists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    // Store user as a hash
    await redis.hset(userKey, {
      email: normalized,
      passwordHash,
      createdAt: now,
    });

    // Add to index set of users (for admin/debug)
    await redis.sadd('users', normalized);

    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
