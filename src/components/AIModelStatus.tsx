'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, Info } from 'lucide-react';
import { AIModel } from '@/types/ai';

interface AIModelStatusProps {
  className?: string;
  showDetails?: boolean;
}

export function AIModelStatus({ className = '', showDetails = false }: AIModelStatusProps) {
  const [modelInfo, setModelInfo] = useState<{
    status: string;
    healthy: boolean;
    availableModels: AIModel[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModelStatus();
  }, []);

  const fetchModelStatus = async () => {
    try {
      const response = await fetch('/api/ai-generate');
      if (!response.ok) {
        throw new Error('Failed to fetch AI status');
      }
      const data = await response.json();
      setModelInfo(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const activeModel = modelInfo?.availableModels?.find(model => model.isActive);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full"
        />
        <span className="text-sm text-gray-400">Checking AI status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center gap-2 text-red-400 ${className}`}>
        <Shield className="w-4 h-4" />
        <span className="text-sm">AI Offline</span>
        {showDetails && (
          <div className="text-xs text-red-300">({error})</div>
        )}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Compact Status */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {modelInfo?.healthy ? (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <Brain className="w-4 h-4 text-green-400" />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              <Brain className="w-4 h-4 text-red-400" />
            </div>
          )}
          
          <span className="text-sm font-medium text-white">
            {activeModel ? activeModel.name : 'No AI Model Active'}
          </span>
          
          {modelInfo?.healthy && (
            <div className="flex items-center gap-1 text-green-400">
              <Zap className="w-3 h-3" />
              <span className="text-xs">Ready</span>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Information */}
      {showDetails && activeModel && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Provider</span>
              <span className="text-sm font-medium text-white capitalize">{activeModel.provider}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Max Tokens</span>
              <span className="text-sm font-medium text-white">{activeModel.maxTokens?.toLocaleString()}</span>
            </div>
            
            <div className="pt-2 border-t border-gray-700/50">
              <div className="text-xs text-gray-400 mb-2">Capabilities</div>
              <div className="flex flex-wrap gap-1">
                {activeModel.capabilities?.map((cap, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      cap.proficiency === 'expert' ? 'bg-green-500/20 text-green-400' :
                      cap.proficiency === 'advanced' ? 'bg-blue-500/20 text-blue-400' :
                      cap.proficiency === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {cap.type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-2 text-xs text-gray-400">
              {activeModel.description}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Compact version for headers/status bars
export function AIModelStatusCompact({ className = '' }: { className?: string }) {
  return <AIModelStatus className={className} showDetails={false} />;
}

// Full version with details
export function AIModelStatusDetailed({ className = '' }: { className?: string }) {
  return <AIModelStatus className={className} showDetails={true} />;
}