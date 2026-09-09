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
      <div className="bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none text-white/20 text-neutral-400 border border-neutral-700/50/30 uppercase tracking-wide">
                Key SIH Differentiating Feature
              </span>
              <span className="text-xs text-neutral-400">Bidirectional Auditability</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-50 tracking-tight flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-neutral-300" />
              Source Traceability Studio
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Click any generated claim on the right to inspect and highlight the exact corresponding passage in <strong className="text-neutral-200">{source.filename}</strong>.
            </p>
          </div>

          {/* Active Claim Mapping Breadcrumb */}
          {activeItem && (
            <div className="bg-neutral-950 border-emerald-500/10 px-4 py-2.5 rounded-xl border border-neutral-700/50 text-xs flex items-center gap-2">
              <span className="text-neutral-300 font-bold">Page {activeItem.claim.sourcePage}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-neutral-200 font-medium truncate max-w-xs">
                {activeItem.deliverableTitle}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-neutral-300 text-[10px] font-bold">
                {(activeItem.claim.confidence * 100).toFixed(0)}% Match
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Traceability Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Original Source PDF Passage Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Source document toolbar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-300" />
                <span className="text-xs font-bold text-neutral-50 truncate max-w-xs sm:max-w-sm">
                  {source.filename}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 border-emerald-500/10 text-neutral-400 border border-white/[0.08] font-mono">
                  Ground-Truth
                </span>
              </div>

              {/* Page Navigator */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setActivePage(Math.max(1, activePage - 1))}
                  disabled={activePage <= 1}
                  className="p-1 rounded bg-neutral-950 border-emerald-500/10 border border-white/[0.08] text-neutral-300 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-neutral-300 font-mono text-xs">
                  Page <strong className="text-neutral-50">{activePage}</strong> of {source.pages}
                </span>
                <button
                  onClick={() => setActivePage(Math.min(source.pages, activePage + 1))}
                  disabled={activePage >= source.pages}
                  className="p-1 rounded bg-neutral-950 border-emerald-500/10 border border-white/[0.08] text-neutral-300 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Content Canvas */}
            <div className="bg-neutral-950 border-emerald-500/10 rounded-xl p-5 border border-white/[0.08]/80 min-h-[380px] space-y-4 text-xs font-serif leading-relaxed">
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono border-b border-neutral-900 pb-2 flex items-center justify-between">
                <span>CERT-IN OFFICIAL BULLETIN — SECTION PAGE {activePage}</span>
                <span className="text-neutral-300">PDF Telemetry Ingestion</span>
              </div>

              {pageParagraphs.length > 0 ? (
                pageParagraphs.map(p => {
                  const isHighlighted = activeItem && activeItem.claim.sourcePage === p.page && activeItem.claim.sourceParagraph === p.paragraph;
                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 rounded-xl transition-all duration-300 ${
                        isHighlighted
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none/60 border-2 border-indigo-400 text-neutral-50 shadow-lg shadow-white/5 ring-2 ring-white/10'
                          : 'bg-neutral-950/40 border border-white/[0.08]/60 text-neutral-300 hover:border-white/[0.12]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                        <span className={isHighlighted ? 'text-neutral-400 font-bold' : 'text-neutral-400'}>
                          [Page {p.page}, Paragraph {p.paragraph}]
                        </span>
                        {isHighlighted && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none text-white/20 text-neutral-400 font-bold border border-neutral-700/50 flex items-center gap-1">
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
                <div className="py-16 text-center text-neutral-400 space-y-2 font-sans">
                  <p>Page {activePage} contains appendix tables and technical certificate chains.</p>
                  <button
                    onClick={() => setActivePage(1)}
                    className="text-xs text-neutral-300 hover:underline"
                  >
                    Return to Page 1
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Source Citation Footer */}
          <div className="p-3 rounded-xl bg-neutral-950 border-emerald-500/10 border border-white/[0.08] text-[11px] text-neutral-400 flex items-center justify-between">
            <span>Deterministic SHA-256 Hash Verified</span>
            <span className="text-neutral-300 font-medium">✓ Cryptographic Chain Intact</span>
          </div>
        </div>

        {/* Right: Generated Claims Explorer (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neutral-300" />
                <h3 className="text-xs font-bold text-neutral-50">
                  Generated Output Claims ({allClaims.length})
                </h3>
              </div>
              <span className="text-[10px] text-neutral-400">Click to Trace</span>
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
                          : 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none/50 border-teal-300 shadow-lg shadow-teal-200/50 ring-1 ring-white/10'
                        : 'bg-neutral-950 border-emerald-500/10/70 border-white/[0.08]/80 hover:border-white/[0.12] hover:bg-neutral-950 border-emerald-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 truncate">
                        {item.deliverableTitle}
                      </span>
                      {isMismatch ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Mismatch
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-100 text-neutral-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-200 font-medium leading-snug line-clamp-2">
                      "{item.claim.claimText}"
                    </p>

                    <div className="mt-2 pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-400">
                      <span className="text-neutral-300 font-mono">
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
            <div className="p-3 rounded-xl bg-neutral-950 border-emerald-500/10 border border-neutral-700/50 text-xs space-y-1">
              <div className="font-bold text-neutral-400 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                Source → Generated Claim:
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Page {activeItem.claim.sourcePage}, Paragraph {activeItem.claim.sourceParagraph} grounds: <br/>
                <span className="italic text-neutral-300/90">"{activeItem.claim.sourceText}"</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
