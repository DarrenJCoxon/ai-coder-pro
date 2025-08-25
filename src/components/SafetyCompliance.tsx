'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Shield, 
  Lock, 
  FileText, 
  Eye, 
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  School
} from 'lucide-react';

const complianceStandards = [
  {
    id: 'global-privacy',
    name: 'Global Privacy Protection',
    regions: 'GDPR (EU) • FERPA (US) • UK DfE',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    status: 'Fully Compliant',
    description: 'Comprehensive data protection meeting the strictest global standards for student privacy and educational data security',
    guarantees: [
      'Right to erasure - delete any data instantly (GDPR)',
      'Educational records never shared without consent (FERPA)',
      'UK Department for Education 2018 guidance compliance',
      'Complete data subject rights and lawful processing',
      'School maintains full data controller rights',
      'Privacy by design architecture'
    ],
    regulations: 'Meets GDPR Article 17, FERPA §99.31, UK DfE Data Protection guidance'
  },
  {
    id: 'child-safety',
    name: 'Child Safety & Protection',
    regions: 'COPPA (US) • GDPR Article 8 • UK DfE',
    icon: Shield,
    color: 'from-green-500 to-green-600',
    status: 'Fully Compliant',
    description: 'Specialized protections for children under 13 with enhanced privacy safeguards and parental control systems',
    guarantees: [
      'Zero personal data collection from under-13s (COPPA)',
      'Parental consent mechanisms built-in',
      'Age-appropriate data handling protocols',
      'No behavioral tracking of children',
      'Enhanced consent for children 13-16 (GDPR Article 8)',
      'Child-specific privacy impact assessments'
    ],
    regulations: 'Meets COPPA 15 USC §6501, GDPR Article 8, UK DfE safeguarding standards'
  },
  {
    id: 'ai-transparency',
    name: 'AI Transparency & Ethics',
    regions: 'EU AI Act • GDPR Article 22 • US Guidelines',
    icon: Eye,
    color: 'from-purple-500 to-purple-600',
    status: 'Fully Compliant',
    description: 'Transparent AI systems with human oversight, bias prevention, and explainable decision-making processes',
    guarantees: [
      'AI decision-making fully transparent and explainable',
      'Human oversight required for all AI outputs',
      'Comprehensive bias testing and mitigation',
      'No automated decision-making without human review',
      'Clear AI system documentation and audit trails',
      'Right to explanation for AI-driven decisions'
    ],
    regulations: 'Meets EU AI Act Article 13, GDPR Article 22, algorithmic accountability standards'
  }
];

const dataProtections = [
  {
    icon: Database,
    title: 'Zero Training Data Use',
    description: 'Your classroom data is never, ever used to train AI models. Period.',
    guarantee: 'Contractual guarantee with financial penalties'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data encrypted in transit and at rest with military-grade security.',
    guarantee: 'AES-256 encryption, SOC 2 Type II certified'
  },
  {
    icon: Eye,
    title: 'Zero Third-Party Access',
    description: 'No analytics companies, no data brokers, no advertising networks.',
    guarantee: 'Complete third-party data sharing prohibition'
  },
  {
    icon: Shield,
    title: 'Data Minimization',
    description: 'We only collect what\'s essential for education. Nothing more.',
    guarantee: 'Privacy by design, minimal data collection'
  }
];

interface ComplianceCardProps {
  standard: typeof complianceStandards[0];
  index: number;
  isVisible: boolean;
}

function ComplianceCard({ standard, index, isVisible }: ComplianceCardProps) {
  const Icon = standard.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${standard.color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-medium text-white">{standard.name}</h3>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-green-400 text-sm font-medium mb-1">{standard.status}</p>
          <p className="text-gray-400 text-xs font-medium">{standard.regions}</p>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{standard.description}</p>
      
      <div className="space-y-2 mb-4">
        {standard.guarantees.map((guarantee, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{guarantee}</span>
          </div>
        ))}
      </div>
                  
      <div className="p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
        <p className="text-gray-400 text-xs">
          <span className="font-medium text-amber-400">Regulations Met:</span> {standard.regulations}
        </p>
      </div>
    </motion.div>
  );
}

export function SafetyCompliance() {
  const [selectedTab, setSelectedTab] = useState('compliance');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-8 h-8 text-green-400" />
            <span className="text-green-400 font-medium">Data Protection</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Your students' data is
            <span className="block font-medium text-green-400">sacred</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We don't just meet privacy standards—we exceed them. Every regulation, 
            every requirement, every protection your students deserve.
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="bg-gray-800/50 p-1 rounded-2xl">
              <button
                onClick={() => setSelectedTab('compliance')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  selectedTab === 'compliance'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Compliance Standards
              </button>
              <button
                onClick={() => setSelectedTab('protections')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  selectedTab === 'protections'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Data Protections
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {selectedTab === 'compliance' ? (
          <div className="grid md:grid-cols-3 gap-6">
            {complianceStandards.map((standard, index) => (
              <ComplianceCard
                key={standard.id}
                standard={standard}
                index={index}
                isVisible={isInView}
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {dataProtections.map((protection, index) => {
              const Icon = protection.icon;
              return (
                <motion.div
                  key={protection.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (index % 2 === 0 ? -50 : 50) }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-white">{protection.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">{protection.description}</p>
                  
                  <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                    <p className="text-green-300 text-sm font-medium">{protection.guarantee}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <XCircle className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-light text-white">What we will never do</h3>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Use your data to train AI models</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Share data with third parties</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Sell or monetize student information</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Track students across other websites</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Show advertisements to students</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Access data without explicit permission</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-900/20 border border-green-800/30 rounded-xl">
              <p className="text-green-300 font-medium">
                💚 These commitments are legally binding and backed by financial guarantees
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}