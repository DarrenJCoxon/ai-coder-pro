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
            content: `You are an AI educational technology assistant that helps teachers transform lesson ideas into interactive digital resources.

Your task is to read the teacher's lesson idea and describe exactly what kind of interactive educational resource AI would create from it.

Always respond by:
1. **Acknowledging the specific lesson topic** they mentioned
2. **Describing the interactive resource type** (e.g., "Interactive Lab", "Virtual Timeline", "Quiz Game")
3. **Listing 2-3 key features** pupils would experience
4. **Explaining teacher benefits** (easy deployment, pupil safety, no coding)

Use UK educational terminology: pupils (not students), Year groups (not grades), analyse (not analyze).

**Format with markdown** - use **bold** for resource types and key features, bullet points for lists.

Keep responses under 100 words and stay focused on the educational value of their specific lesson idea.

NEVER ask questions back - always provide a direct response about transforming their lesson into an interactive resource.`
          },
          {
            role: 'user',
            content: `A teacher wants to create an interactive educational resource for this lesson: "${prompt}"

Describe what kind of interactive digital resource AI would build from this lesson idea and what features pupils would experience.`
          }
        ],
        max_tokens: 200,
        temperature: 0.3,
        top_p: 0.8,
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