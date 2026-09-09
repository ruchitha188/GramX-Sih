import React from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Video, 
  PieChart, 
  MessageSquare, 
  Mail, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { DeliverableCategory, DeliverableType } from '../../types';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

interface OutputOption {
  type: DeliverableType;
  title: string;
  category: DeliverableCategory;
  icon: React.ElementType;
  description: string;
  badge?: string;
}

const OUTPUT_OPTIONS: OutputOption[] = [
  {
    type: 'executive_summary',
    title: 'Executive Summary',
    category: 'Documents',
    icon: FileSpreadsheet,
    description: 'Concise leadership brief highlighting strategic impacts, findings, and immediate recommendations.',
    badge: 'Executive Brief'
  },
  {
    type: 'video_package',
    title: 'Complete Video Package',
    category: 'Video',
    icon: Video,
    description: 'Full broadcast package: Script, Storyboard, Scene breakdown, Narration audio text, and SRT Subtitles.',
    badge: 'Script + SRT'
  },
  {
    type: 'linkedin',
    title: 'LinkedIn Post',
    category: 'Social / Communication',
    icon: LinkedinIcon,
    description: 'Executive narrative post with key takeaways, strategic hashtags, and professional engagement hooks.',
    badge: 'Professional'
  },
  {
    type: 'twitter_thread',
    title: 'X (Twitter) Thread',
    category: 'Social / Communication',
    icon: TwitterIcon,
    description: 'Numbered multi-tweet thread optimized for public dissemination, transparency, and virality.',
    badge: 'Thread'
  },
  {
    type: 'advisory',
    title: 'Official Advisory',
    category: 'Documents',
    icon: FileText,
    description: 'Structured statutory communication with Situation, Key Info, Action Items, and References.',
    badge: 'Statutory'
  },
  {
    type: 'infographic',
    title: 'Infographic Blueprint',
    category: 'Visual / Presentation',
    icon: PieChart,
    description: 'Visual statistics flow, palette recommendations, and quantitative telemetry cards ready for design staging.',
    badge: 'Visual Blueprint'
  },
  {
    type: 'presentation',
    title: 'Presentation (Slide Deck)',
    category: 'Visual / Presentation',
    icon: Presentation,
    description: '8 complete presentation slides with visual bullets, slide titles, and speaker notes.',
    badge: '8 Slides'
  },
  {
    type: 'whatsapp',
    title: 'WhatsApp Announcement',
    category: 'Social / Communication',
    icon: MessageSquare,
    description: 'Urgent mobile messaging broadcast formatted with bold accents and emergency helpline links.'
  },
  {
    type: 'email',
    title: 'Enterprise Email Bulletin',
    category: 'Social / Communication',
    icon: Mail,
    description: 'Standard departmental bulletin for cross-agency personnel and system administrators.'
  }
];

interface OutputSelectorProps {
  selectedTypes: DeliverableType[];
  onToggleType: (type: DeliverableType) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onSelectSihCore?: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const OutputSelector: React.FC<OutputSelectorProps> = ({
  selectedTypes,
  onToggleType,
  onSelectAll,
  onDeselectAll,
  onSelectSihCore,
  onGenerate,
  isGenerating
}) => {
  const selectedCount = selectedTypes.length;

  return (
    <div className="bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 lg:p-6 shadow-2xl shadow-black/80 space-y-5">
      {/* Header with Select All / Deselect All */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-50 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-200 text-black/20 text-slate-300 text-xs font-bold border border-zinc-700">
              3
            </span>
            Select Deliverables for Multi-Output Transformation
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select one or multiple communication artefacts to generate simultaneously from the same source.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs flex-wrap">
          {onSelectSihCore && (
            <button
              onClick={onSelectSihCore}
              className="px-2.5 py-1 text-slate-400 hover:text-slate-50 bg-zinc-200/60 hover:bg-zinc-200/80 border border-zinc-500/30 rounded-lg transition-colors font-medium flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-slate-300" />
              <span>SIH Core (7)</span>
            </button>
          )}
          <button
            onClick={onSelectAll}
            className="px-2.5 py-1 text-slate-300 hover:text-slate-50 bg-black border-white/10 hover:bg-zinc-950 border border-white/[0.08] rounded-lg transition-colors"
          >
            Select All (9)
          </button>
          <button
            onClick={onDeselectAll}
            className="px-2.5 py-1 text-slate-400 hover:text-slate-200 bg-black border-white/10 hover:bg-zinc-950 border border-white/[0.08] rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Grid of Output Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {OUTPUT_OPTIONS.map(option => {
          const isSelected = selectedTypes.includes(option.type);
          const Icon = option.icon;

          return (
            <div
              key={option.type}
              onClick={() => onToggleType(option.type)}
              className={`relative cursor-pointer p-4 rounded-xl border text-left transition-all group select-none ${
                isSelected
                  ? 'bg-gradient-to-b from-blue-50 to-white border-blue-400 ring-1 ring-blue-200 shadow-lg shadow-blue-100'
                  : 'bg-black border-white/10/60 border-white/[0.08]/80 hover:border-white/[0.12] hover:bg-black/60'
              }`}
            >
              {/* Checkbox indicator & Icon */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] text-slate-50' : 'bg-black text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-50 flex items-center gap-1.5">
                      {option.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block">
                      {option.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {option.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-200 text-black/20 text-slate-400 font-semibold border border-zinc-700">
                      {option.badge}
                    </span>
                  )}
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] text-slate-50 shadow-sm ring-2 ring-white/10' 
                      : 'border border-white/[0.12] bg-black group-hover:border-slate-400'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-400 leading-relaxed pl-0.5">
                {option.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Primary Generation CTA Footer */}
      <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/40 backdrop-blur-xl p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]/20 border border-zinc-700 text-slate-300 font-bold text-base">
            {selectedCount}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-50">
              {selectedCount} {selectedCount === 1 ? 'deliverable' : 'deliverables'} selected
            </h4>
            <p className="text-xs text-slate-400">
              One source → {selectedCount} deliverables generated in parallel with fact verification.
            </p>
          </div>
        </div>

        {/* Generate All Deliverables Primary Button */}
        <button
          onClick={onGenerate}
          disabled={selectedCount === 0 || isGenerating}
          className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-50 shadow-2xl shadow-black/80 transition-all ${
            selectedCount === 0 || isGenerating
              ? 'bg-zinc-950 text-zinc-500 cursor-not-allowed'
              : 'bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-blue-800 shadow-blue-900/20 active:scale-98 ring-1 ring-black/10'
          }`}
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>✨ Generate All Deliverables</span>
        </button>
      </div>
    </div>
  );
};
