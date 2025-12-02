import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Enable CORS for all origins (or restrict to your frontend domain)
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', environment: process.env.NODE_ENV || 'development' });
});

// AI endpoint
app.post('/api/free-ai', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Create a one-day Astana itinerary for: "${prompt}". 
Include times, places, costs in KZT. 
Return valid JSON: {"title": "string", "items": [{"time": "string", "place": "string", "cost": "string", "description": "string"}]}`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return res.status(response.status).json({ success: false, error: errorText });
    }

    const data = await response.json();

    // Defensive parsing
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiResponse) {
      console.error('Invalid AI response:', data);
      return res.status(500).json({ success: false, error: 'Invalid AI response', details: data });
    }

    res.json({ success: true, response: aiResponse });
  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
