import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  FileText, 
  Sparkles, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ProjectItem } from '../../types';
import { INITIAL_PROJECTS } from '../../data/workspaceData';

interface ProjectsViewProps {
  onOpenProject: (projectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenProject }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [filter, setFilter] = useState<string>('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none text-white/20 text-neutral-400 border border-neutral-700/50/30 uppercase tracking-wide">
                Campaign Hub
              </span>
              <span className="text-xs text-neutral-400">Collaborative Workspaces</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-50 tracking-tight flex items-center gap-2.5">
              <FolderKanban className="w-6 h-6 text-neutral-300" />
              Organization Projects
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Manage multi-format communication campaigns, linked source documents, versions, and team signoffs.
            </p>
          </div>

          <button
            onClick={() => {
              const newProj: ProjectItem = {
                id: `proj-${Date.now()}`,
                title: 'National Digital Literacy Campaign',
                description: 'Rural community outreach transforming policy leaflets into audio and visual infographics.',
                sourceName: 'Digital_Inclusion_Directive.pdf',
                deliverablesCount: 5,
                updatedAt: 'Just now',
                status: 'Draft',
                team: ['Ruchitha (Admin)', 'Siddharth (Editor)']
              };
              setProjects([newProj, ...projects]);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none hover:bg-emerald-400 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-neutral-700/50 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pt-4 text-xs">
          {['All', 'In Review', 'Approved', 'Published', 'Draft'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === status
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none hover:bg-emerald-400 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] text-neutral-50 font-semibold'
                  : 'bg-neutral-950 border-emerald-500/10 text-neutral-400 hover:text-neutral-200 border border-white/[0.08]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4 hover:border-neutral-700/50/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-neutral-50 leading-snug">
                  {proj.title}
                </h3>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                  proj.status === 'Approved'
                    ? 'bg-emerald-100 text-neutral-300 border border-emerald-500/30'
                    : proj.status === 'In Review'
                    ? 'bg-amber-100 text-amber-300 border border-amber-500/30'
                    : proj.status === 'Published'
                    ? 'bg-teal-500/20 text-neutral-300 border border-emerald-500/30'
                    : 'bg-neutral-950 text-neutral-400'
                }`}>
                  {proj.status}
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {proj.description}
              </p>

              <div className="p-2.5 rounded-xl bg-neutral-950 border-emerald-500/10 border border-white/[0.08]/80 space-y-1 text-xs">
                <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-300 font-mono">
                    <FileText className="w-3.5 h-3.5" />
                    {proj.sourceName}
                  </span>
                  <span className="text-neutral-300 font-semibold">
                    {proj.deliverablesCount} Deliverables
                  </span>
                </div>
              </div>

              {/* Team members */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Users className="w-3.5 h-3.5 text-neutral-500" />
                <span className="truncate">{proj.team.join(' • ')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-neutral-400 text-[11px]">Updated {proj.updatedAt}</span>
              <button
                onClick={() => onOpenProject(proj.id)}
                className="flex items-center gap-1 text-neutral-300 hover:text-neutral-400 font-semibold"
              >
                <span>Open Project Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
