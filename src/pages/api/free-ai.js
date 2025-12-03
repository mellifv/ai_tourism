// src/pages/api/free-ai.js
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    // CORS preflight
    return res.status(204).setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ success: false, error: 'Prompt is required' });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('Gemini API error:', text);
      return res.status(response.status).json({ success: false, error: text });
    }

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      console.error('Invalid AI response:', data);
      return res.status(500).json({ success: false, error: 'Invalid AI response', details: data });
    }

    res.status(200).json({ success: true, response: aiText });
  } catch (err) {
    console.error('Backend error:', err);
    res.status(500).json({ success: false, error: 'Failed to generate response', details: err.message });
  }
}
