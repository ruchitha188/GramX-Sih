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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12101c]/40 backdrop-blur-xl backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#09090b] border border-white/[0.08] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-zinc-9000 to-purple-600 shadow-lg shadow-indigo-500/30 mb-1">
            <Sparkles className="w-6 h-6 text-slate-50 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-slate-50 tracking-tight">
            GramX Transformation Engine
          </h3>
          <p className="text-xs text-slate-400">
            Processing <span className="text-slate-400 font-medium">{sourceName}</span> into {selectedTypes.length} deliverables
          </p>
        </div>

        {/* Core AI Pipeline Steps */}
        <div className="bg-[#12101c]/40 backdrop-blur-xl border border-white/[0.08]/80 rounded-xl p-4 space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            AI Transformation Pipeline
          </div>
          {steps.map(step => (
            <div key={step.id} className="flex items-center justify-between text-xs py-1">
              <span className={`flex items-center gap-2.5 ${
                step.status === 'completed'
                  ? 'text-slate-200 font-medium'
                  : step.status === 'in_progress'
                  ? 'text-slate-300 font-semibold'
                  : 'text-zinc-500'
              }`}>
                {step.id === 'step-3' ? <Database className="w-3.5 h-3.5 text-slate-300" /> : <Cpu className="w-3.5 h-3.5 text-slate-400" />}
                {step.label}
              </span>
              <div>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : step.status === 'in_progress' ? (
                  <Loader2 className="w-4 h-4 text-slate-300 animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#12101c] block mr-1" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Deliverables Real-time Progress */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Synthesizing Deliverables</span>
            <span className="text-slate-300">{selectedTypes.length} Target Formats</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedTypes.map((type, idx) => {
              // Simulated status based on pipeline progress
              const isDone = steps[3]?.status === 'completed';
              return (
                <div 
                  key={type}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#09090b] border border-white/[0.08]/60 text-xs"
                >
                  <span className="truncate text-slate-300 font-medium">
                    {TYPE_LABELS[type] || type}
                  </span>
                  {isDone ? (
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      Ready ✓
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-300 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Building
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status bar */}
        <div className="w-full bg-[#0c0a14] border-indigo-500/10 h-2 rounded-full overflow-hidden border border-white/[0.08]">
          <div className="h-full bg-gradient-to-r from-zinc-9000 via-purple-500 to-pink-500 animate-pulse w-4/5 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};
