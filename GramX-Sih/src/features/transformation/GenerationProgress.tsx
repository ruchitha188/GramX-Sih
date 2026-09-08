import React from 'react';
import { Sparkles, CheckCircle2, Loader2, Database, ShieldAlert, Cpu } from 'lucide-react';
import { GenerationStep } from '../../services/transformationEngine';
import { DeliverableType } from '../../types';

interface GenerationProgressProps {
  steps: GenerationStep[];
  selectedTypes: DeliverableType[];
  sourceName: string;
}

const TYPE_LABELS: Record<DeliverableType, string> = {
  linkedin: 'LinkedIn Executive Post',
  twitter_post: 'Twitter / X Post',
  twitter_thread: 'X (Twitter) Thread',
  advisory: 'Official Statutory Advisory',
  executive_summary: 'Executive Summary',
  presentation: 'Visual Presentation (8 Slides)',
  video_package: 'Complete Video Package',
  infographic: 'Infographic Layout & Visuals',
  whatsapp: 'WhatsApp Announcement',
  email: 'Enterprise Email Bulletin',
  report: 'Detailed Technical Report',
  article: 'Public Explanatory Article'
};

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  steps,
  selectedTypes,
  sourceName
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 mb-1">
            <Sparkles className="w-6 h-6 text-slate-900 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            GramX Transformation Engine
          </h3>
          <p className="text-xs text-slate-600">
            Processing <span className="text-blue-600 font-medium">{sourceName}</span> into {selectedTypes.length} deliverables
          </p>
        </div>

        {/* Core AI Pipeline Steps */}
        <div className="bg-white/80 border border-slate-200/80 rounded-xl p-4 space-y-3">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
            AI Transformation Pipeline
          </div>
          {steps.map(step => (
            <div key={step.id} className="flex items-center justify-between text-xs py-1">
              <span className={`flex items-center gap-2.5 ${
                step.status === 'completed'
                  ? 'text-slate-800 font-medium'
                  : step.status === 'in_progress'
                  ? 'text-blue-700 font-semibold'
                  : 'text-slate-500'
              }`}>
                {step.id === 'step-3' ? <Database className="w-3.5 h-3.5 text-blue-700" /> : <Cpu className="w-3.5 h-3.5 text-slate-600" />}
                {step.label}
              </span>
              <div>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : step.status === 'in_progress' ? (
                  <Loader2 className="w-4 h-4 text-blue-700 animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-100 block mr-1" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Deliverables Real-time Progress */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
            <span>Synthesizing Deliverables</span>
            <span className="text-blue-700">{selectedTypes.length} Target Formats</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedTypes.map((type, idx) => {
              // Simulated status based on pipeline progress
              const isDone = steps[3]?.status === 'completed';
              return (
                <div 
                  key={type}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/50 border border-slate-200/60 text-xs"
                >
                  <span className="truncate text-slate-700 font-medium">
                    {TYPE_LABELS[type] || type}
                  </span>
                  {isDone ? (
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      Ready ✓
                    </span>
                  ) : (
                    <span className="text-[11px] text-blue-700 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Building
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status bar */}
        <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-slate-200">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse w-4/5 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};
