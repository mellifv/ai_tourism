import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ENABLE CORS FOR ALL ORIGINS
app.use(cors());

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// AI endpoint
app.post('/api/free-ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create a one-day Astana itinerary for: "${prompt}". 
Include times, places, costs in KZT. 
Return valid JSON: {"title": "string", "items": [{"time": "string", "place": "string", "cost": "string", "description": "string"}]}`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    res.json({ 
      success: true,
      response: aiResponse 
    });

  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

app.listen(PORT, () => console.log(`Server running`));
