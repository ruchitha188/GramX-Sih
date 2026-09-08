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
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../../types';

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
  | 'version-history';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentRole: UserRole;
  currentWorkspace: string;
  hasGeneratedOutputs: boolean;
  user?: any;
  onOpenAuth?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  currentWorkspace,
  hasGeneratedOutputs,
  user,
  onOpenAuth
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transform', label: 'Transformation Studio', icon: Sparkles, badge: 'Hero' },
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
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)]">
      {/* Top navigation links */}
      <div className="p-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
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
                      ? 'bg-blue-700/15 text-blue-600 border border-blue-300/30 shadow-sm shadow-blue-200/50'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50/80 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-700'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badge === 'Hero'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : item.badge === '96%'
                          ? 'bg-emerald-100 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* RAG Context Status Box */}
        <div className="p-3.5 rounded-xl bg-slate-50/90 border border-blue-300/20 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Organization RAG
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">Enabled ✓</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Active Vault: <span className="text-slate-800 font-medium">GRAMX Knowledge Vault</span>. Contextual terminology & guidelines enforced.
          </p>
        </div>
      </div>

      {/* Bottom Profile & Workspace Status */}
      <div className="p-4 border-t border-slate-200/80 space-y-3 bg-white/80">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center font-bold text-xs text-white shadow">
              {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </p>
              <p className="text-[11px] text-slate-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Online • {currentWorkspace === 'GRAMX Communications' ? 'GRAMX Org' : 'Personal'}
              </p>
            </div>
          </div>
        ) : (
          <div
            onClick={onOpenAuth}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500 shadow-inner">
              ?
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-blue-700 truncate hover:underline">
                Sign in to save history
              </p>
              <p className="text-[10px] text-slate-500">
                Guest Mode (Not logging)
              </p>
            </div>
          </div>
        )}

        <div className="text-[10px] text-slate-600 flex items-center justify-between px-1">
          <span>GramX v2.4</span>
          <span className="text-blue-700 font-semibold">2026</span>
        </div>
      </div>
    </aside>
  );
};
