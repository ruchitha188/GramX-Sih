import React from 'react';
import {
  Home,
  Sparkles,
  FolderKanban,
  Database,
  CheckSquare,
  BarChart3,
  History,
  Settings,
  HelpCircle,
  Cpu,
  CheckCircle2,
  Flame,
  Plus
} from 'lucide-react';
import { UserRole, ProjectItem } from '../../types';

export type NavTab =
  | 'dashboard'
  | 'transform'
  | 'deliverables'
  | 'verification'
  | 'traceability'
  | 'reviews'
  | 'projects'
  | 'knowledge-vault'
  | 'analytics'
  | 'version-history'
  | 'trending';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentRole: UserRole;
  currentWorkspace: string;
  hasGeneratedOutputs: boolean;
  user?: any;
  onOpenAuth?: () => void;
  projects: ProjectItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  currentWorkspace,
  hasGeneratedOutputs,
  user,
  onOpenAuth,
  projects
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transform', label: 'Transformation Studio', icon: Sparkles, badge: 'Hero' },
    { id: 'trending', label: 'Hot Topics (India)', icon: Flame, badge: 'Live News' },
    ...(hasGeneratedOutputs ? [
      { id: 'deliverables', label: 'Generated Deliverables', icon: Sparkles, badge: '6 Ready' },
      { id: 'verification', label: 'AI Verification', icon: CheckCircle2, badge: '96%' },
      { id: 'traceability', label: 'Source Traceability', icon: Cpu }
    ] : []),
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'knowledge-vault', label: 'Knowledge Vault', icon: Database, badge: 'RAG' },
    { id: 'reviews', label: 'Human Reviews', icon: CheckSquare, badge: 'Workflow' },
    { id: 'version-history', label: 'Version History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-slate-950 border-sky-500/10 flex flex-col justify-between shrink-0 lg:min-h-[calc(100vh-61px)]">
      {/* Top navigation links */}
      <div className="p-4 space-y-6">
        <button
          onClick={() => onTabChange('transform')}
          className="w-full flex items-center justify-between p-3 bg-slate-800/60 text-white hover:bg-slate-700/50 text-white font-bold rounded-xl transition-colors shadow-md shadow-white/5 active:scale-95"
        >
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Transformation</span>
          </div>
          <span className="text-[10px] bg-slate-950/10 px-1.5 py-0.5 rounded text-white/70 font-mono">⌘K</span>
        </button>

        <div>
          <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Platform Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as NavTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-400 border-none hover:bg-sky-400 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]/15 text-slate-400 border border-sky-500/20 shadow-sm text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/80 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badge === 'Hero'
                      ? 'bg-purple-500/20 text-slate-300 border border-sky-500/30'
                      : item.badge === '96%'
                        ? 'bg-emerald-100 text-slate-300 border border-emerald-500/30'
                        : 'bg-slate-950 text-slate-300'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Recent Projects (Like Perplexity Threads) */}
        {projects.length > 0 && (
          <div className="mt-4 flex-1 overflow-y-auto pr-2">
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
              Recent Generation Threads
            </div>
            <div className="space-y-0.5">
              {projects.slice(0, 10).map(p => (
                <button
                  key={p.id}
                  onClick={() => onTabChange('projects')}
                  className="w-full text-left px-3 py-1.5 text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-950 rounded-lg truncate transition-colors"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RAG Context Status Box */}
        <div className="p-3.5 rounded-xl bg-slate-950 border-sky-500/10/70 backdrop-blur-3xl border border-sky-500/10 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Organization RAG
            </span>
            <span className="text-[10px] text-slate-300 font-medium">Enabled ✓</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Active Vault: <span className="text-slate-200 font-medium">GRAMX Knowledge Vault</span>. Contextual terminology & guidelines enforced.
          </p>
        </div>
      </div>

      {/* Bottom Profile & Workspace Status */}
      <div className="p-4 border-t border-white/[0.08]/80 space-y-3 bg-slate-950/40 backdrop-blur-xl">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center font-bold text-xs text-white shadow">
              {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Online • {currentWorkspace}
              </p>
            </div>
          </div>
        ) : (
          <div
            onClick={onOpenAuth}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-950 cursor-pointer border border-transparent hover:border-white/[0.08] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center font-bold text-xs text-zinc-500 shadow-inner">
              ?
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-300 truncate hover:underline">
                Sign in to save history
              </p>
              <p className="text-[10px] text-zinc-500">
                Guest Mode (Not logging)
              </p>
            </div>
          </div>
        )}

        <div className="text-[10px] text-slate-400 flex items-center justify-between px-1">
          <span>GramX v2.4</span>
          <span className="text-slate-300 font-semibold">2026</span>
        </div>
      </div>
    </aside>
  );
};
