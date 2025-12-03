// api/test-simple.js
export default async function handler(req, res) {
  console.log("🔍 Test API called");
  
  // Always return CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  return res.status(200).json({ 
    message: '✅ API is working!',
    timestamp: new Date().toISOString(),
    envKeyExists: !!process.env.GEMINI_API_KEY
  });
}
