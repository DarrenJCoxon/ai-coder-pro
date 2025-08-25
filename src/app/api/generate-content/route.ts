import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      );
    }

    // OpenRouter API call
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'AI Education Platform',
      },
      body: JSON.stringify({
        model: 'google/gemma-2-9b-it', // Powerful, cost-effective model perfect for educational content
        messages: [
          {
            role: 'system',
            content: `You are an AI educational content generator for busy teachers who want to create interactive digital resources but are overwhelmed by coding platforms and concerned about pupil safety.

Generate an exciting, professional summary of how AI would transform their lesson idea into a complete interactive educational resource. Focus on:

1. What specific type of interactive experience this becomes
2. Engaging features pupils would experience
3. How it solves teacher pain points (instant deployment, pupil safety, no coding required)

Use confident, inspiring language with UK spelling and terminology (pupils not students, Year groups not grades, analyse not analyze, visualisation not visualization, colour not color). Keep under 120 words. Make it feel magical but achievable.`
          },
          {
            role: 'user',
            content: `Transform this lesson idea into an AI-generated interactive resource: "${prompt}"`
          }
        ],
        max_tokens: 250,
        temperature: 0.8,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content?.trim() || 'AI will transform your lesson idea into an interactive educational experience with multimedia content, student engagement features, and easy deployment. Perfect for busy teachers who want powerful resources without the complexity.';

    return NextResponse.json({ content: generatedContent });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}