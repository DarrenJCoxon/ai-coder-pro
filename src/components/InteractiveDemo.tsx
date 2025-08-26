'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Users, Clock, MousePointer, Shield, Wand2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const demoPrompts = [
  "Create an interactive photosynthesis lab for Year 7",
  "Build a World War 2 timeline with primary sources",
  "Design fraction practice games for primary school", 
  "Make a solar system exploration for Year 5 pupils"
];

type DemoResource = {
  content: string;
};

export function InteractiveDemo() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentResource, setCurrentResource] = useState<DemoResource | null>(null);
  const [animationPhase, setAnimationPhase] = useState('idle'); // 'idle', 'moving', 'clicking', 'generating', 'showing'
  const currentIndexRef = useRef(0);

  const generateAIContent = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      return data.content || 'AI will transform your lesson idea into an interactive educational experience with multimedia content, student engagement features, and easy deployment.';
    } catch (error) {
      console.error('Error generating AI content:', error);
      return 'AI will transform your lesson idea into an interactive educational experience with multimedia content, student engagement features, and easy deployment.';
    }
  };

  useEffect(() => {
    const startDemo = () => {
      if (animationPhase !== 'idle') return;
      
      // Use the current ref value for this animation cycle
      const activeIndex = currentIndexRef.current;
      
      setAnimationPhase('moving');
      setIsAnimating(true);
      
      // Mouse moves to prompt
      setTimeout(() => {
        setAnimationPhase('clicking');
        
        // Click animation
        setTimeout(() => {
          setAnimationPhase('generating');
          
          // Generate AI resource using the captured index
          const promptToUse = demoPrompts[activeIndex];
          generateAIContent(promptToUse).then(content => {
            setCurrentResource({ content });
            setAnimationPhase('showing');
            
            // Show for a bit, then cycle to next
            setTimeout(() => {
              currentIndexRef.current = (currentIndexRef.current + 1) % demoPrompts.length;
              setCurrentPromptIndex(currentIndexRef.current);
              setCurrentResource(null);
              setIsAnimating(false);
              setAnimationPhase('idle');
            }, 4000);
          });
        }, 500);
      }, 1000);
    };

    const interval = setInterval(startDemo, 8000);
    startDemo(); // Start immediately

    return () => clearInterval(interval);
  }, []); // Empty dependency array

  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Sparkles className="w-8 h-8 mx-auto text-amber-400 mb-6" />
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Watch the magic
            <span className="block font-medium text-amber-400">unfold</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how teacher ideas transform into complete educational experiences. 
            This happens automatically every few seconds.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Chatbot Interface + Prompt Starters */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Top: Chatbot Interface */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">AI Resource Generator</span>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-4 min-h-[120px]">
                {/* Teacher Input */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-black text-sm font-medium flex-shrink-0">
                    T
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-3 max-w-[80%]">
                    <p className="text-white text-sm">
                      {isAnimating && animationPhase !== 'idle' ? demoPrompts[currentPromptIndex] : "Click a starter below to see AI in action..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom: Prompt Starters */}
            <div className="space-y-4">
              <h3 className="text-lg text-white">Try these ideas:</h3>
              
              {demoPrompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  className={`relative p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                    currentPromptIndex === index && isAnimating
                      ? 'bg-amber-400/10 border-amber-400 text-white' 
                      : 'bg-gray-800/30 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPromptIndex === index && isAnimating ? 'bg-amber-400' : 'bg-gray-600'
                    }`} />
                    <span className="text-sm">&quot;{prompt}&quot;</span>
                  </div>
                  
                  {/* Animated Mouse Pointer */}
                  <AnimatePresence>
                    {currentPromptIndex === index && animationPhase === 'moving' && (
                      <motion.div
                        initial={{ opacity: 0, x: -30, y: -30 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                      >
                        <MousePointer className="w-6 h-6 text-amber-400" />
                      </motion.div>
                    )}
                    
                    {currentPromptIndex === index && animationPhase === 'clicking' && (
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 0.8, 1] }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                      >
                        <MousePointer className="w-6 h-6 text-amber-400" />
                        <motion.div
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 6, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 bg-amber-400/30 rounded-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Portrait Resource Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 min-h-[600px]">
              <AnimatePresence mode="wait">
                {animationPhase === 'generating' ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 flex flex-col justify-center h-full"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 mx-auto mb-6 border-4 border-amber-400 border-t-transparent rounded-full"
                      />
                      <h3 className="text-2xl text-amber-400 mb-4">AI is crafting your resource...</h3>
                      <p className="text-gray-400">Building interactive components, assessments, and student experiences</p>
                    </div>
                  </motion.div>
                ) : currentResource ? (
                  <motion.div
                    key="resource"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    {/* Resource Header */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                          <Wand2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-amber-400 text-sm font-medium">AI Generated Resource</p>
                          <h3 className="text-2xl font-light text-white">Educational Experience</h3>
                        </div>
                      </div>
                    </div>

                    {/* AI Generated Content */}
                    <div className="text-gray-300 text-lg leading-relaxed prose prose-invert max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({children}) => <h1 className="text-xl font-bold text-white mb-3">{children}</h1>,
                          h2: ({children}) => <h2 className="text-lg font-bold text-white mb-2">{children}</h2>,
                          h3: ({children}) => <h3 className="text-base font-bold text-white mb-2">{children}</h3>,
                          p: ({children}) => <p className="text-gray-300 mb-2 leading-relaxed text-sm">{children}</p>,
                          strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                          em: ({children}) => <em className="text-amber-400">{children}</em>,
                          ul: ({children}) => <ul className="text-gray-300 mb-2 space-y-1 ml-4 text-sm">{children}</ul>,
                          ol: ({children}) => <ol className="text-gray-300 mb-2 space-y-1 ml-4 text-sm">{children}</ol>,
                          li: ({children}) => <li className="text-gray-300 text-sm">{children}</li>,
                          code: ({children}) => <code className="bg-gray-800 text-amber-400 px-2 py-1 rounded text-xs">{children}</code>,
                        }}
                      >
                        {currentResource.content}
                      </ReactMarkdown>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                        <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 font-medium text-sm">Ready in 90s</p>
                        <p className="text-gray-400 text-xs">Deploy time</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                        <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-400 font-medium text-sm">100% Secure</p>
                        <p className="text-gray-400 text-xs">Student data</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="text-center pt-4">
                      <button className="bg-amber-400 text-black px-6 py-3 rounded-xl font-medium hover:bg-amber-300 transition-colors inline-flex items-center gap-2">
                        <span>Deploy this resource</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </button>
                      <p className="text-gray-400 text-xs mt-2">No coding required • Pupil-safe • Instant sharing</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-full text-gray-400"
                  >
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 mx-auto bg-gray-800/50 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-10 h-10 opacity-50" />
                      </div>
                      <div>
                        <h3 className="text-lg text-white mb-2">Ready to create</h3>
                        <p className="text-sm">Choose a lesson idea to see AI transform it into an interactive resource</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}