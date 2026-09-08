import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Film, 
  Copy, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { DeliverableOutput } from '../../types';
import { exportService } from '../../services/exportService';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliverables: DeliverableOutput[];
  sourceName: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  deliverables,
  sourceName
}) => {
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleExportPdf = () => {
    setExportingType('pdf');
    setTimeout(() => {
      exportService.exportToPdf(deliverables, sourceName);
      setExportingType(null);
    }, 400);
  };

  const handleExportDocx = () => {
    setExportingType('docx');
    setTimeout(() => {
      exportService.exportToDocx(deliverables, sourceName);
      setExportingType(null);
    }, 400);
  };

  const handleExportPptx = () => {
    const pres = deliverables.find(d => d.type === 'presentation') || deliverables[0];
    setExportingType('pptx');
    setTimeout(() => {
      exportService.exportToPptx(pres, sourceName);
      setExportingType(null);
    }, 400);
  };

  const handleExportSrt = () => {
    const videoPkg = deliverables.find(d => d.type === 'video_package') || deliverables[0];
    setExportingType('srt');
    setTimeout(() => {
      exportService.exportToSrt(videoPkg);
      setExportingType(null);
    }, 400);
  };

  const handleCopyAll = async () => {
    let combined = `BHARATCONTENT AI TRANSFORMATION ARTIFACTS\nSource: ${sourceName}\n\n`;
    deliverables.forEach(d => {
      combined += `=== ${d.title.toUpperCase()} ===\n${d.contentEn}\n\n`;
      if (d.contentTe) combined += `[TELUGU]\n${d.contentTe}\n\n`;
    });
    const ok = await exportService.copyToClipboard(combined);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-50 border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-950/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Export Deliverables Package
              </h3>
              <p className="text-xs text-slate-600">
                {deliverables.length} communication artefacts ready for dissemination
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Export Formats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* PDF */}
          <div 
            onClick={handleExportPdf}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300/50 hover:bg-white/80 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-700" />
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                  Formatted PDF Package
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">.pdf</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Consolidated printable enterprise report with header banners, fact metadata & timestamps.
            </p>
          </div>

          {/* DOCX */}
          <div 
            onClick={handleExportDocx}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300/50 hover:bg-white/80 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                  Microsoft Word (DOCX)
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">.docx</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Editable word processor document with bilingual English & Telugu sections.
            </p>
          </div>

          {/* PPTX */}
          <div 
            onClick={handleExportPptx}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300/50 hover:bg-white/80 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-amber-700" />
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                  PowerPoint Slide Deck
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">.pptx</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Complete 8 presentation slides with bullets, titles, and speaker notes.
            </p>
          </div>

          {/* SRT Subtitles */}
          <div 
            onClick={handleExportSrt}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300/50 hover:bg-white/80 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                  Subtitles Track (SRT)
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">.srt</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Timecoded broadcast subtitle stream for video post-production & social reels.
            </p>
          </div>
        </div>

        {/* Copy to Clipboard CTA */}
        <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={handleCopyAll}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-700 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Full Bundle!' : 'Copy All Text to Clipboard'}</span>
          </button>

          <button
            onClick={handleExportPdf}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-900 text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download All Deliverables</span>
          </button>
        </div>
      </div>
    </div>
  );
};
