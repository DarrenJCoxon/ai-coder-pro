'use client';

import { useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Users, 
  Clock, 
  BookOpen, 
  Zap, 
  TrendingUp,
  Globe,
  Sparkles
} from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: React.ElementType;
  description: string;
  trend: number;
  color: string;
  animationDelay: number;
}

const stats: StatItem[] = [
  {
    id: 'lines-generated',
    label: 'Lines of Code Generated',
    value: 2847392,
    suffix: '+',
    icon: Code2,
    description: 'AI-generated educational code',
    trend: 12.5,
    color: 'from-blue-500 to-cyan-500',
    animationDelay: 0
  },
  {
    id: 'educators-helped',
    label: 'Educators Empowered',
    value: 15678,
    suffix: '+',
    icon: Users,
    description: 'Teachers using AI tools',
    trend: 23.7,
    color: 'from-purple-500 to-pink-500',
    animationDelay: 0.2
  },
  {
    id: 'time-saved',
    label: 'Hours Saved',
    value: 89234,
    suffix: '+',
    icon: Clock,
    description: 'Development time eliminated',
    trend: 34.2,
    color: 'from-green-500 to-emerald-500',
    animationDelay: 0.4
  },
  {
    id: 'platforms-built',
    label: 'Platforms Created',
    value: 3421,
    suffix: '+',
    icon: BookOpen,
    description: 'Complete learning systems',
    trend: 18.9,
    color: 'from-orange-500 to-red-500',
    animationDelay: 0.6
  },
  {
    id: 'ai-interactions',
    label: 'AI Interactions Daily',
    value: 156789,
    suffix: '',
    icon: Zap,
    description: 'Real-time AI conversations',
    trend: 45.3,
    color: 'from-yellow-500 to-orange-500',
    animationDelay: 0.8
  },
  {
    id: 'countries-reached',
    label: 'Countries Reached',
    value: 67,
    suffix: '',
    icon: Globe,
    description: 'Global educational impact',
    trend: 8.4,
    color: 'from-indigo-500 to-purple-500',
    animationDelay: 1.0
  }
];

function AnimatedCounter({ 
  value, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  delay = 0 
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, motionValue, delay]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function LiveActivityFeed() {
  const [activities, setActivities] = useState<string[]>([
    "AI generated a chemistry lab for Sarah in Toronto 🧪",
    "Marcus completed an adaptive math assessment 📊",
    "New curriculum created for 8th grade biology 🌱",
    "Interactive quiz generated for World History 🌍"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivities = [
        "AI generated a physics simulation for Dr. Kim 🔬",
        "Interactive story created for 3rd grade reading 📚",
        "Assessment adapted for student with dyslexia ♿",
        "Virtual lab built for remote chemistry class 🧪",
        "Personalized learning path created for Emma 🎯",
        "AI translated content to Spanish for Maria 🌐",
        "New coding exercise generated for CS101 💻",
        "Accessibility features added to math content ♿",
        "Virtual field trip created for geography 🗺️",
        "AI tutor helped with calculus problem 🤖"
      ];
      
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
      setActivities(prev => [randomActivity, ...prev.slice(0, 3)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Live Activity
      </h4>
      <div className="space-y-2 max-h-32 overflow-hidden">
        {activities.map((activity, index) => (
          <motion.div
            key={`${activity}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - (index * 0.2), x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800/50 rounded p-2 border-l-2 border-blue-500"
          >
            {activity}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LiveStatsCounter() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-background dark:to-blue-950/20">
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
            <TrendingUp className="w-6 h-6 text-green-500" />
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              Real-Time Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Transforming Education
            </span>
            <br />
            <span className="text-foreground">Every Second</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Watch the real-time impact of AI-powered educational tools across the globe.
          </p>
          <div className="text-sm text-muted-foreground">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.animationDelay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  
                  {/* Content */}
                  <div className="relative">
                    {/* Icon and Trend */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <TrendingUp className="w-3 h-3" />
                        +{stat.trend}%
                      </div>
                    </div>

                    {/* Stat Value */}
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-foreground">
                        <AnimatedCounter 
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          delay={stat.animationDelay * 1000}
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {stat.label}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(stat.trend * 2, 100)}%` }}
                          transition={{ duration: 1.5, delay: stat.animationDelay + 0.5 }}
                          viewport={{ once: true }}
                          className={`h-1 rounded-full bg-gradient-to-r ${stat.color}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Activity Feed */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <LiveActivityFeed />
          </div>

          {/* Global Impact */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Global Reach
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">North America</span>
                <span className="text-sm font-medium">34%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Europe</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Asia Pacific</span>
                <span className="text-sm font-medium">22%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Other Regions</span>
                <span className="text-sm font-medium">16%</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-sm text-blue-700 dark:text-blue-300">
                🌍 AI is democratizing education worldwide, breaking down barriers 
                and making quality learning accessible to everyone.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}