import React, { useState } from 'react';
import { 
  X, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck,
  Download,
  Cpu,
  Layers
} from 'lucide-react';

interface QuickDemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStep: (stepNumber: number) => void;
}

interface DemoStep {
  step: number;
  title: string;
  actionDesc: string;
  targetTab: string;
}

const DEMO_STEPS: DemoStep[] = [
  { step: 1, title: 'Login as Ruchitha — Admin', actionDesc: 'Set active profile to Ruchitha (Admin) in the top navbar.', targetTab: 'dashboard' },
  { step: 2, title: 'Open GRAMX Communications', actionDesc: 'Ensure enterprise workspace is active with RAG Knowledge Vault enabled.', targetTab: 'dashboard' },
  { step: 3, title: 'Open Transformation Studio', actionDesc: 'Navigate to Transformation Studio, the hero screen of GramX.', targetTab: 'transform' },
  { step: 4, title: 'Upload Cybersecurity Incident Report.pdf', actionDesc: 'Ingest the primary 8-page 2.8 MB threat mitigation document.', targetTab: 'transform' },
  { step: 5, title: 'Verify AI Extraction', actionDesc: 'Inspect 32 facts, 6 dates, 8 entities, and 4 numerical values detected.', targetTab: 'transform' },
  { step: 6, title: 'Configure Parameters', actionDesc: 'Audience: General Public | Tone: Professional | Language: English + Telugu | Objective: Awareness.', targetTab: 'transform' },
  { step: 7, title: 'Select 6 Deliverables', actionDesc: 'LinkedIn, X Thread, Advisory, Executive Summary, Presentation, Video Package.', targetTab: 'transform' },
  { step: 8, title: 'Click "✨ Generate All Deliverables"', actionDesc: 'Trigger multi-stage AI pipeline with real-time synthesis checkmarks.', targetTab: 'transform' },
  { step: 9, title: 'Inspect Generated Deliverables', actionDesc: 'Review 6 synchronized deliverables linked to one common source.', targetTab: 'deliverables' },
  { step: 10, title: 'Open AI Fact Verification', actionDesc: 'Examine 96% fact preservation score, 31 verified facts, and 1 flagged mismatch.', targetTab: 'verification' },
  { step: 11, title: 'Inspect Source Traceability', actionDesc: 'Click generated claims to highlight exact corresponding source passages.', targetTab: 'traceability' },
  { step: 12, title: 'Submit for Human Review', actionDesc: 'Transition deliverables into collaborative peer review workflow.', targetTab: 'reviews' },
  { step: 13, title: 'Reviewer Feedback Note', actionDesc: 'Inspect comment: "Please use organization-approved Telugu terminology (సైబర్ భద్రత)".', targetTab: 'reviews' },
  { step: 14, title: 'Admin Final Signoff', actionDesc: 'Approve all deliverables with celebration feedback and lock for export.', targetTab: 'reviews' },
  { step: 15, title: 'Export Package', actionDesc: 'Download formatted PDF, DOCX, PPTX slide deck, or SRT subtitle track.', targetTab: 'deliverables' },
];

export const QuickDemoGuideModal: React.FC<QuickDemoGuideModalProps> = ({
  isOpen,
  onClose,
  onJumpToStep
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  const currentStepData = DEMO_STEPS[activeStep - 1];

  const handleNext = () => {
    if (activeStep < DEMO_STEPS.length) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      onJumpToStep(nextStep);
    } else {
      onClose();
    }
  };

  const handleSelectStep = (num: number) => {
    setActiveStep(num);
    onJumpToStep(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xl backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-black border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-zinc-100 shadow-lg shadow-emerald-950/30">
              <Play className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                2-Minute Smart India Hackathon Demo Guide
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-300 font-bold border border-emerald-500/30">
                  SIH26154
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Exact 15-step demonstration sequence tailored for hackathon judges
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Step Highlight Card */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-zinc-300 text-black/20 text-zinc-400 font-bold border border-blue-300/30">
              Step {currentStepData.step} of 15
            </span>
            <span className="text-zinc-400 font-mono text-[11px]">
              Target: {currentStepData.targetTab.toUpperCase()}
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-100">
            {currentStepData.title}
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {currentStepData.actionDesc}
          </p>
        </div>

        {/* Steps Navigator Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-5 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {DEMO_STEPS.map(s => {
            const isCurrent = s.step === activeStep;
            const isDone = s.step < activeStep;
            return (
              <button
                key={s.step}
                onClick={() => handleSelectStep(s.step)}
                className={`p-2 rounded-lg border text-center text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] text-zinc-100 font-bold border-blue-300 ring-2 ring-indigo-400/30'
                    : isDone
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>Step {s.step}</div>
                <span className="text-[9px] block truncate text-zinc-400">
                  {s.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Footer Controls */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => handleSelectStep(Math.max(1, activeStep - 1))}
            disabled={activeStep <= 1}
            className="px-3.5 py-2 text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-40"
          >
            Previous Step
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs text-zinc-400 hover:text-zinc-200"
            >
              Exit Tour
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-zinc-300 to-zinc-500 text-black border border-zinc-200 hover:from-zinc-9000 hover:to-purple-500 text-zinc-100 text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
            >
              <span>{activeStep === DEMO_STEPS.length ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
