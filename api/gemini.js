// api/gemini.js
export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { prompt } = req.body;
    
    // Log what we receive
    console.log("📨 Received request with prompt length:", prompt?.length || 0);
    console.log("🔑 GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
    
    if (!prompt) {
      console.log("❌ No prompt provided");
      return res.status(400).json({ error: 'No prompt provided' });
    }
    
    if (!process.env.GEMINI_API_KEY) {
      console.log("❌ GEMINI_API_KEY is missing!");
      return res.status(500).json({ 
        error: 'Server misconfiguration: API key missing',
        help: 'Add GEMINI_API_KEY to Vercel environment variables'
      });
    }
    
    // Call Gemini API
    console.log("📡 Calling Gemini API...");
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      }
    );
    
    console.log("📊 Gemini API status:", geminiResponse.status);
    
    const responseText = await geminiResponse.text();
    
    if (!geminiResponse.ok) {
      console.error("❌ Gemini API error:", responseText);
      return res.status(geminiResponse.status).json({
        error: `Gemini API error: ${responseText.substring(0, 200)}`
      });
    }
    
    const data = JSON.parse(responseText);
    
    // Extract the AI response
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      console.error("❌ No AI text in response:", data);
      return res.status(500).json({ error: 'No AI response received' });
    }
    
    console.log("✅ Success! AI response length:", aiText.length);
    
    // Return the AI response
    return res.status(200).json({
      success: true,
      response: aiText
    });
    
  } catch (error) {
    console.error("💥 Server error:", error.message);
    console.error(error.stack);
    
    return res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
}
