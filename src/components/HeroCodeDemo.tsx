'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface CodeExample {
  title: string;
  description: string;
  language: string;
  code: string;
  category: 'frontend' | 'backend' | 'ai' | 'education';
}

const codeExamples: CodeExample[] = [
  {
    title: "Interactive Quiz Generator",
    description: "AI generates a complete quiz component in seconds",
    language: "React/TypeScript",
    category: "frontend",
    code: `// AI Generated: Interactive Quiz Component
interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function AIQuiz({ topic }: { topic: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // AI generates questions based on topic
    generateQuestions(topic).then(setQuestions);
  }, [topic]);
  
  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQ].correct;
    if (isCorrect) setScore(score + 1);
    setCurrentQ(currentQ + 1);
  };
  
  return (
    <div className="quiz-container">
      <h2>AI-Generated Quiz: {topic}</h2>
      {questions[currentQ] && (
        <QuestionCard 
          question={questions[currentQ]}
          onAnswer={handleAnswer}
        />
      )}
      <ProgressBar current={currentQ + 1} total={questions.length} />
    </div>
  );
}`
  },
  {
    title: "Smart Learning Path API",
    description: "Backend AI that creates personalized learning sequences",
    language: "Python/FastAPI",
    category: "backend",
    code: `# AI Generated: Adaptive Learning Path Engine
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import openai

app = FastAPI()

class LearningProfile(BaseModel):
    student_id: str
    current_level: int
    learning_style: str
    interests: List[str]
    weak_areas: List[str]

class LearningPath(BaseModel):
    path_id: str
    modules: List[Dict]
    estimated_duration: int
    difficulty_progression: List[int]

@app.post("/generate-path")
async def create_learning_path(profile: LearningProfile) -> LearningPath:
    # AI analyzes student profile
    ai_prompt = f"""
    Create a personalized learning path for:
    Level: {profile.current_level}
    Style: {profile.learning_style}
    Interests: {profile.interests}
    Areas to improve: {profile.weak_areas}
    """
    
    # Generate adaptive curriculum
    response = await openai.ChatCompletion.acreate(
        model="gpt-4",
        messages=[{"role": "system", "content": ai_prompt}]
    )
    
    return parse_ai_response_to_path(response.choices[0].message.content)`
  },
  {
    title: "Content Adaptation Engine",
    description: "AI that transforms content for different learning levels",
    language: "TypeScript/AI",
    category: "ai",
    code: `// AI Generated: Dynamic Content Adaptation
interface ContentLevel {
  grade: number;
  readingLevel: string;
  vocabulary: 'basic' | 'intermediate' | 'advanced';
  conceptComplexity: number;
}

class ContentAdapter {
  private aiModel: OpenAI;
  
  constructor() {
    this.aiModel = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  async adaptContent(
    originalContent: string,
    targetLevel: ContentLevel,
    subject: string
  ): Promise<string> {
    const prompt = \`
    Adapt this \${subject} content for:
    - Grade level: \${targetLevel.grade}
    - Reading level: \${targetLevel.readingLevel}
    - Vocabulary: \${targetLevel.vocabulary}
    - Complexity: \${targetLevel.conceptComplexity}/10
    
    Original content: \${originalContent}
    
    Make it engaging and age-appropriate while preserving key concepts.
    \`;
    
    const response = await this.aiModel.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });
    
    return response.choices[0].message.content || originalContent;
  }
}`
  },
  {
    title: "Real-time Assessment Generator",
    description: "AI creates assessments that adapt as students learn",
    language: "React/AI Integration",
    category: "education",
    code: `// AI Generated: Adaptive Assessment System
import { useAI } from '@/hooks/useAI';
import { AssessmentEngine } from '@/lib/assessment';

interface StudentResponse {
  questionId: string;
  answer: string;
  timeSpent: number;
  confidence: number;
}

export function AdaptiveAssessment({ subject, studentId }: {
  subject: string;
  studentId: string;
}) {
  const { generateQuestion, analyzeResponse } = useAI();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [studentProfile, setStudentProfile] = useState({});
  
  const handleResponse = async (response: StudentResponse) => {
    // AI analyzes the response in real-time
    const analysis = await analyzeResponse({
      response,
      studentProfile,
      subject
    });
    
    // Update student understanding model
    setStudentProfile(prev => ({
      ...prev,
      ...analysis.updatedProfile
    }));
    
    // Generate next question based on performance
    const nextQuestion = await generateQuestion({
      subject,
      difficulty: analysis.suggestedDifficulty,
      topics: analysis.focusAreas,
      studentProfile: analysis.updatedProfile
    });
    
    setCurrentQuestion(nextQuestion);
  };
  
  return (
    <div className="adaptive-assessment">
      <AIProgressIndicator profile={studentProfile} />
      {currentQuestion && (
        <QuestionRenderer 
          question={currentQuestion}
          onResponse={handleResponse}
        />
      )}
      <PerformanceInsights profile={studentProfile} />
    </div>
  );
}`
  }
];

export function HeroCodeDemo() {
  const [currentExample, setCurrentExample] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);

  const currentCode = codeExamples[currentExample];

  useEffect(() => {
    if (isPlaying && typingIndex < currentCode.code.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayedCode(currentCode.code.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 30); // Typing speed

      return () => clearTimeout(timer);
    } else if (typingIndex >= currentCode.code.length) {
      setIsTyping(false);
      // Auto advance to next example after completion
      setTimeout(() => {
        nextExample();
      }, 3000);
    }
  }, [typingIndex, isPlaying, currentCode.code]);

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % codeExamples.length);
    setTypingIndex(0);
    setDisplayedCode('');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setTypingIndex(0);
    setDisplayedCode('');
    setIsPlaying(true);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'from-blue-500 to-purple-500',
      backend: 'from-green-500 to-teal-500',
      ai: 'from-purple-500 to-pink-500',
      education: 'from-orange-500 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 ai-gradient-animated opacity-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="w-8 h-8 text-blue-500" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Watch AI Code
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            See how AI transforms simple ideas into complete educational platforms in real-time. 
            No human coding required.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Code Demo Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden glow-box">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{currentCode.language}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={togglePlayPause}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={resetDemo}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 h-96 overflow-y-auto code-block">
                <pre className="text-sm leading-relaxed">
                  <code className="text-gray-300">
                    {displayedCode}
                    {isTyping && <span className="typing-cursor"></span>}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentExample}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(currentCode.category)} text-white`}>
                  {currentCode.category.toUpperCase()}
                </div>
                
                <h2 className="text-3xl font-bold text-foreground">
                  {currentCode.title}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentCode.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>AI actively generating...</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Example Navigation */}
            <div className="flex gap-2 pt-4">
              {codeExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentExample(index);
                    setTypingIndex(0);
                    setDisplayedCode('');
                    setIsPlaying(true);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentExample 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">&lt;30s</div>
                <div className="text-sm text-muted-foreground">Generation Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">100%</div>
                <div className="text-sm text-muted-foreground">AI Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-500">0</div>
                <div className="text-sm text-muted-foreground">Human Edits</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}