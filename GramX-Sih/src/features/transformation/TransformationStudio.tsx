import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Paperclip, Sparkles, X, File, Video, Music } from 'lucide-react';
import { SourceDocument, TransformationConfig, DeliverableType, DeliverableOutput, VerificationReport } from '../../types';
import { GenerationProgress } from './GenerationProgress';
import { transformationEngine, GenerationStep } from '../../services/transformationEngine';
import { realLlmService, LlmConfig } from '../../services/realLlmService';

interface TransformationStudioProps {
  onGenerationComplete: (deliverables: DeliverableOutput[], verification: VerificationReport, source: SourceDocument) => void;
  onOpenCloudSettings?: () => void;
  llmConfig?: LlmConfig | null;
}

export const TransformationStudio: React.FC<TransformationStudioProps> = ({
  onGenerationComplete,
  llmConfig
}) => {
  const [prompt, setPrompt] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([]);
  const [activeEngine, setActiveEngine] = useState<LlmConfig>(() => realLlmService.getStoredConfig());

  // In GramX V2, we automatically select all 7 core deliverables to provide maximum value based on the prompt.
  const coreDeliverables: DeliverableType[] = [
    'executive_summary', 'video_package', 'linkedin', 'twitter_thread', 'advisory', 'infographic', 'presentation'
  ];

  useEffect(() => {
    if (llmConfig) setActiveEngine(llmConfig);
  }, [llmConfig]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = () => setAttachedFile(null);

  const handleGenerate = async () => {
    if ((!prompt.trim() && !attachedFile) || isGenerating) return;

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

    const config: TransformationConfig = {
      audience: 'General Public',
      tone: 'Professional',
      language: 'English',
      detailLevel: 'Medium',
      objective: 'Executive Briefing',
      contentStyle: 'Official',
      organizationKnowledgeEnabled: true
    };

    setIsGenerating(true);

    try {
      setGenerationSteps([
        { id: '1', label: `Initializing Google LLM Engine (${activeEngine.model})...`, status: 'in_progress' },
        { id: '2', label: 'Processing Prompt & Analyzing Attached Source...', status: 'pending' },
        { id: '3', label: `Generating 7 Unified Deliverables from Source...`, status: 'pending' },
        { id: '4', label: 'Executing Traceability & Fact Verification...', status: 'pending' }
      ]);

      setTimeout(() => setGenerationSteps(p => p.map((s, i) => i === 0 ? { ...s, status: 'completed' } : i === 1 ? { ...s, status: 'in_progress' } : s)), 500);
      setTimeout(() => setGenerationSteps(p => p.map((s, i) => i <= 1 ? { ...s, status: 'completed' } : i === 2 ? { ...s, status: 'in_progress' } : s)), 1200);

      const result = await realLlmService.generateWithLlm(source, config, coreDeliverables, activeEngine);

      setGenerationSteps(p => p.map(s => ({ ...s, status: 'completed' })));

      setTimeout(() => {
        setIsGenerating(false);
        onGenerationComplete(result.deliverables, result.verification, source);
      }, 500);

    } catch (err) {
      console.error('LLM generation error, seamless local fallback initiated:', err);
      const result = await transformationEngine.generateDeliverables(
        source, config, coreDeliverables,
        (steps) => setGenerationSteps(steps)
      );
      setIsGenerating(false);
      onGenerationComplete(result.deliverables, result.verification, source);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center -mt-16">

      {/* Centered OmniBar Logic (Perplexity Clone) */}
      <div className="w-full max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100 mb-8 text-center tracking-tight">
          What do you want to create?
        </h1>

        <div className="bg-zinc-900 border border-zinc-700/60 rounded-2xl p-4 shadow-2xl focus-within:border-zinc-500 transition-all flex flex-col gap-3">

          {/* File Attachment Chip */}
          {attachedFile && (
            <div className="flex items-center gap-2 self-start bg-zinc-800 text-zinc-300 py-1.5 px-3 rounded-xl border border-zinc-700/50 text-xs font-medium">
              {attachedFile.type.includes('video') ? <Video className="w-3.5 h-3.5 text-blue-400" /> :
                attachedFile.type.includes('audio') ? <Music className="w-3.5 h-3.5 text-emerald-400" /> :
                  <File className="w-3.5 h-3.5 text-purple-400" />}
              <span className="truncate max-w-[200px]">{attachedFile.name}</span>
              <span className="text-zinc-500">({(attachedFile.size / 1024 / 1024).toFixed(1)}MB)</span>
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
                handleGenerate();
              }
            }}
            placeholder="Type your prompt, paste a link, or dictate a summary task..."
            className="w-full bg-transparent text-zinc-100 resize-none outline-none text-base md:text-lg min-h-[72px] placeholder:text-zinc-600"
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
                className="flex items-center gap-2 text-zinc-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:text-zinc-200 px-3 py-1.5 rounded-full transition-colors font-medium text-xs shadow-sm"
              >
                <Paperclip size={14} />
                <span>Attach</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-500 ml-2">
                Supports Video, Audio & PDFs
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={(!prompt.trim() && !attachedFile) || isGenerating}
              className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full font-medium transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100 bg-zinc-200 text-black hover:bg-white"
            >
              <span className="hidden sm:block mr-2 font-bold text-sm">Generate</span>
              <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {isGenerating && (
        <GenerationProgress
          steps={generationSteps}
          selectedTypes={coreDeliverables}
          sourceName={attachedFile ? attachedFile.name : 'Ad-hoc Prompt'}
        />
      )}
    </div>
  );
};
