import { AIModel, AIRequest, AIResponse, AIError, getActiveModel, getModelById, getActiveBotPersonality, getBotPersonalityById } from '@/types/ai';

export class AIService {
  private static readonly OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
  private static readonly API_KEY = process.env.OPENROUTER_API_KEY;

  /**
   * Generate content using the specified AI model
   */
  static async generateContent(request: AIRequest): Promise<AIResponse> {
    if (!this.API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    // Get the model to use
    const model = request.modelId 
      ? getModelById(request.modelId) 
      : getActiveModel();

    if (!model) {
      throw new Error('No active AI model found');
    }

    // Get bot personality if specified
    const botPersonality = request.botPersonality
      ? getBotPersonalityById(request.botPersonality)
      : getActiveBotPersonality();

    // Construct the system prompt
    const systemPrompt = botPersonality 
      ? botPersonality.systemPrompt 
      : 'You are an expert educational content creator. Create engaging, interactive educational resources.';

    // Prepare the messages
    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: this.formatUserPrompt(request)
      }
    ];

    const startTime = Date.now();

    try {
      const response = await fetch(`${this.OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
          'X-Title': 'ResourceForge - AI Education Platform',
        },
        body: JSON.stringify({
          model: model.modelId,
          messages,
          temperature: request.temperature || 0.3,
          max_tokens: Math.min(request.maxTokens || 300, 300), // Limit to 300 tokens for summaries
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;

      if (!data.choices || !data.choices[0]) {
        throw new Error('Invalid response from AI model');
      }

      return {
        content: data.choices[0].message.content,
        modelUsed: model.name,
        tokensUsed: data.usage?.total_tokens || 0,
        processingTime,
        metadata: {
          modelId: model.id,
          botPersonality: botPersonality?.name,
          temperature: request.temperature || 0.7,
          requestId: data.id
        }
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Return a structured error
      const aiError: AIError = {
        code: 'AI_GENERATION_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error
      };

      throw aiError;
    }
  }

  /**
   * Format the user prompt with context for summary generation
   */
  private static formatUserPrompt(request: AIRequest): string {
    let prompt = `Generate a concise, attractive summary for this educational resource concept: "${request.prompt}"`;

    if (request.context) {
      prompt = `Context: ${request.context}\n\nRequest: ${prompt}`;
    }

    // Add educational summary context with specific formatting requirements
    prompt += `

Create an engaging summary that:
- Starts with a compelling title (use ## for markdown heading)
- Briefly describes what students will do (1-2 sentences)
- Lists 3-4 key learning features using bullet points
- Mentions interactive elements students will engage with
- Includes estimated time and target age group
- Ends with one sentence about learning outcomes

Keep the total response under 150 words. Use markdown formatting with:
- ## for the main title
- **bold** for key terms
- Bullet points for features
- *italics* for engagement elements

Do not ask questions back. Generate the summary directly.`;

    return prompt;
  }

  /**
   * Get available models
   */
  static getAvailableModels(): AIModel[] {
    const { AI_MODELS } = require('@/types/ai');
    return AI_MODELS;
  }

  /**
   * Get model information by ID
   */
  static getModelInfo(modelId: string): AIModel | undefined {
    return getModelById(modelId);
  }

  /**
   * Health check for the AI service
   */
  static async healthCheck(): Promise<boolean> {
    if (!this.API_KEY) {
      return false;
    }

    try {
      const response = await fetch(`${this.OPENROUTER_BASE_URL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}