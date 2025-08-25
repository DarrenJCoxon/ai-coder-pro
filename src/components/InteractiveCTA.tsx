'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  Clock, 
  Shield,
  ArrowRight,
  CheckCircle,
  Wand2
} from 'lucide-react';

const ctaPrompts = [
  "Create an interactive photosynthesis lab for Year 7",
  "Build a World War 2 timeline with primary sources",
  "Design fraction practice games for primary school",
  "Make a solar system exploration for Year 5 pupils"
];

type GeneratedResource = {
  title: string;
  type: string;
  description: string;
  features: string[];
  deployTime: string;
  studentAccess: string;
  preview: string;
  engagement: string;
  outcome: string;
};

const mockGeneratedResources: Record<string, GeneratedResource> = {
  "Create an interactive photosynthesis lab for Year 7": {
    title: "Living Lab: Photosynthesis Explorer",
    type: "Interactive Virtual Laboratory",
    description: "Pupils manipulate light wavelengths, CO₂ levels, and water availability to discover how plants create energy. Real-time molecular animations show glucose formation.",
    features: [
      "3D chloroplast visualisation with zoom controls",
      "Light spectrum slider affecting reaction rates", 
      "Molecule tracker showing O₂ and glucose production",
      "Built-in assessment with adaptive questioning",
      "Progress dashboard for teacher insights"
    ],
    deployTime: "Ready in 90 seconds",
    studentAccess: "Instant QR code sharing",
    preview: "🌱 Pupils drag different coloured lights onto leaves and watch chlorophyll molecules dance as glucose forms in real-time...",
    engagement: "95% pupil completion rate",
    outcome: "Interactive, safe, and yours to customise"
  },
  "Build a World War 2 timeline with primary sources": {
    title: "Voices of History: WWII Timeline",
    type: "Interactive Historical Journey",
    description: "Immersive timeline with primary source documents, personal stories, and interactive decision points that help pupils understand the human impact of war.",
    features: [
      "Clickable timeline with major events and personal stories",
      "Primary source document viewer with guided analysis",
      "Interactive map showing global impact",
      "Character perspective switching (soldier, civilian, leader)",
      "Critical thinking prompts at decision points"
    ],
    deployTime: "Ready in 2 minutes",
    studentAccess: "Simple link sharing",
    preview: "📜 Pupils click on D-Day and hear a soldier's letter home, then analyse propaganda posters from three different countries...",
    engagement: "Pupils spend 40% longer exploring",
    outcome: "Deep learning through authentic sources"
  }
};

