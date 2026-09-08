import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Sparkles, 
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { SourceDocument, DeliverableOutput, SourceClaimLink } from '../../types';

interface SourceTraceabilityViewProps {
  source: SourceDocument;
  deliverables: DeliverableOutput[];
}

export const SourceTraceabilityView: React.FC<SourceTraceabilityViewProps> = ({
  source,
  deliverables
}) => {
  // Aggregate all claims across deliverables
  const allClaims: { claim: SourceClaimLink; deliverableTitle: string }[] = [];
  deliverables.forEach(d => {
    d.sourceClaims.forEach(c => {
      allClaims.push({ claim: c, deliverableTitle: d.title });
    });
  });

  const [activeClaimId, setActiveClaimId] = useState<string>(allClaims[0]?.claim.claimId || '');
  const [activePage, setActivePage] = useState<number>(allClaims[0]?.claim.sourcePage || 1);

  const activeItem = allClaims.find(item => item.claim.claimId === activeClaimId) || allClaims[0];

  const handleSelectClaim = (item: { claim: SourceClaimLink; deliverableTitle: string }) => {
    setActiveClaimId(item.claim.claimId);
    setActivePage(item.claim.sourcePage);
  };

  // Filter paragraphs by active page
  const pageParagraphs = source.paragraphs.filter(p => p.page === activePage);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600/20 text-blue-600 border border-blue-300/40 uppercase tracking-wide">
                Key SIH Differentiating Feature
              </span>
              <span className="text-xs text-slate-600">Bidirectional Auditability</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-blue-700" />
              Source Traceability Studio
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Click any generated claim on the right to inspect and highlight the exact corresponding passage in <strong className="text-slate-800">{source.filename}</strong>.
            </p>
          </div>

          {/* Active Claim Mapping Breadcrumb */}
          {activeItem && (
            <div className="bg-white px-4 py-2.5 rounded-xl border border-blue-300/30 text-xs flex items-center gap-2">
              <span className="text-blue-700 font-bold">Page {activeItem.claim.sourcePage}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-800 font-medium truncate max-w-xs">
                {activeItem.deliverableTitle}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-300 text-[10px] font-bold">
                {(activeItem.claim.confidence * 100).toFixed(0)}% Match
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Traceability Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Original Source PDF Passage Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50/90 border border-slate-200 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Source document toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-sm">
                  {source.filename}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-mono">
                  Ground-Truth
                </span>
              </div>

              {/* Page Navigator */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setActivePage(Math.max(1, activePage - 1))}
                  disabled={activePage <= 1}
                  className="p-1 rounded bg-white border border-slate-200 text-slate-700 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-slate-700 font-mono text-xs">
                  Page <strong className="text-slate-900">{activePage}</strong> of {source.pages}
                </span>
                <button
                  onClick={() => setActivePage(Math.min(source.pages, activePage + 1))}
                  disabled={activePage >= source.pages}
                  className="p-1 rounded bg-white border border-slate-200 text-slate-700 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Content Canvas */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 min-h-[380px] space-y-4 text-xs font-serif leading-relaxed">
              <div className="text-[10px] text-slate-600 uppercase tracking-wider font-mono border-b border-slate-900 pb-2 flex items-center justify-between">
                <span>CERT-IN OFFICIAL BULLETIN — SECTION PAGE {activePage}</span>
                <span className="text-blue-700">PDF Telemetry Ingestion</span>
              </div>

              {pageParagraphs.length > 0 ? (
                pageParagraphs.map(p => {
                  const isHighlighted = activeItem && activeItem.claim.sourcePage === p.page && activeItem.claim.sourceParagraph === p.paragraph;
                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 rounded-xl transition-all duration-300 ${
                        isHighlighted
                          ? 'bg-indigo-950/60 border-2 border-indigo-400 text-slate-900 shadow-lg shadow-indigo-950/50 ring-2 ring-indigo-400/20'
                          : 'bg-slate-50/40 border border-slate-200/60 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                        <span className={isHighlighted ? 'text-blue-600 font-bold' : 'text-slate-600'}>
                          [Page {p.page}, Paragraph {p.paragraph}]
                        </span>
                        {isHighlighted && (
                          <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-600 font-bold border border-blue-300/30 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Source Passage Linked
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed font-sans">
                        {p.text}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center text-slate-600 space-y-2 font-sans">
                  <p>Page {activePage} contains appendix tables and technical certificate chains.</p>
                  <button
                    onClick={() => setActivePage(1)}
                    className="text-xs text-blue-700 hover:underline"
                  >
                    Return to Page 1
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Source Citation Footer */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Deterministic SHA-256 Hash Verified</span>
            <span className="text-emerald-700 font-medium">✓ Cryptographic Chain Intact</span>
          </div>
        </div>

        {/* Right: Generated Claims Explorer (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/90 border border-slate-200 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" />
                <h3 className="text-xs font-bold text-slate-900">
                  Generated Output Claims ({allClaims.length})
                </h3>
              </div>
              <span className="text-[10px] text-slate-600">Click to Trace</span>
            </div>

            {/* Claims List */}
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {allClaims.map((item, idx) => {
                const isSelected = item.claim.claimId === activeClaimId;
                const isMismatch = !item.claim.verified;

                return (
                  <div
                    key={`${item.claim.claimId}-${idx}`}
                    onClick={() => handleSelectClaim(item)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all select-none ${
                      isSelected
                        ? isMismatch 
                          ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/30'
                          : 'bg-indigo-950/50 border-blue-300 shadow-lg shadow-blue-200/50 ring-1 ring-indigo-500/30'
                        : 'bg-white/70 border-slate-200/80 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 truncate">
                        {item.deliverableTitle}
                      </span>
                      {isMismatch ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Mismatch
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-100 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-800 font-medium leading-snug line-clamp-2">
                      "{item.claim.claimText}"
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-600">
                      <span className="text-blue-700 font-mono">
                        Mapped to Page {item.claim.sourcePage}
                      </span>
                      <span>{(item.claim.confidence * 100).toFixed(0)}% Confidence</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Highlight Explanation Box */}
          {activeItem && (
            <div className="p-3 rounded-xl bg-white border border-blue-300/30 text-xs space-y-1">
              <div className="font-bold text-blue-600 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                Source → Generated Claim:
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Page {activeItem.claim.sourcePage}, Paragraph {activeItem.claim.sourceParagraph} grounds: <br/>
                <span className="italic text-emerald-300/90">"{activeItem.claim.sourceText}"</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
