import React from 'react';
import {
  Building2,
  Sparkles,
  UserCheck,
  ShieldCheck,
  Play,
  Layers,
  ChevronDown,
  Cpu,
  Key
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  currentWorkspace: string;
  onWorkspaceChange: (ws: string) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onRunDemoFlow: () => void;
  onOpenCloudSettings: () => void;
  isLiveAiActive: boolean;
  user?: any;
  onOpenAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentWorkspace,
  onWorkspaceChange,
  currentRole,
  onRoleChange,
  onRunDemoFlow,
  onOpenCloudSettings,
  isLiveAiActive,
  user,
  onOpenAuth
}) => {
  const handleSignOut = async () => {
    // import supabase inline to avoid circular deps if any
    const { supabase } = await import('../../services/supabaseClient');
    await supabase.auth.signOut();
  };

  const isAdmin = user?.email === 'ruchithasai.r188@gmail.com' || user?.user_metadata?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-slate-950 border-sky-500/10/90 backdrop-blur-md px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Branding & SIH Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-9000 via-purple-600 to-pink-500 shadow-lg shadow-white/5">
            <Sparkles className="w-5 h-5 text-slate-50" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-50">GramX</span>
            </div>
            <p className="text-[12px] text-slate-400 hidden sm:block">
              Gen AI Platform for Automated Content Transformation
            </p>
          </div>
        </div>

        {/* Right Actions: Workspace Selector & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Google LLM Engine Status Indicator (Admin Only) */}
          {isAdmin && (
            <button
              onClick={onOpenCloudSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border bg-emerald-50 text-slate-300 border-emerald-500/30 hover:bg-emerald-100 transition-all"
              title="Google LLM Engine Status (Gemini & Gemma)"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">Google LLM Active</span>
              <span className="sm:hidden">Google LLM</span>
            </button>
          )}

          {/* Workspace Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-950 hover:bg-slate-950 border border-white/[0.08] rounded-lg transition-colors">
              <Building2 className="w-3.5 h-3.5 text-slate-300" />
              <span className="max-w-[120px] truncate hidden md:inline">{currentWorkspace}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            <div className="absolute right-0 mt-1 w-56 py-1 bg-slate-950 border border-white/[0.08] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/[0.08]">
                Switch Workspace
              </div>
              <button
                onClick={() => onWorkspaceChange('Personal Account')}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-950 transition-colors ${currentWorkspace === 'Personal Account' ? 'text-slate-300 font-semibold bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-400 border-none text-white/10' : 'text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  <span>Personal Account</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-300">Active</span>
              </button>

              <div className="border-t border-white/[0.08] mt-1 pt-1">
                <button
                  onClick={() => alert('Workspace creation flow coming soon!')}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-950 transition-colors text-slate-300 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Create Workspace...</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Auth Button */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/90/50 border border-white/[0.12] rounded-lg transition-colors">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 mt-1 w-48 py-1 bg-slate-950 border-sky-500/10 border border-white/[0.08] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/[0.08]">
                  {user.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold transition-colors rounded-b-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
