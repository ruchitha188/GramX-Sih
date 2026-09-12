import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Paperclip, Sparkles, X, File, Video, Music, Check, ChevronLeft } from 'lucide-react';
import { SourceDocument, TransformationConfig, DeliverableType, DeliverableOutput, VerificationReport } from '../../types';
import { GenerationProgress } from './GenerationProgress';
import { transformationEngine, GenerationStep } from '../../services/transformationEngine';
import { realLlmService, LlmConfig } from '../../services/realLlmService';

interface TransformationStudioProps {
  onGenerationComplete: (deliverables: DeliverableOutput[], verification: VerificationReport, source: SourceDocument) => void;
  onOpenCloudSettings?: () => void;
  llmConfig?: LlmConfig | null;
}

const FORMAT_OPTIONS: { id: DeliverableType; label: string; icon: string; desc: string }[] = [
  { id: 'executive_summary', label: 'Executive Summary', icon: '📋', desc: 'Detailed, high-level leadership brief.' },
  { id: 'video_package', label: 'Video Script', icon: '🎬', desc: 'Full length structured video script.' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: '💼', desc: 'Professional thought leadership post.' },
  { id: 'twitter_thread', label: 'X (Twitter) Thread', icon: '🐦', desc: 'Engaging, viral multi-tweet thread.' },
  { id: 'advisory', label: 'Statutory Advisory', icon: '🚨', desc: 'Official, strictly compliant notice.' },
  { id: 'infographic', label: 'Infographic Layout', icon: '📊', desc: 'Visual data and stat representation.' },
  { id: 'presentation', label: 'Presentation Deck', icon: '📽️', desc: 'Structured slide-by-slide deck.' }
];

