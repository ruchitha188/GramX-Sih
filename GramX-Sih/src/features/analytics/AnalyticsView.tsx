import React from 'react';
import {
  BarChart3,
  FileText,
  Sparkles,
  Languages,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-neutral-950 border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
                Live Data Monitoring
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-50 tracking-tight flex items-center gap-2.5">
              <BarChart3 className="w-6 h-6 text-neutral-300" />
              Operational Analytics
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Awaiting transformation throughput and telemetry from your first AI generation...
            </p>
          </div>
        </div>

        {/* 6 Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/[0.08] space-y-1 opacity-60">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3 h-3 text-neutral-300" /> Docs Processed
            </div>
            <div className="text-2xl font-black text-neutral-50">0</div>
            <div className="text-[10px] text-neutral-500 font-semibold">No data yet</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/[0.08] space-y-1 opacity-60">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-300" /> Deliverables
            </div>
            <div className="text-2xl font-black text-neutral-50">0</div>
            <div className="text-[10px] text-neutral-500 font-semibold">No data yet</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/[0.08] space-y-1 opacity-60">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <Languages className="w-3 h-3 text-neutral-300" /> Telugu Outputs
            </div>
            <div className="text-2xl font-black text-neutral-50">0</div>
            <div className="text-[10px] text-neutral-500 font-semibold">No data yet</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-950 border border-white/[0.08] rounded-2xl p-5 shadow-2xl opacity-60 flex flex-col items-center justify-center min-h-[250px]">
          <TrendingUp className="w-8 h-8 text-neutral-600 mb-3" />
          <p className="text-sm font-semibold text-neutral-400">Transformation Throughput</p>
          <p className="text-xs text-neutral-500 mt-1">Generate content to populate this chart.</p>
        </div>

        <div className="bg-neutral-950 border border-white/[0.08] rounded-2xl p-5 shadow-2xl opacity-60 flex flex-col items-center justify-center min-h-[250px]">
          <Activity className="w-8 h-8 text-neutral-600 mb-3" />
          <p className="text-sm font-semibold text-neutral-400">Format Distribution</p>
          <p className="text-xs text-neutral-500 mt-1">Generate content to populate this chart.</p>
        </div>
      </div>
    </div>
  );
};
