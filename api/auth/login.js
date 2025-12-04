// /api/auth/login.js - CORRECT STRUCTURE
import { Redis } from '@upstash/redis';

// Initialize Redis (no return statements here!)
const redis = new Redis({
  url: process.env.regusers_KV_REST_API_URL,
  token: process.env.regusers_KV_REST_API_TOKEN,
});

// Export the handler function
export default async function handler(req, res) {
  console.log('=== LOGIN API CALLED ===');
  
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // ✅ This return is INSIDE the function
  }
  
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });  // ✅ Inside function
  }
  
  try {
    const { email, password } = req.body;
    
    // Validation
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
      exp: Math.floor(Date.now() / 1000) + 86400
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
    console.error('LOGIN API ERROR:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
