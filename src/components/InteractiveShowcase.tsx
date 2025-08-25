'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Palette, 
  ArrowRight, 
  Sparkles,
  Code,
  Users,
  BarChart3,
  Zap
} from 'lucide-react';

interface CapabilityDemo {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  demoType: 'generator' | 'analyzer' | 'creator' | 'simulator';
  features: string[];
  sampleInput: string;
  sampleOutput: string;
  metrics: {
    speed: string;
    accuracy: string;
    customization: string;
  };
}

const capabilities: CapabilityDemo[] = [
  {
    id: 'curriculum',
    title: 'Curriculum Architect',
    description: 'AI generates complete, standards-aligned curricula in minutes',
    icon: BookOpen,
    category: 'Planning',
    demoType: 'generator',
    features: [
      'Standards alignment (Common Core, NGSS)',
      'Adaptive pacing based on student needs',
      'Integrated assessment planning',
      'Resource recommendations',
      'Cross-curricular connections'
    ],
    sampleInput: '7th grade biology unit on ecosystems, 3 weeks, hands-on focus',
    sampleOutput: `📚 ECOSYSTEM DYNAMICS UNIT - Grade 7 (3 weeks)

🎯 Learning Objectives:
• Analyze ecosystem interactions and energy flow
• Investigate population dynamics and limiting factors  
• Design solutions for ecosystem disruptions

📅 Week 1: Foundation & Energy Flow
  Day 1-2: Ecosystem components lab
  Day 3-4: Food web construction activity
  Day 5: Energy pyramid investigation

📅 Week 2: Population Dynamics
  Day 6-7: Predator-prey simulation
  Day 8-9: Carrying capacity experiment
  Day 10: Human impact case studies

📅 Week 3: Solutions & Assessment
  Day 11-12: Conservation project design
  Day 13-14: Peer presentations
  Day 15: Comprehensive assessment

🔧 Resources Generated:
• 15 hands-on lab activities
• 12 digital simulations
• Assessment rubrics
• Extension activities for advanced learners`,
    metrics: {
      speed: '3 minutes',
      accuracy: '98% standards alignment',
      customization: '50+ variables'
    }
  },
  {
    id: 'assessment',
    title: 'Smart Assessment Engine',
    description: 'Creates adaptive assessments that evolve with student understanding',
    icon: Target,
    category: 'Evaluation',
    demoType: 'analyzer',
    features: [
      'Real-time difficulty adjustment',
      'Multiple question types',
      'Instant feedback generation',
      'Learning gap identification',
      'Progress visualization'
    ],
    sampleInput: 'Student struggling with quadratic equations, shows good algebra basics',
    sampleOutput: `🎯 ADAPTIVE ASSESSMENT RESULTS

📊 Current Understanding:
• Linear equations: ✅ Mastered (92%)
• Factoring: ⚠️ Developing (67%)
• Quadratics: ❌ Needs support (34%)

🔄 Next Questions Adapted:
1. Simplified quadratic: x² + 4x = 0
2. Visual parabola matching
3. Real-world application (projectile motion)

💡 Personalized Hints Generated:
"Think of this like the linear equations you've mastered. 
What if we factor out the common term first?"

📈 Recommended Path:
1. Factoring review (15 min)
2. Guided quadratic practice (20 min)
3. Application problems (10 min)
4. Reassessment with confidence tracking`,
    metrics: {
      speed: '0.3 seconds per question',
      accuracy: '94% improvement prediction',
      customization: 'Infinite variations'
    }
  },
  {
    id: 'content',
    title: 'Content Creator Pro',
    description: 'Transforms any topic into engaging multimedia learning experiences',
    icon: Palette,
    category: 'Creation',
    demoType: 'creator',
    features: [
      'Multi-modal content generation',
      'Interactive element creation',
      'Accessibility optimization',
      'Cultural adaptation',
      'Gamification elements'
    ],
    sampleInput: 'Explain photosynthesis for 5th graders with visual learners',
    sampleOutput: `🌱 PHOTOSYNTHESIS ADVENTURE

🎮 Interactive Story Mode:
"Join Chloro the Chloroplast on a solar-powered journey!"

📺 Generated Content:
• Animated sequence: Sunlight capture
• Interactive diagram: Leaf cross-section
• Virtual lab: Light wavelength experiment
• Song lyrics: "Six CO₂ plus six H₂O..."
• Comic strip: Plant vs. Animal energy

🎯 Differentiated Versions:
👁️ Visual: Colorful animations + infographics
👂 Auditory: Narrated story + sound effects  
✋ Kinesthetic: Movement-based activities
📚 Reading: Illustrated story format

🌍 Cultural Adaptations:
• Urban gardens (city students)
• Rainforest examples (diverse backgrounds)
• Local plants and environments

✅ Accessibility Features:
• Screen reader compatible
• Closed captions
• High contrast mode
• Simplified language option`,
    metrics: {
      speed: '5 minutes per lesson',
      accuracy: '96% engagement rate',
      customization: '20+ formats'
    }
  },
  {
    id: 'analytics',
    title: 'Learning Intelligence',
    description: 'Advanced analytics that predict and prevent learning obstacles',
    icon: Brain,
    category: 'Analytics',
    demoType: 'simulator',
    features: [
      'Predictive intervention alerts',
      'Learning style analysis',
      'Engagement pattern tracking',
      'Outcome forecasting',
      'Personalized recommendations'
    ],
    sampleInput: 'Class of 28 students, week 3 of fractions unit, mixed performance',
    sampleOutput: `🧠 CLASSROOM INTELLIGENCE DASHBOARD

⚠️ Immediate Interventions Needed:
• 3 students at risk of falling behind
• Sarah M.: Switch to visual fraction models
• Marcus J.: Needs foundational review
• Aisha K.: Ready for advanced challenges

📊 Class Performance Prediction:
• Week 4 success rate: 73% → 89% (with interventions)
• Concept mastery timeline: 2.3 weeks
• Confidence levels trending upward

🎯 Personalized Strategies:
• Visual learners (40%): Fraction bars, pie charts
• Kinesthetic (25%): Hands-on manipulatives  
• Analytical (35%): Problem-solving challenges

📈 Recommended Adjustments:
• Extend equivalent fractions by 1 day
• Add peer tutoring for struggling students
• Introduce decimals early for advanced group
• Schedule individual check-ins with 5 students

🔄 Real-time Optimization:
System automatically adjusts difficulty and pacing based on live performance data.`,
    metrics: {
      speed: 'Real-time analysis',
      accuracy: '91% intervention success',
      customization: 'Per-student adaptation'
    }
  }
];

