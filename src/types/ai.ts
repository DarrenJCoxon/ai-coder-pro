// AI Model and Bot Configuration Types

export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: 'openrouter' | 'openai' | 'anthropic' | 'google';
  modelId: string;
  capabilities: AICapability[];
  maxTokens: number;
  costPerToken?: number;
  isActive: boolean;
  metadata?: {
    contextWindow?: number;
    trainingData?: string;
    strengths?: string[];
    limitations?: string[];
  };
}

export interface AICapability {
  type: 'text-generation' | 'code-generation' | 'analysis' | 'creative-writing' | 'education' | 'assessment';
  proficiency: 'basic' | 'intermediate' | 'advanced' | 'expert';
  description: string;
}

export interface BotPersonality {
  id: string;
  name: string;
  description: string;
  tone: 'professional' | 'friendly' | 'enthusiastic' | 'academic' | 'creative';
  expertise: string[];
  systemPrompt: string;
  examples: string[];
  isActive: boolean;
}

export interface AIRequest {
  prompt: string;
  modelId?: string;
  botPersonality?: string;
  temperature?: number;
  maxTokens?: number;
  context?: string;
  metadata?: Record<string, any>;
}

export interface AIResponse {
  content: string;
  modelUsed: string;
  tokensUsed: number;
  processingTime: number;
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface AIError {
  code: string;
  message: string;
  details?: any;
}

// Available AI Models Configuration
export const AI_MODELS: AIModel[] = [
  {
    id: 'gemma-3-12b-it',
    name: 'Google Gemma 3 12B Instruct',
    description: 'Advanced educational AI model optimized for interactive teaching and learning content generation',
    provider: 'openrouter',
    modelId: 'google/gemma-3-12b-it',
    capabilities: [
      {
        type: 'education',
        proficiency: 'expert',
        description: 'Exceptional at creating educational content, lesson plans, and interactive learning materials'
      },
      {
        type: 'text-generation',
        proficiency: 'advanced',
        description: 'High-quality text generation with educational focus'
      },
      {
        type: 'assessment',
        proficiency: 'advanced',
        description: 'Can create quizzes, assessments, and educational evaluations'
      }
    ],
    maxTokens: 8192,
    isActive: true,
    metadata: {
      contextWindow: 8192,
      trainingData: 'Up to 2024, optimized for educational content',
      strengths: ['Educational content', 'Curriculum design', 'Interactive materials', 'Student engagement'],
      limitations: ['Limited context window compared to some newer models']
    }
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'OpenAI\'s most capable model for complex educational tasks and detailed content creation',
    provider: 'openrouter',
    modelId: 'openai/gpt-4-turbo',
    capabilities: [
      {
        type: 'education',
        proficiency: 'expert',
        description: 'Excellent for complex educational content and advanced pedagogy'
      },
      {
        type: 'code-generation',
        proficiency: 'expert',
        description: 'Superior code generation for educational programming content'
      },
      {
        type: 'analysis',
        proficiency: 'expert',
        description: 'Deep analysis of educational effectiveness and learning outcomes'
      }
    ],
    maxTokens: 4096,
    isActive: false, // Can be enabled later
    metadata: {
      contextWindow: 128000,
      trainingData: 'Extensive training data with focus on accuracy and reasoning',
      strengths: ['Complex reasoning', 'Code generation', 'Academic writing', 'Detailed analysis'],
      limitations: ['Higher cost per token']
    }
  }
];

// Bot Personalities for Educational Content
export const BOT_PERSONALITIES: BotPersonality[] = [
  {
    id: 'educational-specialist',
    name: 'Educational Specialist',
    description: 'Friendly, encouraging teacher focused on creating engaging educational content',
    tone: 'enthusiastic',
    expertise: ['curriculum design', 'student engagement', 'interactive learning', 'assessment creation'],
    systemPrompt: `You are an expert educational content creator specializing in creating compelling, concise summaries of educational resources. Your goal is to create attractive, engaging summaries that preview what an educational resource would contain without generating the full content.

You should:
1. Create concise, compelling summaries (under 150 words)
2. Use engaging, marketing-friendly language
3. Focus on student benefits and learning outcomes  
4. Highlight interactive and engaging elements
5. Use proper markdown formatting for visual appeal
6. Never ask questions back - always generate the summary directly
7. Make the content sound exciting and innovative
8. Include practical details like timing and age appropriateness

Format requirements:
- Use ## for titles
- Use **bold** for key features
- Use bullet points for lists
- Use *italics* for engagement elements
- Keep responses concise but compelling`,
    examples: [
      'Create an interactive photosynthesis lab for Year 7 students',
      'Design a World War 2 timeline with primary sources',
      'Build fraction practice games for primary school'
    ],
    isActive: true
  },
  {
    id: 'curriculum-architect',
    name: 'Curriculum Architect',
    description: 'Professional educator focused on standards-aligned curriculum development',
    tone: 'professional',
    expertise: ['curriculum standards', 'learning progressions', 'assessment alignment', 'educational policy'],
    systemPrompt: `You are a professional curriculum architect with deep knowledge of educational standards and learning progressions. Your focus is on creating comprehensive, standards-aligned educational resources. You should:

1. Ensure alignment with relevant curriculum standards
2. Create clear learning progressions
3. Include formative and summative assessments
4. Provide differentiation strategies
5. Consider diverse learning styles and needs
6. Include success criteria and rubrics
7. Connect to real-world applications

Always provide structured, comprehensive educational resources that meet professional teaching standards.`,
    examples: [
      'Develop a complete unit on renewable energy for secondary science',
      'Create a mathematics progression for algebraic thinking',
      'Design literacy assessments for primary reading comprehension'
    ],
    isActive: true
  }
];

// Utility functions
export function getActiveModel(): AIModel | undefined {
  return AI_MODELS.find(model => model.isActive);
}

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find(model => model.id === id);
}

export function getActiveBotPersonality(): BotPersonality | undefined {
  return BOT_PERSONALITIES.find(bot => bot.isActive);
}

export function getBotPersonalityById(id: string): BotPersonality | undefined {
  return BOT_PERSONALITIES.find(bot => bot.id === id);
}