import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';
import { AIRequest } from '@/types/ai';

export async function GET() {
  try {
    const healthCheck = await AIService.healthCheck();
    const availableModels = AIService.getAvailableModels();
    
    return NextResponse.json({ 
      status: 'operational',
      healthy: healthCheck,
      availableModels: availableModels.map(model => ({
        id: model.id,
        name: model.name,
        description: model.description,
        isActive: model.isActive,
        capabilities: model.capabilities
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        healthy: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, modelId, botPersonality, temperature, maxTokens, context } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const aiRequest: AIRequest = {
      prompt,
      modelId,
      botPersonality,
      temperature,
      maxTokens,
      context
    };

    const response = await AIService.generateContent(aiRequest);
    
    return NextResponse.json({
      content: response.content,
      modelUsed: response.modelUsed,
      tokensUsed: response.tokensUsed,
      processingTime: response.processingTime,
      metadata: response.metadata
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    
    // Handle specific AI errors
    if (error && typeof error === 'object' && 'code' in error) {
      return NextResponse.json(
        { 
          error: (error as any).message,
          code: (error as any).code,
          details: (error as any).details
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to generate AI content',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}