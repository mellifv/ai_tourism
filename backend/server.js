import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// === AI endpoint ===
app.post('/api/free-ai', async (req, res) => {
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
      const errText = await response.text();
      throw new Error(errText);
    }

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) throw new Error('No AI response');

    res.json({ success: true, response: aiText });

  } catch (error) {
    console.error('AI endpoint error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// === Health check ===
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', environment: process.env.NODE_ENV || 'development' });
});

// === Serve frontend build ===
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback: send index.html for all other routes (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
