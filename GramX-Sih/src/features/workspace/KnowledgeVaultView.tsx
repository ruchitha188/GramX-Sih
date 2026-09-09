import React, { useState } from 'react';
import { 
  Database, 
  Folder, 
  FileText, 
  Search, 
  Upload, 
  CheckCircle2, 
  Languages, 
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-react';
import { KnowledgeDocument, GlossaryTerm } from '../../types';
import { INITIAL_KNOWLEDGE_DOCS } from '../../data/workspaceData';
import { GLOSSARY_TERMS } from '../../data/glossaryData';

export const KnowledgeVaultView: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState<string>('All');
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(INITIAL_KNOWLEDGE_DOCS);
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'docs' | 'glossary'>('docs');

  const folders = [
    'All',
    'Government Guidelines',
    'Research Papers',
    'Official Terminology',
    'Previous Campaigns',
    'FAQs',
    'Telugu Glossary'
  ];

  const filteredDocs = activeFolder === 'All' 
    ? documents 
    : documents.filter(d => d.folder === activeFolder);

  const filteredGlossary = GLOSSARY_TERMS.filter(term => 
    term.english.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    term.telugu.includes(glossarySearch) ||
    term.category.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-zinc-950/70 backdrop-blur-3xl border border-zinc-800 rounded-2xl p-6 shadow-2xl shadow-black/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-300 text-black/20 text-zinc-400 border border-zinc-500/30 uppercase tracking-wide">
                Enterprise Grounding Layer
              </span>
              <span className="text-xs text-zinc-400">Contextual RAG & Terminology</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2.5">
              <Database className="w-6 h-6 text-zinc-300" />
              Organization Knowledge Vault
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              A trusted institutional knowledge base enforcing official guidelines, verified precedents, and approved bilingual terminology.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-blue-300/30 text-xs text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>RAG Contextual Generation:</span>
            <strong className="text-emerald-700">Active ✓</strong>
          </div>
        </div>

        {/* Tab Switcher: Documents vs Glossary */}
        <div className="flex items-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'docs' 
                ? 'bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] text-zinc-100 shadow-md' 
                : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Indexed Documents ({documents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'glossary' 
                ? 'bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] text-zinc-100 shadow-md' 
                : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Approved Telugu Glossary ({GLOSSARY_TERMS.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'docs' ? (
        /* Document Repository View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Folders Sidebar (3 cols) */}
          <div className="lg:col-span-3 bg-zinc-950/70 backdrop-blur-3xl border border-zinc-800 rounded-2xl p-4 shadow-2xl shadow-black/80 space-y-2">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-2 mb-2">
              Knowledge Folders
            </div>
            {folders.map(folder => {
              const isSelected = activeFolder === folder;
              return (
                <button
                  key={folder}
                  onClick={() => setActiveFolder(folder)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all ${
                    isSelected
                      ? 'bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]/20 text-zinc-400 border border-zinc-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950'
                  }`}
                >
                  <Folder className={`w-4 h-4 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`} />
                  <span className="truncate">{folder}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Indexed Documents List (9 cols) */}
          <div className="lg:col-span-9 bg-zinc-950/70 backdrop-blur-3xl border border-zinc-800 rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-100">
                  {activeFolder === 'All' ? 'All Indexed Vault Documents' : activeFolder}
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Vector embeddings stored for semantic retrieval during content synthesis.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newDoc: KnowledgeDocument = {
                      id: `doc-${Date.now()}`,
                      name: 'Cybersecurity_Mitigation_Directives_2026.pdf',
                      folder: 'Government Guidelines',
                      size: '3.4 MB',
                      indexedDate: 'Just now',
                      chunks: 1120,
                      status: 'Indexed'
                    };
                    setDocuments([newDoc, ...documents]);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-white text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Index New Document</span>
                </button>
              </div>
            </div>

            {/* Document Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="pb-3 font-semibold">Document Name</th>
                    <th className="pb-3 font-semibold">Folder</th>
                    <th className="pb-3 font-semibold">Size</th>
                    <th className="pb-3 font-semibold">Chunks</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredDocs.map(doc => (
                    <tr key={doc.id} className="hover:bg-zinc-950/60 transition-colors">
                      <td className="py-3 font-medium text-zinc-200 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-zinc-300 shrink-0" />
                        <span className="truncate max-w-xs">{doc.name}</span>
                      </td>
                      <td className="py-3 text-zinc-400">{doc.folder}</td>
                      <td className="py-3 text-zinc-400">{doc.size}</td>
                      <td className="py-3 font-mono text-zinc-400">{doc.chunks} vectors</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Approved Terminology Glossary View */
        <div className="bg-zinc-950/70 backdrop-blur-3xl border border-zinc-800 rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <Languages className="w-5 h-5 text-zinc-300" />
                Approved English ↔ Telugu Glossary
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                AI prioritizes organization-approved terminology for consistent localization.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Search English or Telugu terms..."
                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-slate-500 focus:outline-none focus:border-blue-300"
              />
            </div>
          </div>

          {/* Glossary Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="pb-3 font-semibold">English Standard Term</th>
                  <th className="pb-3 font-semibold">Approved Telugu (తెలుగు)</th>
                  <th className="pb-3 font-semibold">Domain Category</th>
                  <th className="pb-3 font-semibold">Mandatory Usage Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredGlossary.map(term => (
                  <tr key={term.id} className="hover:bg-zinc-950/60 transition-colors">
                    <td className="py-3 font-bold text-zinc-200">
                      {term.english}
                    </td>
                    <td className="py-3 text-emerald-700 font-bold text-sm">
                      {term.telugu}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 text-[10px]">
                        {term.category}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-400 max-w-sm">
                      {term.usageNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
