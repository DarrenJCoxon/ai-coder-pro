import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/neon';
import { userPrompts } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    // Optional authentication check for logging (but don't block demo users)
    const { userId } = await auth().catch(() => ({ userId: null }));
    
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
        model: 'google/gemma-3-12b-it', // Larger Gemma model for better educational content
        messages: [
          {
            role: 'system',
            content: `You are an expert educational technology consultant who specializes in creating interactive digital learning experiences for UK schools.

Your task: Generate an engaging, professional description of how AI would transform the teacher's lesson idea into a complete interactive educational resource.

Response format: Use markdown formatting with:
- **Bold text** for key features
- *Italic text* for emphasis
- Bullet points for lists
- Clear, structured paragraphs

Focus on:
1. **Specific interactive features** pupils would experience
2. **Educational benefits** and learning outcomes
3. **Teacher advantages** (time-saving, engagement, safety)
4. **Technical capabilities** without overwhelming detail

Use UK terminology (pupils not students, Year groups not grades, analyse not analyze, visualisation not visualization, colour not color).

Keep response under 150 words. Be inspiring but realistic.`
          },
          {
            role: 'user',
            content: `Create an AI-powered interactive educational resource for: "${prompt}"`
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
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
    const generatedContent = data.choices?.[0]?.message?.content?.trim() || '**AI Educational Resource Generator**\n\nYour lesson idea will be transformed into an *interactive digital experience* with:\n\n- **Multimedia content** tailored to your curriculum\n- **Student engagement features** for active learning\n- **Easy deployment** with no technical setup required\n\nPerfect for busy teachers who want powerful resources without the complexity.';

    // Log the user prompt to database (only for authenticated users)
    if (userId) {
      try {
        await db.insert(userPrompts).values({
          prompt,
          userId,
          userAgent: request.headers.get('user-agent') || null,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        });
      } catch (dbError) {
        console.error('Database logging error:', dbError);
        // Continue even if logging fails
      }
    }

    return NextResponse.json({ content: generatedContent });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}