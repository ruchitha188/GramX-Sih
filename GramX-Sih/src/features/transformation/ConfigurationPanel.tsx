import React, { useState } from 'react';
import { 
  Users, 
  Smile, 
  Languages, 
  Sliders, 
  Target, 
  Palette, 
  ChevronDown,
  ChevronUp,
  Settings2
} from 'lucide-react';
import { 
  TransformationConfig, 
  TargetAudience, 
  ToneType, 
  LanguageType, 
  DetailLevel, 
  CommunicationObjective, 
  ContentStyle 
} from '../../types';

interface ConfigurationPanelProps {
  config: TransformationConfig;
  onChange: (config: TransformationConfig) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  config,
  onChange
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const updateField = <K extends keyof TransformationConfig>(
    key: K, 
    value: TransformationConfig[K]
  ) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  const audiences: TargetAudience[] = [
    'General Public',
    'Students',
    'Government Officials',
    'Employees',
    'Healthcare Workers',
    'Technical Audience'
  ];

  const tones: ToneType[] = [
    'Professional',
    'Formal',
    'Simple',
    'Conversational',
    'Awareness'
  ];

  const languages: LanguageType[] = [
    'English + Telugu',
    'English',
    'Telugu'
  ];

  const detailLevels: DetailLevel[] = [
    'Medium',
    'Short',
    'Detailed'
  ];

  const objectives: CommunicationObjective[] = [
    'Awareness',
    'Inform',
    'Educate',
    'Persuade',
    'Executive Briefing'
  ];

  const contentStyles: ContentStyle[] = [
    'Official',
    'News-style',
    'Social',
    'Educational',
    'Technical'
  ];

  return (
    <div className="bg-zinc-950/70 backdrop-blur-3xl border border-zinc-800 rounded-2xl p-4 lg:p-5 shadow-2xl shadow-black/80 transition-all">
      {/* Header / Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-300 text-black/20 text-zinc-300 text-xs font-bold border border-blue-300/30">
            2
          </span>
          <div>
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              Audience & Language Settings
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-medium">{config.audience}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-300 text-black/20 text-zinc-400 font-medium">{config.language}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-medium">{config.tone} Tone</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-zinc-100 transition-colors self-start sm:self-auto"
        >
          <Settings2 className="w-3.5 h-3.5 text-zinc-300" />
          <span>{isExpanded ? 'Hide Options' : 'Customize Options'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Full Settings */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4 mt-4 border-t border-zinc-800 animate-in fade-in duration-150">
          {/* 1. Target Audience */}
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80 space-y-1">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-zinc-300" />
              Target Audience
            </label>
            <select
              value={config.audience}
              onChange={(e) => updateField('audience', e.target.value as TargetAudience)}
              className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-blue-300"
            >
              {audiences.map((aud) => (
                <option key={aud} value={aud}>{aud}</option>
              ))}
            </select>
          </div>

          {/* 2. Language / Localization */}
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80 space-y-1">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              Language / Localization
            </label>
            <select
              value={config.language}
              onChange={(e) => updateField('language', e.target.value as LanguageType)}
              className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* 3. Tone */}
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80 space-y-1">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-purple-700" />
              Tone
            </label>
            <select
              value={config.tone}
              onChange={(e) => updateField('tone', e.target.value as ToneType)}
              className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </div>

          {/* 4. Level of Detail */}
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80 space-y-1">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-700" />
              Level of Detail
            </label>
            <select
              value={config.detailLevel}
              onChange={(e) => updateField('detailLevel', e.target.value as DetailLevel)}
              className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              {detailLevels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          {/* 5. Communication Objective */}
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80 space-y-1">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-rose-700" />
              Objective
            </label>
            <select
              value={config.objective}
              onChange={(e) => updateField('objective', e.target.value as CommunicationObjective)}
              className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
            >
              {objectives.map((obj) => (
                <option key={obj} value={obj}>{obj}</option>
              ))}
            </select>
          </div>

          {/* 6. Content Style */}
          <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80 space-y-1">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-sky-700" />
              Content Style
            </label>
            <select
              value={config.contentStyle}
              onChange={(e) => updateField('contentStyle', e.target.value as ContentStyle)}
              className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-sky-500"
            >
              {contentStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
