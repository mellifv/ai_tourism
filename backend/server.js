import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// AI Itinerary endpoint
app.post('/api/free-ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Received prompt:', prompt);

    // Try the working free tier model
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Create a one-day Astana itinerary for: "${prompt}". 
Include times, places, costs in KZT. 
Return valid JSON: {"title": "string", "items": [{"time": "string", "place": "string", "cost": "string", "description": "string"}]}`,
            },
          ],
        },
      ],
    }),
  }
);


    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response generated from AI');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    
    res.json({ 
      success: true,
      response: aiResponse 
    });

  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate itinerary',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});