// src/pages/api/free-ai/route.js

export async function POST(request) {
  try {
    // Parse JSON safely
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON body' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { prompt } = body;
    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Prompt is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Call Gemini API
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
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'AI API error', details: errorText }),
        { status: response.status, headers: corsHeaders }
      );
    }

    const data = await response.json();

    // Defensive parsing
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiText) {
      console.error('Invalid AI response:', data);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid AI response', details: data }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Optional: extract JSON if extra text exists
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    const aiResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : aiText;

    return new Response(
      JSON.stringify({ success: true, response: aiResponse }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to generate AI response', details: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// Common CORS headers
const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
