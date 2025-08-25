'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Lightbulb, 
  Wand2, 
  Share2, 
  Users, 
  Clock, 
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const timelineSteps = [
  {
    id: 'think',
    icon: Lightbulb,
    title: 'Think it',
    subtitle: 'Just describe your vision',
    description: 'No technical knowledge needed. Simply tell us what you want your students to experience.',
    time: '30 seconds',
    detail: 'Natural language is all you need',
    color: 'from-amber-400 to-orange-500',
    beforeState: 'Spending hours researching platforms...',
    afterState: 'One simple sentence'
  },
  {
    id: 'build',
    icon: Wand2,
    title: 'Build it',
    subtitle: 'AI crafts your resource',
    description: 'Watch as AI transforms your idea into a fully interactive educational experience.',
    time: '2-3 minutes',
    detail: 'Complete with assessments & analytics',
    color: 'from-blue-400 to-purple-500',
    beforeState: 'Wrestling with complex coding platforms...',
    afterState: 'AI handles everything'
  },
  {
    id: 'share',
    icon: Share2,
    title: 'Share it',
    subtitle: 'One click to deploy',
    description: 'Your resource goes live instantly with a simple, safe link your students can access.',
    time: 'Instant',
    detail: 'No accounts needed for students',
    color: 'from-green-400 to-emerald-500',
    beforeState: 'Worrying about student data safety...',
    afterState: 'Completely secure by default'
  },
  {
    id: 'engage',
    icon: Users,
    title: 'Students engage',
    subtitle: 'Learning comes alive',
    description: 'Students dive into an experience tailored perfectly to your teaching goals.',
    time: 'Immediately',
    detail: 'Real-time progress insights for you',
    color: 'from-pink-400 to-rose-500',
    beforeState: 'Students struggling with static content...',
    afterState: 'Interactive, adaptive learning'
  }
];

interface TimelineStepProps {
  step: typeof timelineSteps[0];
  index: number;
  isActive: boolean;
  isVisible: boolean;
}

function TimelineStep({ step, index, isActive, isVisible }: TimelineStepProps) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3, 
        y: isVisible ? 0 : 20,
        scale: isActive ? 1.02 : 1
      }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative ${isActive ? 'z-10' : 'z-0'}`}
    >
      {/* Connection Line */}
      {index < timelineSteps.length - 1 && (
        <div className="absolute left-6 top-16 w-0.5 h-24 bg-gradient-to-b from-gray-600 to-gray-800" />
      )}
      
      {/* Progress Line */}
      {index < timelineSteps.length - 1 && isVisible && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isActive ? '100px' : '0px' }}
          transition={{ duration: 1, delay: index * 0.3 }}
          className={`absolute left-6 top-16 w-0.5 bg-gradient-to-b ${step.color}`}
        />
      )}

      <div className="flex items-start gap-6">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`relative flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
          {isActive && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-30`}
            />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium text-white">{step.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{step.time}</span>
              </div>
            </div>
            
            <p className="text-amber-400 font-medium mb-3">{step.subtitle}</p>
            <p className="text-gray-300 leading-relaxed mb-4">{step.description}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>{step.detail}</span>
            </div>

            {/* Before/After */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                <p className="text-red-300 text-sm">
                  <span className="font-medium">Before:</span> {step.beforeState}
                </p>
              </div>
              <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                <p className="text-green-300 text-sm">
                  <span className="font-medium">Now:</span> {step.afterState}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % timelineSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <ArrowRight className="w-6 h-6 text-amber-400" />
            <span className="text-amber-400 font-medium">Simple Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            From confusion to
            <span className="block font-medium text-amber-400">classroom magic</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The complete journey takes minutes, not months. No technical expertise required.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
              isVisible={isInView}
            />
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <Shield className="w-8 h-8 text-green-400" />
              <Clock className="w-8 h-8 text-blue-400" />
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            
            <h3 className="text-2xl font-light text-white mb-4">
              Safe, fast, and designed for teachers
            </h3>
            
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
              Every step is built with busy educators in mind. No learning curves, 
              no technical headaches, no data concerns. Just the joy of seeing your 
              teaching vision come to life.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-amber-400 text-black px-8 py-4 rounded-full font-medium hover:bg-amber-300 transition-all duration-300"
            >
              Start your first resource
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}