export function InteractiveCTA() {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResource, setGeneratedResource] = useState<GeneratedResource | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ctaPrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const generateAISummary = async (input: string): Promise<string> => {
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      return data.content || 'Unable to generate content at this time.';
    } catch (error) {
      console.error('Error generating AI summary:', error);
      // Fallback to a generic message if API fails
      return 'AI will transform your lesson idea into an interactive educational experience with multimedia content, student engagement features, and easy deployment. Perfect for busy teachers who want powerful resources without the complexity.';
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim() && !showDemo) return;

    const inputToUse = userInput.trim() || ctaPrompts[placeholderIndex];
    
    // First show AI summary
    if (!showSummary) {
      setIsGenerating(true);
      const summary = await generateAISummary(inputToUse);
      setAiSummary(summary);
      setIsGenerating(false);
      setShowSummary(true);
      return;
    }
    
    // Then proceed with full generation
    setIsGenerating(true);
    setShowDemo(true);
    
    // Simulate AI processing with realistic timing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const resource = mockGeneratedResources[inputToUse] || mockGeneratedResources[ctaPrompts[0]] || Object.values(mockGeneratedResources)[0];
    setGeneratedResource(resource);
    setIsGenerating(false);
  };

  const tryExample = (prompt: string) => {
    setUserInput(prompt);
    setShowDemo(false);
    setTimeout(() => handleGenerate(), 100);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-400/5 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Wand2 className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 font-medium">Live AI Demo</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
            Ready to create
            <span className="block font-medium text-amber-400">your own resource?</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Now it&apos;s your turn. Enter your lesson idea and get a custom educational resource 
            built just for your pupils.
          </p>
        </motion.div>

        {!showDemo && !showSummary ? (
          /* Initial Input State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Input */}
            <div className="relative mb-8">
              <form onSubmit={handleGenerate} className="relative">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your lesson idea..."
                  className="w-full bg-amber-400 text-black px-8 py-6 pr-20 text-xl font-medium rounded-2xl hover:bg-amber-300 transition-all duration-300 hover:scale-105"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black text-amber-400 rounded-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105"
                >
                  <Wand2 className="w-6 h-6" />
                </button>
              </form>
            </div>

            {/* Example Prompts */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {ctaPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => tryExample(prompt)}
                  className="text-left p-4 bg-gray-800/30 hover:bg-gray-700/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-amber-400/50 group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>&quot;{prompt}&quot;</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Completely secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Ready in minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>No pupil accounts needed</span>
              </div>
            </div>
          </motion.div>
        ) : showSummary && !showDemo ? (
          /* AI Summary Preview */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* User Input Display */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-black font-medium">
                  You
                </div>
                <span className="text-gray-400">Your lesson idea</span>
              </div>
              <p className="text-white text-lg">{userInput}</p>
            </div>
            
            {/* AI Summary */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-amber-400 text-sm font-medium">{isGenerating ? 'AI Analysis in Progress' : 'AI Resource Generator'}</p>
                  <h3 className="text-xl font-light text-white">{isGenerating ? 'Processing your concept...' : 'Ready to build'}</h3>
                </div>
              </div>
              
              {isGenerating ? (
                <div className="space-y-6 flex flex-col justify-center min-h-[120px]">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 mx-auto mb-4 border-4 border-amber-400 border-t-transparent rounded-full"
                    />
                    <p className="text-gray-300 leading-relaxed">AI is analyzing your lesson concept and designing the perfect interactive experience...</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 text-green-400 mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">AI understands your concept!</span>
                  </div>
                  
                  <div className="text-gray-300 text-lg leading-relaxed prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Custom styling for markdown elements
                        h1: ({...props}: any) => <h1 className="text-2xl font-bold text-white mb-4" {...props} />,
                        h2: ({...props}: any) => <h2 className="text-xl font-semibold text-white mb-3" {...props} />,
                        h3: ({...props}: any) => <h3 className="text-lg font-medium text-white mb-2" {...props} />,
                        p: ({...props}: any) => <p className="text-gray-300 mb-3 leading-relaxed" {...props} />,
                        strong: ({...props}: any) => <strong className="text-amber-400 font-semibold" {...props} />,
                        em: ({...props}: any) => <em className="text-amber-200 italic" {...props} />,
                        ul: ({...props}: any) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                        ol: ({...props}: any) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                        li: ({...props}: any) => <li className="text-gray-300" {...props} />,
                        code: ({inline, ...props}: any) => 
                          inline 
                            ? <code className="bg-gray-800 text-amber-400 px-1 py-0.5 rounded text-sm" {...props} />
                            : <code className="block bg-gray-800 text-amber-400 p-3 rounded-lg text-sm overflow-x-auto" {...props} />,
                        blockquote: ({...props}: any) => <blockquote className="border-l-4 border-amber-400 pl-4 italic text-amber-200 my-3" {...props} />
                      }}
                    >
                      {aiSummary}
                    </ReactMarkdown>
                  </div>
                  
                  {/* Student Experience Preview */}
                  <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-6">
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      What pupils will experience:
                    </h4>
                    <p className="text-amber-200 italic leading-relaxed">Interactive, engaging content that adapts to their learning pace with built-in assessments, real-time feedback, and collaborative features that make learning feel like play.</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                      <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 font-medium text-sm">Ready in 90s</p>
                      <p className="text-gray-400 text-xs">Deploy time</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                      <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-400 font-medium text-sm">100% Secure</p>
                      <p className="text-gray-400 text-xs">Pupil data</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                      <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <p className="text-purple-400 font-medium text-sm">Any Class Size</p>
                      <p className="text-gray-400 text-xs">Scales perfectly</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Sign In CTA */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate()}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-black px-12 py-6 rounded-2xl text-xl font-medium hover:from-amber-300 hover:to-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create This Resource - Sign Up Free
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              
              <p className="text-gray-400 text-sm mt-4">
                Free account • No credit card required • Build unlimited resources
              </p>
              
              <button
                onClick={() => {
                  setShowSummary(false);
                  setAiSummary('');
                  setUserInput('');
                }}
                className="text-amber-400 hover:text-amber-300 text-sm mt-4 underline"
              >
                Try a different idea
              </button>
            </div>
          </motion.div>
        ) : (
          /* Demo Generation & Results */
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-16"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-8 border-4 border-amber-400 border-t-transparent rounded-full"
                  />
                  
                  <h3 className="text-2xl text-white mb-6">Building your resource...</h3>
                  
                  <div className="space-y-4 max-w-md mx-auto">
                    {[
                      "Understanding your learning objectives...",
                      "Designing interactive elements...",
                      "Creating adaptive assessments...",
                      "Ensuring accessibility compliance...",
                      "Finalizing student experience..."
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.4 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <div className="w-2 h-2 bg-amber-400 rounded-full" />
                        <span className="text-sm">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : generatedResource ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  {/* Generated Resource Preview */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium text-white">{generatedResource.title}</h3>
                        <p className="text-amber-400 font-medium">{generatedResource.type}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {generatedResource.description}
                    </p>

                    {/* What Students Experience */}
                    <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-6 mb-6">
                      <h4 className="text-white font-medium mb-3">What pupils experience:</h4>
                      <p className="text-amber-200 italic leading-relaxed">
                        {generatedResource.preview}
                      </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                        <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 font-medium">{generatedResource.deployTime}</p>
                        <p className="text-gray-400 text-sm">Deploy time</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                        <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-400 font-medium">{generatedResource.studentAccess}</p>
                        <p className="text-gray-400 text-sm">Pupil access</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                        <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-purple-400 font-medium">{generatedResource.engagement}</p>
                        <p className="text-gray-400 text-sm">Engagement boost</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <h4 className="text-white font-medium">Included features:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {generatedResource.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Final CTA */}
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-black px-12 py-6 rounded-2xl text-xl font-medium hover:from-amber-300 hover:to-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Get this resource - Sign up free
                      <ArrowRight className="w-6 h-6" />
                    </motion.button>
                    
                    <p className="text-gray-400 text-sm mt-4">
                      Free account • No credit card required • {generatedResource.outcome}
                    </p>
                    
                    <button
                      onClick={() => {
                        setShowDemo(false);
                        setShowSummary(false);
                        setGeneratedResource(null);
                        setUserInput('');
                        setAiSummary('');
                      }}
                      className="text-amber-400 hover:text-amber-300 text-sm mt-4 underline"
                    >
                      Try another idea
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}