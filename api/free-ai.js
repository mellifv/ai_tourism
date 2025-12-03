// api/free-ai.js
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    // CORS preflight
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No AI response');
    }

    const text = data.candidates[0].content.parts[0].text;

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ success: true, response: text });
  } catch (err) {
    console.error('API Error:', err);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ success: false, error: err.message });
  }
}
