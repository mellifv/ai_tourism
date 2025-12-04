// /api/auth/register.js
import { Redis } from '@upstash/redis';

// Initialize Redis
const redis = Redis.fromEnv();

function normalizeEmail(email = '') {
  return email.trim().toLowerCase();
}

export default async function handler(req, res) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalized = normalizeEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(normalized)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const userKey = `user:${normalized}`;

    // Check if user exists
    const exists = await redis.exists(userKey);
    if (exists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // In Vercel Serverless, you can't use bcrypt (too heavy)
    // Use a simpler approach or different hashing
    const passwordHash = Buffer.from(password).toString('base64'); // Simple for demo
    
    const now = new Date().toISOString();

    // Store user
    await redis.hset(userKey, {
      email: normalized,
      passwordHash,
      createdAt: now,
    });

    // Add to users set
    await redis.sadd('users', normalized);

    return res.status(201).json({ 
      message: 'User created successfully',
      email: normalized 
    });
    
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// For Vercel, you need to handle preflight
export const config = {
  api: {
    bodyParser: true,
  },
};
