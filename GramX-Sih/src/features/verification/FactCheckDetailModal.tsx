import React from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Wrench, 
  Send,
  ShieldAlert
} from 'lucide-react';
import { FactMismatch } from '../../types';

interface FactCheckDetailModalProps {
  mismatch: FactMismatch | null;
  isOpen: boolean;
  onClose: () => void;
  onFixUsingSource: (mismatchId: string, fixText: string) => void;
  onSendToReview: (mismatchId: string) => void;
}

export const FactCheckDetailModal: React.FC<FactCheckDetailModalProps> = ({
  mismatch,
  isOpen,
  onClose,
  onFixUsingSource,
  onSendToReview
}) => {
  if (!isOpen || !mismatch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Fact Verification Discrepancy
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-300 border border-rose-500/30">
                  🔴 Potential Mismatch
                </span>
              </h3>
              <p className="text-[11px] text-slate-600">
                Audited against ground-truth source document
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Grid: Generated vs Source */}
        <div className="space-y-4">
          {/* Generated Statement */}
          <div className="p-3.5 rounded-xl bg-white border border-rose-500/30 space-y-1.5">
            <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wide flex items-center justify-between">
              <span>Generated Deliverable Statement</span>
              <span className="text-[10px] text-rose-700 font-mono">Flagged Claim</span>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              "{mismatch.generatedStatement}"
            </p>
          </div>

          {/* Source Document Reference */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wide flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Original Source Ground-Truth
              </span>
              <span className="text-[10px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-mono">
                {mismatch.sourceFile} • Page {mismatch.sourcePage}
              </span>
            </div>
            <p className="text-xs text-emerald-300/90 font-medium leading-relaxed bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
              "{mismatch.sourceStatement}"
            </p>
          </div>

          {/* Discrepancy Insight */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-500/20 text-xs text-amber-200 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-amber-300">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              Root Cause Analysis:
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              Output generalized statutory deadline as 24 hours, whereas official CERT-In directive on Page 4 prescribes an advisory window of <strong>48 hours</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons: Fix using source vs Send for human review */}
        <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-end gap-2.5">
          <button
            onClick={() => onSendToReview(mismatch.id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-700 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-blue-700" />
            <span>Send for Human Review</span>
          </button>

          <button
            onClick={() => onFixUsingSource(mismatch.id, mismatch.suggestedFix)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-900 text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all active:scale-98"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Fix using Source (48 Hours)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
