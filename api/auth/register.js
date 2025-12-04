// /api/auth/register.js
import { Redis } from '@upstash/redis';

// Use the actual variable names from Vercel
const redis = new Redis({
  url: process.env.regusers_KV_REST_API_URL,  // ← Changed
  token: process.env.regusers_KV_REST_API_TOKEN,  // ← Changed
});

export default async function handler(req, res) {
  console.log('Register endpoint called');
  console.log('KV URL:', process.env.regusers_KV_REST_API_URL ? 'Set' : 'Not set');
  console.log('KV Token:', process.env.regusers_KV_REST_API_TOKEN ? 'Set' : 'Not set');
  
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    const userKey = `user:${normalizedEmail}`;
    
    // Check if user exists
    const exists = await redis.exists(userKey);
    if (exists) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Simple encoding (for demo)
    const passwordHash = Buffer.from(password).toString('base64');
    
    await redis.hset(userKey, {
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString()
    });
    
    console.log('User created:', normalizedEmail);
    
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      email: normalizedEmail
    });
    
  } catch (error) {
    console.error('Register API error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: 'Check environment variables'
    });
  }
}
