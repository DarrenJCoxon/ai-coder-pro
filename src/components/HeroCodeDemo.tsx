'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';

const poeticLines = [
  "Your ideas deserve beautiful form.",
  "Transform thoughts into learning experiences.",
  "Create without confusion, teach without limits."
];

export function HeroCodeDemo() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % poeticLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <Sparkles className="w-8 h-8 mx-auto text-amber-400 mb-6" />
          
          <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
            Stop wrestling with
            <br />
            <span className="font-medium text-amber-400">platforms</span>
          </h1>
          
          <div className="h-16 flex items-center justify-center mb-8">
            <motion.p
              key={currentLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 font-light italic"
            >
              {poeticLines[currentLine]}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="border-l-2 border-gray-700 pl-6">
              <p className="text-gray-400 mb-3 italic">
                "I have this amazing lesson idea, but..."
              </p>
              <p className="text-2xl font-light leading-relaxed">
                Watch it become a living, breathing experience
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>Safe. Simple. Yours.</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                No confusing platforms. No data worries. Just the joy of 
                watching your teaching vision become reality.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Your next lesson</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full opacity-60" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-60" />
                    <div className="w-3 h-3 bg-green-400 rounded-full opacity-60" />
                  </div>
                </div>
                
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-amber-400 font-mono text-sm"
                >
                  ✨ Understanding your vision...
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-20"
        >
          <button className="group inline-flex items-center gap-3 bg-amber-400 text-black px-8 py-4 rounded-full font-medium hover:bg-amber-300 transition-all duration-300">
            Begin your next lesson
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            No setup. No confusion. Just possibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
}