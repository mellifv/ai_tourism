// /api/auth/login.js
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

function normalizeEmail(email = '') {
  return email.trim().toLowerCase();
}

export default async function handler(req, res) {
  // Same CORS headers as register.js
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
    const userKey = `user:${normalized}`;

    // Get user from Redis
    const user = await redis.hgetall(userKey);
    
    if (!user || !user.email) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simple password check (for demo)
    const inputHash = Buffer.from(password).toString('base64');
    if (inputHash !== user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a simple JWT-like token
    const tokenPayload = {
      email: user.email,
      createdAt: user.createdAt,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    };

    // Base64 encode (this is NOT secure JWT, just for demo)
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        email: user.email,
        createdAt: user.createdAt,
      }
    });
    
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
