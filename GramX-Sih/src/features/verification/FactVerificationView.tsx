import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Languages, 
  FileCheck, 
  ExternalLink,
  Wrench,
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react';
import { VerificationReport } from '../../types';
import { VERIFIED_FACTS_LIST } from '../../data/verificationData';
import { FactCheckDetailModal } from './FactCheckDetailModal';

interface FactVerificationViewProps {
  report: VerificationReport;
  sourceName: string;
  onFixMismatch: (mismatchId: string, fixText: string) => void;
  onSendToReview: (mismatchId: string) => void;
  onNavigateToTraceability: () => void;
}

export const FactVerificationView: React.FC<FactVerificationViewProps> = ({
  report,
  sourceName,
  onFixMismatch,
  onSendToReview,
  onNavigateToTraceability
}) => {
  const [selectedMismatchId, setSelectedMismatchId] = useState<string | null>(null);

  const selectedMismatch = report.mismatches.find(m => m.id === selectedMismatchId) || null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-slate-300 border border-emerald-500/40 uppercase tracking-wide">
                Responsible AI Quality Engine
              </span>
              <span className="text-xs text-slate-400">Ground-Truth Auditing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-50 tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-slate-300" />
              AI Fact Verification
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic cross-referencing of all synthesized deliverable claims against <strong className="text-slate-200">{sourceName}</strong>.
            </p>
          </div>

          {/* Fact Preservation Score Badge */}
          <div className="flex items-center gap-4 bg-slate-950 border-sky-500/10 p-4 rounded-2xl border border-white/[0.08] shrink-0">
            <div className="text-right">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Fact Preservation</div>
              <div className={`text-3xl font-black ${report.factPreservationScore >= 98 ? 'text-slate-300' : 'text-slate-300'}`}>
                {report.factPreservationScore}%
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-slate-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Verification Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3 rounded-xl bg-slate-950 border-sky-500/10 border border-white/[0.08]/80">
            <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
              <span>Fact Preservation</span>
              <span className="text-slate-300 font-bold">{report.metrics.factPreservation}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${report.metrics.factPreservation}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border-sky-500/10 border border-white/[0.08]/80">
            <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
              <span>Format Compliance</span>
              <span className="text-slate-300 font-bold">{report.metrics.formatCompliance}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-400 border-none text-white h-full rounded-full transition-all duration-500" style={{ width: `${report.metrics.formatCompliance}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border-sky-500/10 border border-white/[0.08]/80">
            <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
              <span>Translation Quality</span>
              <span className="text-cyan-400 font-bold">{report.metrics.translationQuality}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${report.metrics.translationQuality}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border-sky-500/10 border border-white/[0.08]/80">
            <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
              <span>Source Coverage</span>
              <span className="text-slate-300 font-bold">{report.metrics.sourceCoverage}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${report.metrics.sourceCoverage}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Flagged Mismatches Section */}
      <div className="bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-50">
              Flagged Discrepancies ({report.mismatchCount})
            </h3>
          </div>
          {report.mismatchCount === 0 && (
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-slate-300 border border-emerald-500/30">
              All Mismatches Resolved ✓
            </span>
          )}
        </div>

        {report.mismatches.length > 0 ? (
          <div className="space-y-3">
            {report.mismatches.map(m => (
              <div
                key={m.id}
                onClick={() => setSelectedMismatchId(m.id)}
                className="p-4 rounded-xl bg-slate-950 border-sky-500/10 border border-rose-500/40 hover:border-rose-400 hover:bg-slate-950/40 backdrop-blur-xl cursor-pointer transition-all shadow-md group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    Potential Mismatch Flagged • Statutory Timeline
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-white/[0.08]">
                    Source: Page {m.sourcePage}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-rose-500/20">
                    <div className="text-[10px] text-slate-400 font-semibold mb-1">Generated Output Claim:</div>
                    <p className="text-rose-200 font-medium">"{m.generatedStatement}"</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-emerald-500/20">
                    <div className="text-[10px] text-slate-400 font-semibold mb-1">Original Source Passage (Page 4):</div>
                    <p className="text-slate-300 font-medium">"{m.sourceStatement}"</p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-300 font-semibold group-hover:text-slate-400">
                  <span>Click to review discrepancy & apply 1-click source fix</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Zero open mismatches. 100% of claims are mathematically grounded in the source PDF.</span>
          </div>
        )}
      </div>

      {/* Verified Facts List */}
      <div className="bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-slate-300">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-50">
                Verified Ground-Truth Claims ({report.verifiedCount} facts)
              </h3>
              <p className="text-xs text-slate-400">
                Audited against exact page and paragraph positions in source
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToTraceability}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-slate-400 font-semibold bg-slate-950 border-sky-500/10 px-3 py-1.5 rounded-lg border border-white/[0.08] transition-colors"
          >
            <span>Interactive Traceability View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {VERIFIED_FACTS_LIST.map(fact => (
            <div
              key={fact.id}
              className="p-3 rounded-xl bg-slate-950/40 backdrop-blur-xl border border-white/[0.08]/80 hover:border-white/[0.12] transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified ({fact.confidence})
                </span>
                <span className="text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded text-[10px]">
                  Page {fact.sourcePage}, Para {fact.sourceParagraph}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {fact.fact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <FactCheckDetailModal
        mismatch={selectedMismatch}
        isOpen={Boolean(selectedMismatchId)}
        onClose={() => setSelectedMismatchId(null)}
        onFixUsingSource={(id, fix) => {
          onFixMismatch(id, fix);
          setSelectedMismatchId(null);
        }}
        onSendToReview={(id) => {
          onSendToReview(id);
          setSelectedMismatchId(null);
        }}
      />
    </div>
  );
};
