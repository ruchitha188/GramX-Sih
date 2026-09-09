import React, { useState } from 'react';
import { 
  History, 
  GitCompare, 
  CheckCircle2, 
  User, 
  ArrowRight, 
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { VersionHistoryItem } from '../../types';
import { INITIAL_VERSION_HISTORY } from '../../data/workspaceData';

export const VersionHistoryView: React.FC = () => {
  const [selectedV1, setSelectedV1] = useState<number>(1);
  const [selectedV2, setSelectedV2] = useState<number>(4);
  const [showDiff, setShowDiff] = useState<boolean>(true);

  const history = INITIAL_VERSION_HISTORY;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-400 border-none text-white/20 text-slate-400 border border-slate-700/50/30 uppercase tracking-wide">
                Audit Trail
              </span>
              <span className="text-xs text-slate-400">Immutable Change Log</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-50 tracking-tight flex items-center gap-2.5">
              <History className="w-6 h-6 text-slate-300" />
              Version History & Change Diff
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Trace iterative revisions from initial AI generation through editor polish and reviewer signoff.
            </p>
          </div>

          <button
            onClick={() => setShowDiff(!showDiff)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-400 border-none hover:bg-sky-400 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-slate-700/50 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <GitCompare className="w-4 h-4" />
            <span>{showDiff ? 'Hide Comparison' : 'Compare Versions'}</span>
          </button>
        </div>

        {/* Timeline Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {history.map(item => (
            <div
              key={item.versionNumber}
              className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                item.versionNumber === 4
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-slate-950 border-sky-500/10 border-white/[0.08]/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-50 text-xs">v{item.versionNumber}.0</span>
                <span className="text-[10px] text-slate-400">{item.timestamp}</span>
              </div>
              <p className="font-semibold text-slate-400">{item.label}</p>
              <p className="text-[11px] text-slate-400 leading-snug">{item.snippet}</p>
              <div className="text-[10px] text-zinc-500 flex items-center gap-1 pt-1 border-t border-slate-900">
                <User className="w-3 h-3 text-slate-400" />
                <span>{item.modifiedBy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Diff Comparison View */}
      {showDiff && (
        <div className="bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-slate-300" />
              <span>Comparing Version {selectedV1} vs Version {selectedV2}</span>
            </h3>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Base:</span>
              <select
                value={selectedV1}
                onChange={(e) => setSelectedV1(Number(e.target.value))}
                className="px-2 py-1 bg-slate-950 border-sky-500/10 border border-white/[0.08] rounded-lg text-slate-200"
              >
                {history.map(h => <option key={h.versionNumber} value={h.versionNumber}>v{h.versionNumber} ({h.modifiedBy.split(' ')[0]})</option>)}
              </select>

              <span className="text-slate-400">Target:</span>
              <select
                value={selectedV2}
                onChange={(e) => setSelectedV2(Number(e.target.value))}
                className="px-2 py-1 bg-slate-950 border-sky-500/10 border border-white/[0.08] rounded-lg text-slate-200"
              >
                {history.map(h => <option key={h.versionNumber} value={h.versionNumber}>v{h.versionNumber} ({h.modifiedBy.split(' ')[0]})</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Base Version */}
            <div className="p-4 rounded-xl bg-slate-950 border-sky-500/10 border border-white/[0.08] space-y-2">
              <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider border-b border-white/[0.08] pb-1">
                Version {selectedV1} — Baseline Text
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg text-slate-300 leading-relaxed space-y-2 font-sans text-xs">
                <p>
                  "Organizations must report incidents within <span className="bg-rose-950/60 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30 font-bold">24 hours</span> to the national nodal cell."
                </p>
                <p className="text-slate-400 text-[11px]">
                  • Automated generation raw output from initial prompt ingestion.
                </p>
              </div>
            </div>

            {/* Target Version */}
            <div className="p-4 rounded-xl bg-slate-950 border-sky-500/10 border border-emerald-500/30 space-y-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-b border-white/[0.08] pb-1">
                Version {selectedV2} — Refined & Grounded Text
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg text-slate-300 leading-relaxed space-y-2 font-sans text-xs">
                <p>
                  "Organizations are advised to report incidents within <span className="bg-emerald-950/60 text-slate-300 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">48 hours</span> to the national nodal cell."
                </p>
                <p className="text-slate-300/90 text-[11px]">
                  ✓ Fact discrepancy resolved via ground truth Page 4 directive.
                  <br />
                  ✓ Official Telugu terminology validated against Knowledge Vault.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
