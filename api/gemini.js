// api/gemini.js - SIMPLE WORKING VERSION
export default async function handler(req, res) {
  console.log("=== GEMINI API CALLED ===");
  
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
  
  try {
    const { prompt } = req.body;
    console.log("Prompt received:", prompt ? `Length: ${prompt.length}` : "None");
    
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt' });
    }
    
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("API Key exists:", !!apiKey);
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        error: 'API key missing in environment' 
      });
    }
    
    // ✅ USE THESE EXACT MODEL NAMES (tested and working):
    // Choose ONE of these:
    const modelName = "models/gemini-2.5-flash";

    // const modelName = "gemini-1.5-flash-latest"; // Faster alternative
    
    console.log("Using model:", modelName);
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
    
    console.log("API URL (first 100 chars):", apiUrl.substring(0, 100));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });
    
    const responseText = await response.text();
    console.log("Response status:", response.status);
    console.log("Response length:", responseText.length);
    
    if (!response.ok) {
      console.error("Full error:", responseText);
      return res.status(response.status).json({
        success: false,
        error: `Gemini API error ${response.status}`,
        details: responseText.substring(0, 300)
      });
    }
    
    const data = JSON.parse(responseText);
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      return res.status(500).json({
        success: false,
        error: 'No AI text in response',
        raw: data
      });
    }
    
    console.log("Success! AI response length:", aiText.length);
    
    return res.status(200).json({
      success: true,
      response: aiText
    });
    
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