export function InteractiveShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleDemoClick = (id: string) => {
    setActiveDemo(activeDemo === id ? null : id);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-blue-50/20 dark:to-blue-950/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">
              Interactive Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Powers Every Aspect
            </span>
            <br />
            <span className="text-foreground">of Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Click any card to see how AI transforms traditional educational workflows 
            into intelligent, adaptive experiences.
          </p>
        </motion.div>

        {/* Capability Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const isActive = activeDemo === capability.id;
            const isHovered = hoveredCard === capability.id;

            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredCard(capability.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => handleDemoClick(capability.id)}
                  className={`
                    relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                    ${isActive 
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-lg shadow-blue-500/20' 
                      : 'border-border bg-card hover:border-blue-300 hover:shadow-md'
                    }
                  `}
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                      {capability.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Features Preview */}
                  <div className="space-y-1 mb-4">
                    {capability.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                    {capability.features.length > 3 && (
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        +{capability.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        {capability.metrics.speed}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {capability.metrics.accuracy}
                      </span>
                    </div>
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium"
                    >
                      <span className="text-sm">Try Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Demo Output */}
        <AnimatePresence mode="wait">
          {activeDemo && (
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              {(() => {
                const demo = capabilities.find(c => c.id === activeDemo);
                if (!demo) return null;

                return (
                  <div className="bg-gray-900 rounded-2xl p-6 text-green-400 font-mono text-sm overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400">AI Demo: {demo.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Code className="w-4 h-4" />
                        <span>Live Generation</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-blue-400">Input:</span>
                      <div className="text-gray-300 mt-1 pl-4 border-l-2 border-blue-500">
                        {demo.sampleInput}
                      </div>
                    </div>

                    <div>
                      <span className="text-green-400">Output:</span>
                      <div className="mt-2 pl-4 border-l-2 border-green-500">
                        <pre className="whitespace-pre-wrap text-gray-100 leading-relaxed">
                          {demo.sampleOutput}
                        </pre>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
                      <div className="flex gap-6 text-xs">
                        <span>Speed: <span className="text-yellow-400">{demo.metrics.speed}</span></span>
                        <span>Accuracy: <span className="text-green-400">{demo.metrics.accuracy}</span></span>
                        <span>Customization: <span className="text-blue-400">{demo.metrics.customization}</span></span>
                      </div>
                      <button
                        onClick={() => setActiveDemo(null)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        Close Demo
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}