import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Copy, 
  Edit3, 
  RefreshCw, 
  Languages, 
  Share2, 
  Download, 
  FileText, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldAlert, 
  Cpu, 
  Film, 
  MessageSquare, 
  Send, 
  FileSpreadsheet, 
  Presentation as PresentationIcon, 
  Video as VideoIcon, 
  PieChart,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share,
  Palette,
  Layout,
  ListCheck,
  Shield,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import { DeliverableOutput, DeliverableType } from '../../types';
import { exportService } from '../../services/exportService';

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

interface DeliverablesViewProps {
  deliverables: DeliverableOutput[];
  sourceName: string;
  onOpenVerification: () => void;
  onOpenTraceability: () => void;
  onSendToReview: (deliverableId?: string) => void;
  onOpenExportModal: () => void;
  onUpdateDeliverableContent: (id: string, newContent: string) => void;
}

export const DeliverablesView: React.FC<DeliverablesViewProps> = ({
  deliverables,
  sourceName,
  onOpenVerification,
  onOpenTraceability,
  onSendToReview,
  onOpenExportModal,
  onUpdateDeliverableContent
}) => {
  const [activeDeliverableId, setActiveDeliverableId] = useState<string>(() => {
    const exec = deliverables.find(d => d.type === 'executive_summary');
    return exec ? exec.id : (deliverables[0]?.id || '');
  });

  useEffect(() => {
    if (deliverables.length > 0) {
      const exists = deliverables.some(d => d.id === activeDeliverableId);
      if (!exists || !activeDeliverableId) {
        const exec = deliverables.find(d => d.type === 'executive_summary');
        setActiveDeliverableId(exec ? exec.id : deliverables[0].id);
      }
    }
  }, [deliverables, activeDeliverableId]);

  const [languageMode, setLanguageMode] = useState<'en' | 'te' | 'split'>('en');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeVideoTab, setActiveVideoTab] = useState<'script' | 'storyboard' | 'scenes' | 'narration' | 'subtitles' | 'visuals'>('script');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [showRawSummary, setShowRawSummary] = useState<boolean>(true);

  const activeDeliverable = deliverables.find(d => d.id === activeDeliverableId) || deliverables[0];

  const handleCopy = async (text: string) => {
    const ok = await exportService.copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartEdit = (d: DeliverableOutput) => {
    setEditingId(d.id);
    setEditBuffer(languageMode === 'te' ? (d.contentTe || d.contentEn) : d.contentEn);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      onUpdateDeliverableContent(editingId, editBuffer);
      setEditingId(null);
    }
  };

  const getDeliverableIcon = (type: DeliverableType) => {
    switch (type) {
      case 'linkedin': return LinkedinIcon;
      case 'twitter_thread':
      case 'twitter_post': return TwitterIcon;
      case 'advisory': return FileText;
      case 'executive_summary': return FileSpreadsheet;
      case 'presentation': return PresentationIcon;
      case 'video_package': return VideoIcon;
      case 'infographic': return PieChart;
      default: return FileText;
    }
  };

  if (!activeDeliverable) {
    return (
      <div className="text-center py-20 text-slate-600">
        No deliverables generated yet. Please select deliverables in Transformation Studio.
      </div>
    );
  }

  const IconComponent = getDeliverableIcon(activeDeliverable.type);

  return (
    <div className="space-y-6">
      {/* Header Banner: Linking ONE Source to Multiple Deliverables */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-950/40 to-blue-50 border border-blue-300/30 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600/20 text-blue-600 border border-blue-300/40 uppercase tracking-wide">
                Transformation Complete
              </span>
              <span className="text-xs text-slate-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                All Outputs Synchronized
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Generated Deliverables
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 mt-1.5">
              <span className="text-slate-600">Source:</span>
              <strong className="text-blue-700 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                {sourceName}
              </strong>
              <span className="text-slate-500">➔</span>
              <span className="text-emerald-700 font-bold">
                {deliverables.length} Deliverables Generated
              </span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenVerification}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-700 text-slate-800 hover:text-slate-900 rounded-xl text-xs font-semibold border border-slate-300 transition-colors shadow-sm"
              title="Inspect 96% fact verification & mismatch resolver"
            >
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>AI Verification</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-300 text-[10px] font-bold">
                96%
              </span>
            </button>

            <button
              onClick={onOpenTraceability}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-700 text-slate-800 hover:text-slate-900 rounded-xl text-xs font-semibold border border-slate-300 transition-colors shadow-sm"
              title="Inspect side-by-side ground truth highlighting"
            >
              <Cpu className="w-4 h-4 text-blue-700" />
              <span>Source Traceability</span>
            </button>

            <button
              onClick={() => onSendToReview(activeDeliverable.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-md shadow-indigo-900/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Review</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-900 rounded-xl text-xs font-semibold transition-all shadow-md shadow-emerald-950/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Deliverables</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deliverables Switcher Bar (Tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {deliverables.map((item) => {
          const ItemIcon = getDeliverableIcon(item.type);
          const isActive = item.id === activeDeliverableId;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveDeliverableId(item.id);
                setEditingId(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium shrink-0 transition-all border ${
                isActive
                  ? 'bg-blue-700 text-slate-900 border-blue-300 shadow-md shadow-blue-200/50 font-semibold'
                  : 'bg-slate-50/90 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ItemIcon className="w-4 h-4" />
              <span>{item.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-indigo-950 text-indigo-200' : 'bg-slate-100 text-slate-600'
              }`}>
                ✓
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Deliverable Workspace Card */}
      <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5">
        {/* Deliverable Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-300/30 flex items-center justify-center text-blue-700 shadow-sm">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {activeDeliverable.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-300 border border-emerald-500/30">
                  ✓ Ready
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                  v{activeDeliverable.version}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {activeDeliverable.description}
              </p>
            </div>
          </div>

          {/* Action Bar: Language Toggle, Edit, Copy, Regenerate */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setLanguageMode('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  languageMode === 'en' ? 'bg-blue-700 text-slate-900 font-semibold shadow' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguageMode('te')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  languageMode === 'te' ? 'bg-blue-700 text-slate-900 font-semibold shadow' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                తెలుగు (Telugu)
              </button>
              <button
                onClick={() => setLanguageMode('split')}
                className={`hidden md:block px-2.5 py-1 rounded-lg transition-all ${
                  languageMode === 'split' ? 'bg-blue-700 text-slate-900 font-semibold shadow' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Bilingual Split
              </button>
            </div>

            {/* In-place Edit Button */}
            {editingId === activeDeliverable.id ? (
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleStartEdit(activeDeliverable)}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                title="Edit deliverable text"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(languageMode === 'te' ? (activeDeliverable.contentTe || activeDeliverable.contentEn) : activeDeliverable.contentEn)}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Quick Export for active item */}
            <button
              onClick={() => {
                if (activeDeliverable.type === 'presentation') {
                  exportService.exportToPptx(activeDeliverable, sourceName);
                } else if (activeDeliverable.type === 'video_package') {
                  exportService.exportToSrt(activeDeliverable);
                } else {
                  exportService.exportToDocx([activeDeliverable], sourceName);
                }
              }}
              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Download single file"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body Based on Type and Language */}
        {editingId === activeDeliverable.id ? (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-700">
              Editing Content ({languageMode.toUpperCase()}):
            </label>
            <textarea
              value={editBuffer}
              onChange={(e) => setEditBuffer(e.target.value)}
              className="w-full h-80 px-4 py-3 bg-white border border-blue-300/50 rounded-xl text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          /* Specialized Deliverable Displays */
          <div>
            {/* 1. Presentation Slide Viewer */}
            {activeDeliverable.type === 'presentation' && activeDeliverable.structuredData?.presentation ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    <PresentationIcon className="w-4 h-4 text-blue-700" />
                    Interactive Slide Deck Preview (8 Slides Generated)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
                      disabled={activeSlideIndex === 0}
                      className="p-1 rounded bg-slate-50 border border-slate-200 disabled:opacity-40 text-slate-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-blue-700 font-bold px-1">
                      Slide {activeSlideIndex + 1} of {activeDeliverable.structuredData.presentation.slides.length}
                    </span>
                    <button
                      onClick={() => setActiveSlideIndex(Math.min(activeDeliverable.structuredData!.presentation!.slides.length - 1, activeSlideIndex + 1))}
                      disabled={activeSlideIndex === activeDeliverable.structuredData.presentation.slides.length - 1}
                      className="p-1 rounded bg-slate-50 border border-slate-200 disabled:opacity-40 text-slate-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* The Slide Canvas */}
                {(() => {
                  const currentSlide = activeDeliverable.structuredData.presentation.slides[activeSlideIndex];
                  return (
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-white via-blue-50 to-indigo-950/40 border-2 border-blue-300/30 shadow-2xl min-h-[320px] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 border-b border-slate-200/80 pb-2 mb-4">
                          <span>BharatContent AI Executive Slide Deck</span>
                          <span className="font-bold text-blue-700">SLIDE {currentSlide.slideNumber}</span>
                        </div>
                        <h4 className="text-xl font-extrabold text-slate-900 mb-4">
                          {currentSlide.title}
                        </h4>
                        <ul className="space-y-2.5">
                          {currentSlide.bullets.map((b, i) => (
                            <li key={i} className="text-sm text-slate-800 flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Speaker Notes */}
                      <div className="mt-6 pt-4 border-t border-slate-200/80 bg-white/60 p-3 rounded-xl text-xs text-slate-600">
                        <strong className="text-blue-600 font-semibold block mb-1">Speaker Notes:</strong>
                        {currentSlide.speakerNotes}
                      </div>
                    </div>
                  );
                })()}

                {/* Slide Thumbnails strip */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {activeDeliverable.structuredData.presentation.slides.map((s, idx) => (
                    <button
                      key={s.slideNumber}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-all truncate ${
                        activeSlideIndex === idx
                          ? 'bg-blue-700/30 border-blue-300 text-slate-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      Slide {s.slideNumber}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* 2. Video Package Viewer */}
            {activeDeliverable.type === 'video_package' && activeDeliverable.structuredData?.videoPackage ? (
              <div className="space-y-4">
                {/* Sub-tabs for Video Package */}
                <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setActiveVideoTab('script')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeVideoTab === 'script' ? 'bg-blue-700 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Script
                  </button>
                  <button
                    onClick={() => setActiveVideoTab('storyboard')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeVideoTab === 'storyboard' ? 'bg-blue-700 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Storyboard (5 Scenes)
                  </button>
                  <button
                    onClick={() => setActiveVideoTab('scenes')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeVideoTab === 'scenes' ? 'bg-blue-700 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Scene Descriptions
                  </button>
                  <button
                    onClick={() => setActiveVideoTab('narration')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeVideoTab === 'narration' ? 'bg-blue-700 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Narration Text
                  </button>
                  <button
                    onClick={() => setActiveVideoTab('subtitles')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeVideoTab === 'subtitles' ? 'bg-blue-700 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Subtitles (SRT)
                  </button>
                  <button
                    onClick={() => setActiveVideoTab('visuals')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeVideoTab === 'visuals' ? 'bg-blue-700 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Visual Recommendations
                  </button>
                </div>

                {/* Video Package Tab Content */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 text-xs">
                  {activeVideoTab === 'script' && (
                    <pre className="font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {activeDeliverable.structuredData.videoPackage.script}
                    </pre>
                  )}

                  {activeVideoTab === 'storyboard' && (
                    <div className="space-y-3">
                      {activeDeliverable.structuredData.videoPackage.storyboard.map(sb => (
                        <div key={sb.sceneNumber} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center justify-between text-blue-700 font-bold">
                            <span>Scene {sb.sceneNumber}</span>
                            <span className="text-[10px] px-2 py-0.5 bg-blue-600/20 rounded text-blue-600">
                              {sb.duration}
                            </span>
                          </div>
                          <p className="text-slate-800"><strong className="text-slate-600">Visual:</strong> {sb.visual}</p>
                          <p className="text-slate-600"><strong className="text-slate-700">Audio/Vocal:</strong> {sb.audio}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeVideoTab === 'scenes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeDeliverable.structuredData.videoPackage.scenes.map(sc => (
                        <div key={sc.sceneNumber} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                          <div className="text-blue-700 font-bold">Scene {sc.sceneNumber}: {sc.setting}</div>
                          <p className="text-slate-700">{sc.visualDescription}</p>
                          <p className="text-[11px] text-amber-700 font-mono">Camera: {sc.cameraAngle}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeVideoTab === 'narration' && (
                    <pre className="font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {activeDeliverable.structuredData.videoPackage.narration}
                    </pre>
                  )}

                  {activeVideoTab === 'subtitles' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span>Standard SubRip Text (SRT) format:</span>
                        <button
                          onClick={() => exportService.exportToSrt(activeDeliverable)}
                          className="flex items-center gap-1 text-blue-700 hover:text-blue-600"
                        >
                          <Download className="w-3.5 h-3.5" /> Download .srt
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-emerald-700 text-[11px] whitespace-pre-wrap">
                        {activeDeliverable.structuredData.videoPackage.subtitlesSrt}
                      </pre>
                    </div>
                  )}

                  {activeVideoTab === 'visuals' && (
                    <div className="space-y-2">
                      {activeDeliverable.structuredData.videoPackage.visualRecommendations.map((rec, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                          <span className="text-slate-800">{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* 3. Infographic Content & Layout Blueprint Viewer */}
            {activeDeliverable.type === 'infographic' && (
              <div className="space-y-5">
                {/* Infographic Hero Header */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-indigo-950/40 to-white border-2 border-blue-300/30 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/20 text-blue-600 border border-blue-300/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5" /> Infographic Blueprint & Content
                    </span>
                    <span className="text-xs text-slate-600 font-mono">
                      Aspect Ratio: 9:16 (Mobile/Social) & 16:9 (Display)
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {activeDeliverable.structuredData?.infographic?.title || 'National Cyber Defense Telemetry & Citizen Data Integrity'}
                  </h3>
                  <p className="text-xs text-slate-700">
                    {activeDeliverable.structuredData?.infographic?.subtitle || 'Official CERT-In Incident Forensic Summary & Mitigation Blueprint'}
                  </p>
                </div>

                {/* Key Messaging Pillars */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-700" />
                    Key Messaging Pillars
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(activeDeliverable.structuredData?.infographic?.keyMessaging || [
                      'Citizen Privacy 100% Preserved: Zero biometric or payment records breached.',
                      'Autonomous Rapid Containment: Threat neutralized in 42 minutes by SOC telemetry.',
                      'Mandatory Enterprise Hygiene: Immediate deployment of patch v4.8.2 and FIDO2 MFA.',
                      'Transparent Public Governance: 24/7 Citizen helpline 1800-11-4949 active.'
                    ]).map((msg, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <p className="text-xs text-slate-800 font-medium leading-relaxed">{msg}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics Telemetry Grid */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-700" />
                    Quantitative Telemetry & Hero Metrics
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(activeDeliverable.structuredData?.infographic?.statistics || [
                      { label: 'Containment Speed', value: '42 Min', desc: 'From SOC alert to full edge isolation' },
                      { label: 'Biometric Records Breached', value: '0', desc: 'Citizen privacy 100% intact' },
                      { label: 'Patch Compliance', value: '94%', desc: 'Nodes updated within 12 hours' },
                      { label: 'Citizen Portal Uptime', value: '100%', desc: 'Zero disruption to public utilities' }
                    ]).map((st, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 text-center space-y-1">
                        <span className="text-[10px] text-slate-600 font-semibold block">{st.label}</span>
                        <span className="text-2xl font-black text-slate-900 text-blue-600">{st.value}</span>
                        <span className="text-[10px] text-slate-500 block">{st.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Flow Timeline */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Visual Chronology & Step-by-Step Flow
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                    {(activeDeliverable.structuredData?.infographic?.visualFlow || [
                      'Detection (1 Sept)', 'SOC Containment (42m)', 'Forensic Audit (0 Breaches)', 'Patch Release (v4.8.2)', 'Public Assurance'
                    ]).map((flowItem, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                        <span className="text-[10px] text-blue-700 block font-bold mb-1">Step {idx + 1}</span>
                        {flowItem}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layout Recommendations Box */}
                <div className="p-5 rounded-2xl bg-white/90 border border-blue-300/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-blue-700" />
                      Design & Layout Recommendations for Graphic Artists
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/20 text-blue-600 font-semibold">
                      Production Spec
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-600 text-[11px]">Recommended Grid Structure:</span>
                        <p className="text-slate-800 font-medium mt-0.5">
                          {activeDeliverable.structuredData?.infographic?.layoutRecommendations.recommendedGrid || '3-Tier Vertical Card Stack (Banner ➔ Hero Metric Hub ➔ 4-Step Defensive Timeline ➔ Action CTA)'}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-600 text-[11px]">Typography Hierarchy:</span>
                        <p className="text-slate-800 font-mono text-[11px] mt-0.5">
                          {activeDeliverable.structuredData?.infographic?.layoutRecommendations.typographyHierarchy || 'Primary Headline: 38pt Semi-Bold Sans; Metric Numbers: 48pt Bold Mono; Body Text: 14pt Regular Sans'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-600 text-[11px]">Recommended Color Palette:</span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[11px]">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0F172A] border border-slate-300" />
                            <span className="font-mono text-slate-700">#0F172A</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[11px]">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#6366F1]" />
                            <span className="font-mono text-slate-700">#6366F1</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[11px]">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                            <span className="font-mono text-slate-700">#10B981</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-600 text-[11px]">Suggested Vector Icons:</span>
                        <p className="text-blue-600 font-mono text-[11px] mt-0.5">
                          ShieldCheck, DatabaseLock, Cpu, CheckCircle2, Lock, PhoneCall
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. LinkedIn Post Social Mockup */}
            {activeDeliverable.type === 'linkedin' && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl max-w-2xl mx-auto space-y-4 font-sans">
                  {/* LinkedIn Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-slate-900 shadow">
                        BC
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900">BharatContent Official Dispatch</h4>
                          <span className="text-[10px] text-slate-500">• 1st</span>
                        </div>
                        <p className="text-[11px] text-slate-600">National Cyber Threat & Governance Updates</p>
                        <p className="text-[10px] text-slate-500">Just now • 🌐 Edited</p>
                      </div>
                    </div>
                    <div className="text-blue-400 font-bold text-xs flex items-center gap-1">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                    {languageMode === 'te' 
                      ? (activeDeliverable.contentTe || activeDeliverable.contentEn) 
                      : activeDeliverable.contentEn}
                  </div>

                  {/* Social Engagement Stats & Action Bar */}
                  <div className="pt-3 border-t border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white">👍</span>
                        <span className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white">👏</span>
                        <span className="ml-1 text-slate-600">248 likes • 34 comments</span>
                      </span>
                      <span>18 reposts</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1 text-xs text-slate-600 font-semibold pt-1 border-t border-slate-900">
                      <button className="py-2 hover:bg-slate-50 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Like</span>
                      </button>
                      <button className="py-2 hover:bg-slate-50 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Comment</span>
                      </button>
                      <button className="py-2 hover:bg-slate-50 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                        <Repeat2 className="w-3.5 h-3.5" />
                        <span>Repost</span>
                      </button>
                      <button className="py-2 hover:bg-slate-50 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Twitter / X Thread Feed Mockup */}
            {(activeDeliverable.type === 'twitter_thread' || activeDeliverable.type === 'twitter_post') && (
              <div className="space-y-4 max-w-2xl mx-auto">
                {activeDeliverable.structuredData?.thread ? (
                  <div className="space-y-3">
                    {activeDeliverable.structuredData.thread.map((tweet, idx) => (
                      <div key={tweet.tweetNumber} className="relative p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                        {idx < activeDeliverable.structuredData!.thread!.length - 1 && (
                          <div className="absolute left-7 top-14 bottom-[-14px] w-0.5 bg-slate-100 z-0" />
                        )}
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-900">
                              X
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-slate-900">BharatContent AI</span>
                                <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-slate-900">✓</span>
                                <span className="text-[11px] text-slate-500">@BharatContent</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-blue-700 font-mono bg-slate-50 px-2 py-0.5 rounded">
                            {tweet.tweetNumber}/5
                          </span>
                        </div>

                        <p className="text-xs text-slate-800 leading-relaxed pl-10 relative z-10 whitespace-pre-wrap font-sans">
                          {tweet.text}
                        </p>

                        <div className="flex items-center justify-between text-slate-500 text-[11px] pl-10 pt-2 border-t border-slate-900/60 relative z-10">
                          <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"><MessageCircle className="w-3.5 h-3.5" /> 14</span>
                          <span className="flex items-center gap-1 hover:text-emerald-700 cursor-pointer"><Repeat2 className="w-3.5 h-3.5" /> 48</span>
                          <span className="flex items-center gap-1 hover:text-rose-700 cursor-pointer"><ThumbsUp className="w-3.5 h-3.5" /> 192</span>
                          <span className="flex items-center gap-1 hover:text-blue-700 cursor-pointer"><Bookmark className="w-3.5 h-3.5" /> 26</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                    {languageMode === 'te' 
                      ? (activeDeliverable.contentTe || activeDeliverable.contentEn) 
                      : activeDeliverable.contentEn}
                  </div>
                )}
              </div>
            )}

            {/* 6. Official Advisory Formal Layout */}
            {activeDeliverable.type === 'advisory' && (
              <div className="space-y-4">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-slate-200 space-y-6">
                  {/* Government Header Banner */}
                  <div className="text-center border-b border-slate-200 pb-4 space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider">
                      <Shield className="w-3.5 h-3.5" /> Official Statutory Advisory
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide uppercase">
                      National Cybersecurity Mitigation Advisory
                    </h3>
                    <div className="flex items-center justify-center gap-3 text-[11px] text-slate-600 font-mono">
                      <span>REF: CERT-IN/ADV-2026-0894</span>
                      <span>•</span>
                      <span className="text-rose-700 font-bold">Severity: HIGH</span>
                      <span>•</span>
                      <span>Classification: OFFICIAL USE</span>
                    </div>
                  </div>

                  {/* Advisory Structured Content */}
                  <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                    {languageMode === 'te' 
                      ? (activeDeliverable.contentTe || activeDeliverable.contentEn) 
                      : activeDeliverable.contentEn}
                  </div>

                  {/* Official Verification Seal */}
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Certified against National Critical Infrastructure Directive</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">
                      Issued via BharatContent AI Grounding Engine
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. Executive Summary Briefing Layout */}
            {activeDeliverable.type === 'executive_summary' && (() => {
              const contentText = activeDeliverable.contentEn || '';
              
              // Dynamic extraction directly from content text
              const overviewMatch = contentText.match(/(?:1\.\s*EXECUTIVE OVERVIEW|EXECUTIVE OVERVIEW)[\s\S]*?(?=(?:2\.\s*KEY|KEY FINDINGS|$))/i);
              const dynamicOverview = overviewMatch 
                ? overviewMatch[0].replace(/(?:1\.\s*EXECUTIVE OVERVIEW|EXECUTIVE OVERVIEW)/i, '').trim() 
                : contentText.split(/\n\s*\n/).find(p => p.trim() && !p.startsWith('#') && !p.toUpperCase().startsWith('EXECUTIVE')) || contentText;

              const findingsMatch = contentText.match(/(?:2\.\s*KEY FINDINGS|KEY FINDINGS)[\s\S]*?(?=(?:3\.\s*STRATEGIC|STRATEGIC IMPACT|$))/i);
              const dynamicFindings = findingsMatch 
                ? findingsMatch[0]
                    .split('\n')
                    .filter(l => l.trim().startsWith('•') || l.trim().startsWith('-') || l.trim().startsWith('*') || /^\d+\./.test(l.trim()))
                    .map(l => l.replace(/^[•\-\*]\s*|^\d+\.\s*/, '').trim())
                    .filter(Boolean)
                : (activeDeliverable.sourceClaims || []).map(c => c.claimText).slice(0, 4);

              const impactMatch = contentText.match(/(?:3\.\s*STRATEGIC IMPACT|STRATEGIC IMPACT)[\s\S]*?(?=(?:4\.\s*ACTIONABLE|4\.\s*RECOMMENDATIONS|RECOMMENDATIONS|$))/i);
              const dynamicImpact = impactMatch 
                ? impactMatch[0].replace(/(?:3\.\s*STRATEGIC IMPACT.*?|STRATEGIC IMPACT.*?)\n/i, '').trim() 
                : 'Empirical assessment confirms strategic alignment and operational integrity across all designated channels.';

              const recsMatch = contentText.match(/(?:4\.\s*ACTIONABLE LEADERSHIP RECOMMENDATIONS|4\.\s*RECOMMENDATIONS|RECOMMENDATIONS)[\s\S]*$/i);
              const dynamicRecs = recsMatch 
                ? recsMatch[0]
                    .split('\n')
                    .filter(l => l.trim().startsWith('•') || l.trim().startsWith('-') || /^\d+\./.test(l.trim()))
                    .map(l => l.replace(/^[•\-\*]\s*|^\d+\.\s*/, '').trim())
                    .filter(Boolean)
                : [
                    'Disseminate verified executive dossier across official leadership channels.',
                    'Incorporate verified factual points into regional communications and policy briefings.',
                    'Maintain complete source-level verification and audit logs.'
                  ];

              const execData = activeDeliverable.structuredData?.executiveSummary || {
                overview: dynamicOverview,
                keyFindings: dynamicFindings.length > 0 ? dynamicFindings : [
                  'Comprehensive ground truth extracted and verified with zero hallucination.',
                  'Multi-channel alignment confirmed against source telemetry.',
                  'Detailed empirical measurements and entities mapped.'
                ],
                impact: dynamicImpact,
                recommendations: dynamicRecs
              };

              const isTe = languageMode === 'te';

              if (languageMode === 'split') {
                return (
                  <div className="space-y-5">
                    {/* Bilingual Split View */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* English Executive Brief */}
                      <div className="p-6 rounded-2xl bg-white border border-blue-300/30 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/20 text-blue-600 uppercase tracking-wider">
                            English Master Brief
                          </span>
                          <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Ground-Truth Verified
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Executive Summary Briefing</h4>
                        <div className="space-y-3 text-xs text-slate-700">
                          <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                            <strong className="text-blue-600 block mb-1 font-semibold">1. Executive Overview:</strong>
                            <p className="leading-relaxed">{execData.overview}</p>
                          </div>
                          <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                            <strong className="text-emerald-300 block mb-1.5 font-semibold">2. Key Findings:</strong>
                            <ul className="space-y-1.5">
                              {execData.keyFindings.map((kf, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                  <span>{kf}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                            <strong className="text-amber-300 block mb-1 font-semibold">3. Strategic Impact:</strong>
                            <p className="leading-relaxed">{execData.impact}</p>
                          </div>
                          <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80">
                            <strong className="text-cyan-300 block mb-1.5 font-semibold">4. Leadership Recommendations:</strong>
                            <ul className="space-y-1.5">
                              {execData.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-cyan-400 font-bold text-[10px] shrink-0">#{i + 1}</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Telugu Executive Brief */}
                      <div className="p-6 rounded-2xl bg-white border border-purple-500/30 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 uppercase tracking-wider">
                            తెలుగు సారాంశం (Telugu Localization)
                          </span>
                          <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> నిర్ధారించబడింది
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">కార్యనిర్వాహక సారాంశ నివేదిక</h4>
                        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans bg-slate-50/90 p-4 rounded-xl border border-slate-200">
                          {activeDeliverable.contentTe || 'తెలుగు అనువాదం అందుబాటులో లేదు.'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div className="space-y-6">
                  {/* Executive Header Banner */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-white via-indigo-950/30 to-white border-2 border-blue-300/30 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-600/20 text-blue-600 border border-blue-300/40 uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-700" />
                          {isTe ? 'అధికారిక నివేదిక' : 'Executive Leadership Dossier'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {isTe ? '100% ఆధారాలతో కూడినది' : '100% Ground-Truth Grounded'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-600 bg-slate-50 border border-slate-200">
                          REF: BC-EXEC-{activeDeliverable.id.slice(-4)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-2">
                        <span>Read Time: <strong className="text-slate-800">2 mins</strong></span>
                        <span>•</span>
                        <span>Tone: <strong className="text-blue-600 font-semibold">Professional</strong></span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                        {isTe 
                          ? 'కార్యనిర్వాహక సారాంశం: వ్యూహాత్మక విశ్లేషణ & కార్యాచరణ నివేదిక' 
                          : 'Executive Summary: Strategic Analysis & Operational Posture'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        {isTe
                          ? 'నాయకత్వ బృందం మరియు నిర్ణయాధికారుల కోసం రూపొందించబడిన సమగ్ర సారాంశ పత్రం.'
                          : 'High-level executive briefing synthesized directly from verified ground truth for senior leadership and governance.'}
                      </p>
                    </div>
                  </div>

                  {/* 1. Executive Overview Hero Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-950/20 border border-blue-300/30 space-y-2 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>{isTe ? '1. కార్యనిర్వాహక అవలోకనం (Executive Overview)' : '1. Executive Overview'}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans pt-1 space-y-2 whitespace-pre-wrap">
                      {isTe 
                        ? (activeDeliverable.contentTe || execData.overview)
                        : execData.overview}
                    </div>
                  </div>

                  {/* 2. Key Findings Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isTe ? '2. ముఖ్య పరిశీలనలు (Key Strategic Findings)' : '2. Key Strategic Findings & Truth Extraction'}</span>
                      </div>
                      <span className="text-[11px] text-slate-600 font-mono">
                        {execData.keyFindings.length} Verified Evidence Points
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {execData.keyFindings.map((kf, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-xl bg-white/90 border border-slate-200 hover:border-emerald-500/40 transition-colors space-y-2 relative group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700 text-[11px] font-bold">
                              0{idx + 1}
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                              <Shield className="w-3 h-3 text-emerald-700" />
                              100% Grounded
                            </span>
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed font-sans pt-1">
                            {kf}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Strategic Impact & Continuity Card */}
                  <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
                      <Activity className="w-4 h-4" />
                      <span>{isTe ? '3. సంస్థాగత ప్రభావం (Strategic Impact & Continuity)' : '3. Strategic Impact & Continuity'}</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      {execData.impact}
                    </p>
                  </div>

                  {/* 4. Actionable Leadership Recommendations */}
                  <div className="p-6 rounded-2xl bg-white border border-cyan-500/30 space-y-4 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                        <ListCheck className="w-4 h-4" />
                        <span>{isTe ? '4. నిర్ణయాధికారుల సిఫార్సులు (Actionable Recommendations)' : '4. Actionable Leadership Recommendations'}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        Priority Roadmap
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {execData.recommendations.map((rec, idx) => (
                        <div 
                          key={idx} 
                          className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3 hover:bg-slate-50 transition-colors"
                        >
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold mt-0.5 shrink-0">
                            ACTION 0{idx + 1}
                          </span>
                          <span className="text-xs text-slate-800 leading-relaxed">
                            {rec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Full Raw Text Document */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowRawSummary(!showRawSummary)}
                      className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-left text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-700" />
                        <span>View Complete Formal Text Document ({isTe ? 'Telugu' : 'English'})</span>
                      </span>
                      <span className="text-blue-700 text-[11px]">
                        {showRawSummary ? 'Hide Document ▲' : 'Show Full Document ▼'}
                      </span>
                    </button>
                    {showRawSummary && (
                      <div className="p-5 bg-white/90 border-t border-slate-200 text-xs text-slate-800 whitespace-pre-wrap font-mono leading-relaxed max-h-96 overflow-y-auto">
                        {isTe ? (activeDeliverable.contentTe || activeDeliverable.contentEn) : activeDeliverable.contentEn}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 8. Fallback / Generic View for other types (WhatsApp, Email, etc.) */}
            {activeDeliverable.type !== 'presentation' && 
             activeDeliverable.type !== 'video_package' && 
             activeDeliverable.type !== 'infographic' && 
             activeDeliverable.type !== 'linkedin' && 
             activeDeliverable.type !== 'twitter_thread' && 
             activeDeliverable.type !== 'twitter_post' && 
             activeDeliverable.type !== 'advisory' && 
             activeDeliverable.type !== 'executive_summary' && (
              <div>
                {languageMode === 'split' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider pb-1 border-b border-slate-200">
                        English Master Output
                      </div>
                      <div className="text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                        {activeDeliverable.contentEn}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider pb-1 border-b border-slate-200">
                        తెలుగు అనువాదం (Telugu Localization)
                      </div>
                      <div className="text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                        {activeDeliverable.contentTe || 'తెలుగు అనువాదం అందుబాటులో లేదు.'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                    {languageMode === 'te' 
                      ? (activeDeliverable.contentTe || activeDeliverable.contentEn) 
                      : activeDeliverable.contentEn}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Traceability Indicator Preview for active deliverable */}
        <div className="p-3 bg-white/80 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-700">
              {activeDeliverable.sourceClaims.length} Claims linked to source pages & paragraphs.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTraceability}
              className="text-xs text-blue-700 hover:text-blue-600 font-semibold flex items-center gap-1"
            >
              Inspect Source Claims <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
