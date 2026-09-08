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
      <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600/20 text-blue-600 border border-blue-300/40 uppercase tracking-wide">
                Campaign Hub
              </span>
              <span className="text-xs text-slate-600">Collaborative Workspaces</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <FolderKanban className="w-6 h-6 text-blue-700" />
              Organization Projects
            </h2>
            <p className="text-xs text-slate-600 mt-1">
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
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
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
                  ? 'bg-blue-700 text-slate-900 font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200'
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
            className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 shadow-xl space-y-4 hover:border-blue-300/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {proj.title}
                </h3>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                  proj.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-300 border border-emerald-500/30'
                    : proj.status === 'In Review'
                    ? 'bg-amber-100 text-amber-300 border border-amber-500/30'
                    : proj.status === 'Published'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {proj.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {proj.description}
              </p>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 space-y-1 text-xs">
                <div className="text-[11px] text-slate-600 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-blue-700 font-mono">
                    <FileText className="w-3.5 h-3.5" />
                    {proj.sourceName}
                  </span>
                  <span className="text-slate-700 font-semibold">
                    {proj.deliverablesCount} Deliverables
                  </span>
                </div>
              </div>

              {/* Team members */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{proj.team.join(' • ')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 text-[11px]">Updated {proj.updatedAt}</span>
              <button
                onClick={() => onOpenProject(proj.id)}
                className="flex items-center gap-1 text-blue-700 hover:text-blue-600 font-semibold"
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
