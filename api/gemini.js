// api/gemini.js - DEBUG VERSION
export default async function handler(req, res) {
  console.log("=== GEMINI API CALLED ===");
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log("Preflight request");
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    console.log("Wrong method:", req.method);
    return res.status(405).json({ error: 'Only POST allowed' });
  }
  
  try {
    console.log("Processing POST request");
    
    const { prompt } = req.body || {};
    console.log("Prompt received:", prompt ? `Length: ${prompt.length}` : "NO PROMPT");
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'No prompt provided' 
      });
    }
    
    // Check API key
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("GEMINI_API_KEY present:", !!apiKey);
    console.log("Key first 10 chars:", apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING");
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'GEMINI_API_KEY is missing. Add it in Vercel Environment Variables.',
        help: 'Go to Vercel Dashboard → Project Settings → Environment Variables'
      });
    }
    
    // Try different model names
    const modelNames = [
      "gemini-2.5-pro-latest",
      "gemini-2.5-flash-latest", 
      "gemini-pro"
    ];
    
    const modelName = modelNames[0]; // Start with first one
    console.log("Using model:", modelName);
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    console.log("Calling Gemini API...");
    
    const startTime = Date.now();
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
      timeout: 30000 // 30 second timeout
    });
    
    const responseTime = Date.now() - startTime;
    console.log(`Gemini response time: ${responseTime}ms`);
    console.log("Gemini status:", geminiResponse.status);
    
    const responseText = await geminiResponse.text();
    console.log("Response length:", responseText.length);
    
    if (!geminiResponse.ok) {
      console.error("Gemini API failed:", responseText);
      
      // Try to parse error
      let errorMessage = `HTTP ${geminiResponse.status}`;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error?.message || responseText.substring(0, 200);
      } catch (e) {
        errorMessage = responseText.substring(0, 200);
      }
      
      return res.status(geminiResponse.status).json({
        success: false,
        error: `Gemini API error: ${errorMessage}`,
        modelTried: modelName,
        status: geminiResponse.status
      });
    }
    
    // Parse successful response
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("Response parsed successfully");
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return res.status(500).json({
        success: false,
        error: 'Invalid JSON from Gemini',
        raw: responseText.substring(0, 500)
      });
    }
    
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("AI text present:", !!aiText);
    
    if (!aiText) {
      console.error("No AI text in response:", data);
      return res.status(500).json({
        success: false,
        error: 'No AI response in Gemini reply',
        raw: data
      });
    }
    
    console.log("✅ Success! AI response length:", aiText.length);
    
    return res.status(200).json({
      success: true,
      response: aiText,
      model: modelName
    });
    
  } catch (error) {
    console.error("💥 Unexpected error:", error);
    console.error(error.stack);
    
    return res.status(500).json({
      success: false,
      error: `Server error: ${error.message}`,
      type: error.name
    });
  }
}
