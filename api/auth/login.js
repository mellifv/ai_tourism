// /api/auth/login.js
import { Redis } from '@upstash/redis';
// In your login.js API endpoint
const tokenData = {
  email: user.email,
  createdAt: user.createdAt,
  exp: Math.floor(Date.now() / 1000) + 86400
};

// Create proper JWT format
const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
const payload = Buffer.from(JSON.stringify(tokenData)).toString('base64');
// For now, use a mock signature (in production, use real HMAC)
const signature = Buffer.from('your-secret-key-' + Date.now()).toString('base64').slice(0, 43);
const token = `${header}.${payload}.${signature}`;

return res.status(200).json({
  success: true,
  token: token,
  user: {
    email: user.email,
    createdAt: user.createdAt
  }
});
// Use the correct variable names
const redis = new Redis({
  url: process.env.regusers_KV_REST_API_URL,
  token: process.env.regusers_KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  console.log('Login endpoint called');
  
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    const userKey = `user:${normalizedEmail}`;
    
    // Get user
    const user = await redis.hgetall(userKey);
    
    if (!user || !user.email) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const inputHash = Buffer.from(password).toString('base64');
    if (inputHash !== user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create token
    const tokenData = {
      email: user.email,
      createdAt: user.createdAt,
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours
    };
    
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
    
    return res.status(200).json({
      success: true,
      token: token,
      user: {
        email: user.email,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    console.error('Login API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
