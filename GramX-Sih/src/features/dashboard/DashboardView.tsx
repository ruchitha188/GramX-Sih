import React from 'react';
import {
  Sparkles,
  FileText,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  FolderKanban,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Languages,
  Flame,
  ExternalLink
} from 'lucide-react';
import { NavTab } from '../../components/layout/Sidebar';
import { UserRole } from '../../types';
import { INITIAL_PROJECTS } from '../../data/workspaceData';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  currentRole: UserRole;
  onLaunchTransformation: () => void;
  user?: any;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  currentRole,
  onLaunchTransformation,
  user
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-blue-100/50 to-zinc-950 border border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 text-black/10 border border-zinc-700 text-slate-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-slate-300" />
              <span>2026 AI Content Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight">
              {user ? `Welcome back, ${user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]} 👋` : 'Welcome to GramX 👋'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Transform single source materials (reports, advisories, research papers, news, prompts) into synchronized multi-channel deliverables with source traceability and human review.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onLaunchTransformation}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-2xl shadow-black/80 shadow-blue-200/50 transition-all active:scale-98 ring-1 ring-black/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>Transformation Studio</span>
            </button>
          </div>
        </div>

        {/* Decorative subtle background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Documents Processed</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-200 text-black/10 text-slate-300 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-50">248</div>
          <p className="text-[11px] text-zinc-300 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18% from last month
          </p>
        </div>

        <div className="bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Deliverables Generated</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-zinc-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-50">612</div>
          <p className="text-[11px] text-zinc-300 font-medium">
            2.47 deliverables per document
          </p>
        </div>

        <div className="bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Pending Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700">14</div>
          <p className="text-[11px] text-slate-400">
            Awaiting editorial signoff
          </p>
        </div>

        <div className="bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Time Saved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-zinc-300 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-300">73%</div>
          <p className="text-[11px] text-slate-400">
            Average reduction in prep time
          </p>
        </div>
      </div>

      {/* Problem Statement & End-to-End Workflow Diagram */}
      <div className="bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-200 text-black/20 text-slate-400 border border-zinc-500/30 uppercase">
                AI Content Engine
              </span>
              <span className="text-xs text-slate-400">GramX</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-50 mt-1">
              GramX: AI Content Engine
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-4xl leading-relaxed">
              GramX allows you to ingest any source material (YouTube links, PDFs, Audio, or Text) and instantly transform it into multi-format deliverables aligned to your organizational knowledge.
            </p>
          </div>
          <button
            onClick={onLaunchTransformation}
            className="px-4 py-2 bg-zinc-200 hover:bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-zinc-300 text-white rounded-xl text-xs font-semibold shrink-0 shadow-md transition-all flex items-center gap-2"
          >
            Start Transformation <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Short visual summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
          <div className="p-4 bg-black border-white/10 border border-white/[0.08] rounded-xl space-y-2">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-zinc-900 text-slate-300 flex items-center justify-center text-xs">1</span>
              Provide Input Source
            </h4>
            <p className="text-xs text-slate-400">Upload a PDF document, paste a YouTube video link, drag in a direct Audio file, or simply type a Text prompt.</p>
          </div>

          <div className="p-4 bg-black border-white/10 border border-white/[0.08] rounded-xl space-y-2">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-100 text-zinc-300 flex items-center justify-center text-xs">2</span>
              Select Formats
            </h4>
            <p className="text-xs text-slate-400">Choose multiple output deliverables at once: Video Scripts, Social Media Threads, Executive Summaries, or PR Drafts.</p>
          </div>

          <div className="p-4 bg-black border-white/10 border border-white/[0.08] rounded-xl space-y-2">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-100 text-zinc-300 flex items-center justify-center text-xs">3</span>
              Let AI Transform
            </h4>
            <p className="text-xs text-slate-400">GramX analyzes your input and instantly generates all your requested formats perfectly tailored in parallel.</p>
          </div>
        </div>

        {/* 8 Deliverable Capabilities Breakdown */}
        <div className="pt-2 border-t border-white/[0.08]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Supported Core Deliverables (Generate One or Many Simultaneously)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-slate-400 block">🎬 Video Package</strong>
              <span className="text-[10px] text-slate-400">Script, Storyboard, Scenes, Narration, Subtitles & Visuals</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-zinc-300 block">💼 LinkedIn Post</strong>
              <span className="text-[10px] text-slate-400">Publication-ready post with hashtags & engagement hook</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-cyan-300 block">🐦 Twitter/X Post & Thread</strong>
              <span className="text-[10px] text-slate-400">Platform-optimized tweets & numbered 1/5 threads</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-zinc-300 block">📜 Statutory Advisory</strong>
              <span className="text-[10px] text-slate-400">Structured document with situation & action checklist</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-amber-300 block">📊 Infographic Package</strong>
              <span className="text-[10px] text-slate-400">Key messaging, layout recommendations & metric cards</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-zinc-300 block">📋 Executive Summary</strong>
              <span className="text-[10px] text-slate-400">Concise leadership brief with strategic risk impact</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-pink-300 block">📽️ Presentation Deck</strong>
              <span className="text-[10px] text-slate-400">8 slides with titles, bullet points & speaker notes</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08]">
              <strong className="text-rose-300 block">⚡ Multi-Output Engine</strong>
              <span className="text-[10px] text-slate-400">One source ➔ All selected outputs generated in parallel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Projects & Quick Transformations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Organization Projects (7 cols) */}
        <div className="lg:col-span-7 bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-zinc-300" />
              <h3 className="text-sm font-bold text-slate-50">Current Hot Topics in India</h3>
            </div>
            <button
              onClick={() => onNavigate('trending')}
              className="text-xs text-slate-300 hover:text-slate-400 font-semibold flex items-center gap-1"
            >
              View Full Feed <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <TrendingPreview onLaunch={onLaunchTransformation} />
        </div>

        {/* Right: Platform Capabilities & SIH Highlights (5 cols) */}
        <div className="lg:col-span-5 bg-black border-white/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/80 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-slate-50 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-300" />
                The GramX Advantage
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Core architectural capabilities built for SIH26154
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-black border-white/10 border border-white/[0.08]/80 space-y-1">
                <div className="font-bold text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-slate-300" />
                  1-to-Many Transformation
                </div>
                <p className="text-[11px] text-slate-400">
                  Single ingestion feeds LinkedIn posts, Twitter threads, advisories, presentations, and video packages simultaneously.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black border-white/10 border border-white/[0.08]/80 space-y-1">
                <div className="font-bold text-zinc-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                  AI Fact Verification & Grounding
                </div>
                <p className="text-[11px] text-slate-400">
                  96% preservation score tracking, flagged discrepancy resolution, and source sentence-level traceability.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black border-white/10 border border-white/[0.08]/80 space-y-1">
                <div className="font-bold text-zinc-300 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-zinc-300" />
                  Telugu Terminology Enforcement
                </div>
                <p className="text-[11px] text-slate-400">
                  Integrated Knowledge Vault glossaries ensuring standardized regional governance language (e.g. సైబర్ భద్రత).
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onLaunchTransformation}
              className="w-full py-2.5 bg-zinc-950 hover:bg-slate-700 text-slate-200 hover:text-slate-50 rounded-xl text-xs font-semibold border border-white/[0.12] transition-colors flex items-center justify-center gap-2"
            >
              <span>Launch Transformation Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingPreview: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
  const [topics, setTopics] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en')
      .then(r => r.json())
      .then(d => {
        if (d && d.items) setTopics(d.items.slice(0, 4));
      })
      .catch(() => { });
  }, []);

  if (topics.length === 0) return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-black border-white/10 border border-white/[0.08] rounded-xl animate-pulse" />)}
    </div>
  );

  return (
    <div className="space-y-3">
      {topics.map((topic, i) => (
        <div key={i} className="p-3.5 rounded-xl bg-black border-white/10 border border-white/[0.08]/80 hover:border-red-300/40 transition-all space-y-1.5 group">
          <div className="flex items-center justify-between gap-4">
            <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-zinc-300 transition-colors">
              {topic.title}
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-red-50 text-zinc-300 border border-red-100 whitespace-nowrap shadow-sm">
              Trending #{i + 1}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
            Click "Transform" to instantly generate a <strong>News Video Script, Fact-Checked Social Thread, and PR Summary</strong> perfectly synced based on this breaking story happening right now.
          </p>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-2.5 mt-1 border-t border-zinc-900">
            <span className="font-semibold text-slate-400">{new Date(topic.pubDate).toLocaleTimeString()}</span>
            <div className="flex items-center gap-4">
              <a href={topic.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-zinc-300 hover:underline shadow-blue-500/30">
                Source Article <ExternalLink className="w-3 h-3" />
              </a>
              <button onClick={onLaunch} className="flex items-center gap-1 font-bold text-zinc-300 hover:text-zinc-300 active:scale-95 transition-transform">
                Transform Content ➔
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
