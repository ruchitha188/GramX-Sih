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
  currentWorkspace: 'GRAMX Communications' | 'Personal Account';
  onWorkspaceChange: (ws: 'GRAMX Communications' | 'Personal Account') => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onRunDemoFlow: () => void;
  onOpenCloudSettings: () => void;
  isLiveAiActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentWorkspace,
  onWorkspaceChange,
  currentRole,
  onRoleChange,
  onRunDemoFlow,
  onOpenCloudSettings,
  isLiveAiActive
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Branding & SIH Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">BharatContent AI</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-600/10 text-blue-700 border border-blue-300/20">
                SIH26154
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-300">
                Team GRAMX
              </span>
            </div>
            <p className="text-[12px] text-slate-600 hidden sm:block">
              Gen AI Platform for Automated Content Transformation
            </p>
          </div>
        </div>

        {/* Right Actions: Workspace Selector, Role Switcher & 2-Min Demo CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Google LLM Engine Status Indicator */}
          <button
            onClick={onOpenCloudSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-500/30 hover:bg-emerald-100 transition-all"
            title="Google LLM Engine Status (Gemini & Gemma)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">Google LLM Active</span>
            <span className="sm:hidden">Google LLM</span>
          </button>

          {/* Quick 2-Minute Demo Flow Trigger */}
          <button
            onClick={onRunDemoFlow}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-md shadow-emerald-900/30 transition-all border border-emerald-400/30 active:scale-95"
            title="Automatically run the recommended 2-minute Smart India Hackathon demo flow"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">2-Minute SIH Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Workspace Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              <span className="max-w-[120px] truncate hidden md:inline">{currentWorkspace}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <div className="absolute right-0 mt-1 w-56 py-1 bg-slate-50 border border-slate-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="px-3 py-2 text-[11px] font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                Switch Workspace
              </div>
              <button
                onClick={() => onWorkspaceChange('GRAMX Communications')}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 transition-colors ${
                  currentWorkspace === 'GRAMX Communications' ? 'text-blue-700 font-semibold bg-blue-600/10' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-700" />
                  <span>GRAMX Communications</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600/20 text-blue-600">Org</span>
              </button>
              <button
                onClick={() => onWorkspaceChange('Personal Account')}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 transition-colors ${
                  currentWorkspace === 'Personal Account' ? 'text-blue-700 font-semibold bg-blue-600/10' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-600" />
                  <span>Personal Account</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">Free</span>
              </button>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden lg:inline">{currentRole === 'Admin' ? 'Ruchitha (Admin)' : currentRole === 'Editor' ? 'Siddharth (Editor)' : 'Dr. Ananya (Reviewer)'}</span>
              <span className="lg:hidden">{currentRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <div className="absolute right-0 mt-1 w-52 py-1 bg-slate-50 border border-slate-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="px-3 py-2 text-[11px] font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                Simulate Role
              </div>
              <button
                onClick={() => onRoleChange('Admin')}
                className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-100 transition-colors ${
                  currentRole === 'Admin' ? 'text-amber-700 font-semibold bg-amber-50' : 'text-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Ruchitha — Admin</span>
              </button>
              <button
                onClick={() => onRoleChange('Editor')}
                className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-100 transition-colors ${
                  currentRole === 'Editor' ? 'text-blue-400 font-semibold bg-blue-500/10' : 'text-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Siddharth — Editor</span>
              </button>
              <button
                onClick={() => onRoleChange('Reviewer')}
                className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-100 transition-colors ${
                  currentRole === 'Reviewer' ? 'text-emerald-700 font-semibold bg-emerald-50' : 'text-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Dr. Ananya — Reviewer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
