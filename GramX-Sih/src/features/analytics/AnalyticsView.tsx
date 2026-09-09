import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Sparkles, 
  Languages, 
  Clock, 
  AlertTriangle, 
  CheckSquare, 
  TrendingUp,
  Activity,
  Users
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0c0a14] border-indigo-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600 text-white/20 text-slate-400 border border-zinc-500/30 uppercase tracking-wide">
                Operational Intelligence
              </span>
              <span className="text-xs text-slate-400">Organization Telemetry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-50 tracking-tight flex items-center gap-2.5">
              <BarChart3 className="w-6 h-6 text-slate-300" />
              GRAMX Communications Analytics
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Transformation throughput, localization metrics, fact preservation health, and editorial turnaround speeds.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-[#0c0a14] border-indigo-500/10 px-3 py-1.5 rounded-xl border border-white/[0.08] text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            <span>Reporting Window: Last 30 Days</span>
          </div>
        </div>

        {/* 6 Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-5">
          <div className="p-4 rounded-xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-300" /> Docs Processed
            </div>
            <div className="text-2xl font-black text-slate-50">248</div>
            <div className="text-[10px] text-emerald-700 font-semibold">+18% this month</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-700" /> Deliverables
            </div>
            <div className="text-2xl font-black text-slate-50">612</div>
            <div className="text-[10px] text-purple-300 font-semibold">2.47 per source avg</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Languages className="w-3 h-3 text-emerald-700" /> Telugu Outputs
            </div>
            <div className="text-2xl font-black text-slate-50">284</div>
            <div className="text-[10px] text-emerald-700 font-semibold">46.4% localization</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> Time Saved
            </div>
            <div className="text-2xl font-black text-cyan-400">73%</div>
            <div className="text-[10px] text-cyan-300 font-semibold">~4.8 hrs per doc</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-700" /> Fact Warnings
            </div>
            <div className="text-2xl font-black text-rose-700">21</div>
            <div className="text-[10px] text-emerald-700 font-semibold">100% intercepted</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]/80 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <CheckSquare className="w-3 h-3 text-amber-700" /> Pending Reviews
            </div>
            <div className="text-2xl font-black text-amber-700">14</div>
            <div className="text-[10px] text-amber-300 font-semibold">Under active audit</div>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Transformations Over Time */}
        <div className="bg-[#0c0a14] border-indigo-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-300" />
              Transformation Throughput (Weekly)
            </h3>
            <span className="text-[10px] text-emerald-700 font-semibold">+34% vs baseline</span>
          </div>

          {/* Clean SVG Bar Chart */}
          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { label: 'W1 Aug', val: 38 },
              { label: 'W2 Aug', val: 52 },
              { label: 'W3 Aug', val: 45 },
              { label: 'W4 Aug', val: 68 },
              { label: 'W1 Sep', val: 84 },
            ].map(item => (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] text-slate-400 font-mono font-bold">{item.val}</span>
                <div 
                  className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(item.val / 84) * 80}%` }}
                />
                <span className="text-[10px] text-slate-400 truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Output Formats Distribution */}
        <div className="bg-[#0c0a14] border-indigo-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              Generated Formats Distribution
            </h3>
            <span className="text-[10px] text-slate-400">Total 612 Outputs</span>
          </div>

          <div className="space-y-2.5 pt-2">
            {[
              { name: 'Advisories & Bulletins', count: 184, percent: 30, color: 'bg-indigo-600 text-white' },
              { name: 'Social Posts & X Threads', count: 142, percent: 23, color: 'bg-[#1b182b]/500' },
              { name: 'Executive Summaries', count: 110, percent: 18, color: 'bg-purple-500' },
              { name: 'Presentations (Slide Decks)', count: 98, percent: 16, color: 'bg-cyan-500' },
              { name: 'Video Packages & Scripts', count: 78, percent: 13, color: 'bg-emerald-500' },
            ].map(item => (
              <div key={item.name} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{item.name}</span>
                  <span className="font-mono text-slate-400">{item.count} ({item.percent}%)</span>
                </div>
                <div className="w-full bg-[#0c0a14] border-indigo-500/10 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percent * 2.5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Language & Localization Ratio */}
        <div className="bg-[#0c0a14] border-indigo-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <Languages className="w-4 h-4 text-cyan-400" />
              Language Localization Breakdown
            </h3>
            <span className="text-[10px] text-emerald-700 font-semibold">Bilingual First</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center pt-2">
            <div className="p-3 bg-[#0c0a14] border-indigo-500/10 rounded-xl border border-white/[0.08]">
              <div className="text-xs text-slate-400">English Only</div>
              <div className="text-lg font-bold text-slate-50 mt-1">328</div>
              <div className="text-[10px] text-zinc-500">53.6%</div>
            </div>
            <div className="p-3 bg-[#0c0a14] border-indigo-500/10 rounded-xl border border-white/[0.08]">
              <div className="text-xs text-slate-400">Telugu (తెలుగు)</div>
              <div className="text-lg font-bold text-emerald-700 mt-1">186</div>
              <div className="text-[10px] text-emerald-500">30.4%</div>
            </div>
            <div className="p-3 bg-[#0c0a14] border-indigo-500/10 rounded-xl border border-white/[0.08]">
              <div className="text-xs text-slate-400">Bilingual Dual</div>
              <div className="text-lg font-bold text-slate-300 mt-1">98</div>
              <div className="text-[10px] text-slate-300">16.0%</div>
            </div>
          </div>
        </div>

        {/* Chart 4: Team Activity & Review Velocity */}
        <div className="bg-[#0c0a14] border-indigo-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700" />
              Team Review Velocity
            </h3>
            <span className="text-[10px] text-slate-400">3 Active Reviewers</span>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-sm">👩‍💻</span>
                <div>
                  <span className="font-bold text-slate-200">Ruchitha</span>
                  <span className="text-[10px] text-slate-400 ml-1.5">(Admin)</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">142 Approved</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-sm">👨‍💻</span>
                <div>
                  <span className="font-bold text-slate-200">Siddharth</span>
                  <span className="text-[10px] text-slate-400 ml-1.5">(Editor)</span>
                </div>
              </div>
              <span className="text-slate-300 font-bold">94 Revisions</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-sm">👩‍💼</span>
                <div>
                  <span className="font-bold text-slate-200">Dr. Ananya</span>
                  <span className="text-[10px] text-slate-400 ml-1.5">(Reviewer)</span>
                </div>
              </div>
              <span className="text-amber-700 font-bold">118 Audited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