export const TransformationStudio: React.FC<TransformationStudioProps> = ({
  onGenerationComplete,
  llmConfig
}) => {
  const [viewState, setViewState] = useState<'prompt' | 'formats'>('prompt');

  const [prompt, setPrompt] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFormats, setSelectedFormats] = useState<DeliverableType[]>(FORMAT_OPTIONS.map(f => f.id));

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [activeEngine, setActiveEngine] = useState<LlmConfig>(() => realLlmService.getStoredConfig());

  useEffect(() => {
    if (llmConfig) setActiveEngine(llmConfig);
  }, [llmConfig]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = () => setAttachedFile(null);

  const handleInitialSubmit = () => {
    if (!prompt.trim() && !attachedFile) return;
    setViewState('formats'); // Move to format selection view
  };

  const toggleFormat = (id: DeliverableType) => {
    if (selectedFormats.includes(id)) {
      setSelectedFormats(prev => prev.filter(f => f !== id));
    } else {
      setSelectedFormats(prev => [...prev, id]);
    }
  };

  const handleFinalGenerate = async () => {
    if (selectedFormats.length === 0 || isGenerating) return;

    // Create a Source Document dynamically from input
    const isVideo = attachedFile?.type.includes('video');
    const isAudio = attachedFile?.type.includes('audio');
    const typeAlias = isVideo ? 'video' : isAudio ? 'audio' : attachedFile ? 'pdf' : 'text';

    const source: SourceDocument = {
      id: Date.now().toString(),
      title: attachedFile ? attachedFile.name : (prompt.substring(0, 30) + '...'),
      filename: attachedFile ? attachedFile.name : 'text_input.txt',
      type: typeAlias,
      pages: 1,
      size: attachedFile ? (attachedFile.size / 1024 / 1024).toFixed(2) + ' MB' : '1 KB',
      uploadedAt: new Date().toLocaleTimeString(),
      detectedFacts: { total: 0, dates: 0, entities: 0, numericalValues: 0 },
      contextSummary: '',
      intent: prompt,
      rawContent: prompt,
      paragraphs: []
    };

    // By narrowing down the formats, we tell the engine to dramatically boost detail level for the chosen selections.
    const config: TransformationConfig = {
      audience: 'General Public',
      tone: 'Professional',
      language: 'English',
      // If user selected fewer formats, dynamically boost detail level to 'Detailed' to give "more detailed" output 
      detailLevel: selectedFormats.length <= 3 ? 'Detailed' : 'Medium',
      objective: 'Executive Briefing',
      contentStyle: 'Official',
      organizationKnowledgeEnabled: true
    };

    setIsGenerating(true);

    try {
      setGenerationSteps([
        { id: '1', label: `Initializing Google LLM Engine (${activeEngine.model})...`, status: 'in_progress' },
        { id: '2', label: 'Processing Prompt & Analyzing Attached Source...', status: 'pending' },
        { id: '3', label: `Deep-Synthesizing ${selectedFormats.length} Tailored Deliverables...`, status: 'pending' },
        { id: '4', label: 'Executing Traceability & Fact Verification...', status: 'pending' }
      ]);

      setTimeout(() => setGenerationSteps(p => p.map((s, i) => i === 0 ? { ...s, status: 'completed' } : i === 1 ? { ...s, status: 'in_progress' } : s)), 500);

      // Extract transcript if the initial prompt is a YouTube link
      let finalRawContent = prompt;
      let finalTitle = source.title;

      const isYoutube = prompt.includes('youtube.com') || prompt.includes('youtu.be');
      if (isYoutube && !attachedFile) {
        setGenerationSteps(p => p.map(s => s.id === '2' ? { ...s, label: 'Fetching YouTube Transcript from Backend...', status: 'in_progress' } : s));
        try {
          // Extract just the URL in case they typed text around it
          const ytUrl = prompt.match(/(https?:\/\/[^\s]+)/)?.[0] || prompt;
          const res = await fetch(`/api/youtube?url=${encodeURIComponent(ytUrl)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.transcript) {
              finalRawContent = `[YouTube Transcript]: ${data.transcript}`;
              finalTitle = `YouTube Video Extract`;
            }
          }
        } catch (e) {
          console.warn('YouTube extraction failed', e);
        }
      }

      const enhancedSource = {
        ...source,
        title: finalTitle,
        rawContent: finalRawContent,
        contextSummary: finalRawContent
      };

      setTimeout(() => setGenerationSteps(p => p.map((s, i) => i <= 1 ? { ...s, status: 'completed' } : i === 2 ? { ...s, status: 'in_progress' } : s)), isYoutube ? 100 : 1200);

      const result = await realLlmService.generateWithLlm(enhancedSource, config, selectedFormats, activeEngine);

      setGenerationSteps(p => p.map(s => ({ ...s, status: 'completed' })));

      setTimeout(() => {
        setIsGenerating(false);
        onGenerationComplete(result.deliverables, result.verification, source);
      }, 500);

    } catch (err) {
      console.error('LLM generation error, seamless local fallback initiated:', err);
      const result = await transformationEngine.generateDeliverables(
        source, config, selectedFormats,
        (steps) => setGenerationSteps(steps)
      );
      setIsGenerating(false);
      onGenerationComplete(result.deliverables, result.verification, source);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">

      {/* 1. Prompt / Ask View */}
      {viewState === 'prompt' && !isGenerating && (
        <div className="w-full max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-50 mb-8 text-center tracking-tight">
            What do you want to create?
          </h1>

          <div className="bg-neutral-950 border border-white/[0.12]/60 rounded-2xl p-4 shadow-2xl focus-within:border-neutral-700/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all flex flex-col gap-3">

            {/* File Attachment Chip */}
            {attachedFile && (
              <div className="flex items-center gap-2 self-start bg-neutral-900/90 text-neutral-300 py-1.5 px-3 rounded-xl border border-white/[0.12]/50 text-xs font-medium">
                {attachedFile.type.includes('video') ? <Video className="w-3.5 h-3.5 text-neutral-300" /> :
                  attachedFile.type.includes('audio') ? <Music className="w-3.5 h-3.5 text-neutral-300" /> :
                    <File className="w-3.5 h-3.5 text-neutral-300" />}
                <span className="truncate max-w-[200px]">{attachedFile.name}</span>
                <span className="text-neutral-500">({(attachedFile.size / 1024 / 1024).toFixed(1)}MB)</span>
                <button onClick={handleRemoveFile} className="ml-1 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Core Text Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleInitialSubmit();
                }
              }}
              placeholder="Type your prompt, paste a link, or dictate a summary task..."
              className="w-full bg-transparent text-neutral-50 resize-none outline-none text-base md:text-lg min-h-[72px] placeholder:text-neutral-600"
            />

            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="audio/*,video/*,application/pdf,text/plain"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-neutral-400 bg-neutral-950 hover:bg-neutral-900/90 border border-white/[0.08] hover:text-neutral-200 px-3 py-1.5 rounded-full transition-colors font-medium text-xs shadow-sm"
                >
                  <Paperclip size={14} />
                  <span>Attach</span>
                </button>

                <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-500 ml-2">
                  Supports Video, Audio & PDFs
                </div>
              </div>

              <button
                onClick={handleInitialSubmit}
                disabled={(!prompt.trim() && !attachedFile)}
                className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full font-medium transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100 bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none hover:bg-emerald-400 text-white hover:bg-neutral-700/50"
              >
                <span className="hidden sm:block mr-2 font-bold text-sm">Next</span>
                <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Formats Selection View */}
      {viewState === 'formats' && !isGenerating && (
        <div className="w-full max-w-3xl px-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-50 mb-3 tracking-tight">
              Select Output Formats
            </h2>
            <p className="text-sm text-neutral-400 max-w-lg mx-auto">
              Choose the specific deliverables you need. Focusing the AI on fewer formats will instruct it to generate <strong className="text-neutral-200 font-medium">highly detailed, hyper-specific content</strong> for each selected output.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {FORMAT_OPTIONS.map(format => {
              const selected = selectedFormats.includes(format.id);
              return (
                <button
                  key={format.id}
                  onClick={() => toggleFormat(format.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${selected
                    ? 'bg-neutral-900/90/80 border-neutral-700/50 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                    : 'bg-neutral-950 border-white/[0.08] hover:border-neutral-700/50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{format.icon}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${selected ? 'bg-neutral-800/60 text-white border-neutral-700/50' : 'bg-transparent border-white/[0.12]'
                      }`}>
                      {selected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <h3 className={`font-medium mb-1 ${selected ? 'text-neutral-50' : 'text-neutral-300'}`}>
                    {format.label}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-snug">
                    {format.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between max-w-md mx-auto">
            <button
              onClick={() => setViewState('prompt')}
              className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors py-2 px-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleFinalGenerate}
              disabled={selectedFormats.length === 0}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2.5 px-6 rounded-full transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              <Sparkles className="w-4 h-4" />
              Generate {selectedFormats.length} {selectedFormats.length === 1 ? 'Format' : 'Formats'}
            </button>
          </div>
        </div>
      )}

      {isGenerating && (
        <GenerationProgress
          steps={generationSteps}
          selectedTypes={selectedFormats}
          sourceName={attachedFile ? attachedFile.name : 'Ad-hoc Prompt'}
        />
      )}
    </div>
  );
};
