import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  Cpu, 
  Lock,
  Eye,
  EyeOff,
  Server
} from 'lucide-react';
import { realLlmService, LlmConfig } from '../../services/realLlmService';

interface CloudSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated?: (config: LlmConfig | null) => void;
}

export const CloudSettingsModal: React.FC<CloudSettingsModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated
}) => {
  const [activeModel, setActiveModel] = useState<string>('gemini-flash-latest');
  const [googleKey, setGoogleKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [onDeviceAvailable, setOnDeviceAvailable] = useState<boolean>(false);

  // Supabase / Database state
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState<string>('');
  const [showSupabaseKey, setShowSupabaseKey] = useState<boolean>(false);

  // Test status
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; detectedModel?: string } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const stored = realLlmService.getStoredConfig();
      setActiveModel(stored.model || 'gemini-flash-latest');
      setGoogleKey(stored.apiKey);

      realLlmService.checkOnDeviceAvailability().then(available => {
        setOnDeviceAvailable(available);
      });

      // Check stored Supabase configs
      const storedSupabaseUrl = localStorage.getItem('bharatcontent_supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
      const storedSupabaseKey = localStorage.getItem('bharatcontent_supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      setSupabaseUrl(storedSupabaseUrl);
      setSupabaseAnonKey(storedSupabaseKey);
      setTestResult(null);
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    const result = await realLlmService.testConnection({
      provider: 'gemini',
      apiKey: googleKey,
      model: activeModel
    });

    setIsTesting(false);
    setTestResult(result);
    if (result.detectedModel) {
      setActiveModel(result.detectedModel);
    }
  };

  const handleSave = () => {
    const config: LlmConfig = {
      provider: 'gemini',
      apiKey: googleKey.trim() || realLlmService.getStoredConfig().apiKey,
      model: activeModel
    };
    realLlmService.saveConfig(config);
    onConfigUpdated?.(config);

    if (supabaseUrl.trim()) {
      localStorage.setItem('bharatcontent_supabase_url', supabaseUrl.trim());
    } else {
      localStorage.removeItem('bharatcontent_supabase_url');
    }

    if (supabaseAnonKey.trim()) {
      localStorage.setItem('bharatcontent_supabase_anon_key', supabaseAnonKey.trim());
    } else {
      localStorage.removeItem('bharatcontent_supabase_anon_key');
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  const handleClear = () => {
    realLlmService.clearConfig();
    localStorage.removeItem('bharatcontent_supabase_url');
    localStorage.removeItem('bharatcontent_supabase_anon_key');
    const defaultConfig = realLlmService.getStoredConfig();
    setActiveModel(defaultConfig.model || 'gemini-flash-latest');
    setGoogleKey(defaultConfig.apiKey);
    setSupabaseUrl('');
    setSupabaseAnonKey('');
    setTestResult(null);
    onConfigUpdated?.(defaultConfig);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090b]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#09090b] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0c0a14] border-indigo-500/10/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-9000 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-slate-50">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-50 flex items-center gap-2">
                Google LLM Native Core
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-500/30 flex items-center gap-1 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active ({activeModel})
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Autonomous transformation brain powered exclusively by Google Generative AI & Gemma.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-50 hover:bg-[#12101c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Section 1: Google LLM Model Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-300" />
                Google LLM Engine & Model
              </label>
              <span className="text-[11px] text-emerald-700 font-medium">Official Google SDK Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'gemini-flash-latest', name: 'Gemini Flash', desc: 'Recommended • Sub-second latency, structured JSON mode & 1M context', badge: 'Default' },
                { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', desc: 'Deep synthesis • Highest factual grounding & complex reasoning', badge: 'High Reasoning' },
                { id: 'gemini-2.5-flash-lite', name: 'Gemini Lite', desc: 'Lightweight • Instant streaming & resource efficient', badge: 'Fast' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { setActiveModel(m.id); setTestResult(null); }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activeModel === m.id
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] border-none shadow-[0_0_15px_rgba(255,255,255,0.15)]/15 border-blue-300 text-slate-50 ring-1 ring-indigo-500/50'
                      : 'bg-[#0c0a14] border-indigo-500/10/60 border-white/[0.08] text-slate-400 hover:border-white/[0.12] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-slate-200">{m.name}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      activeModel === m.id ? 'bg-emerald-100 text-emerald-300' : 'bg-[#12101c] text-slate-400'
                    }`}>
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{m.desc}</p>
                </button>
              ))}
            </div>

            {/* On-Device Gemini Nano Status Card */}
            <div className="p-3 bg-[#12101c]/40 backdrop-blur-xl rounded-xl border border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <div>
                  <span className="text-xs font-semibold text-slate-200">Chrome On-Device AI (Gemini Nano):</span>
                  <span className="text-xs text-slate-400 ml-1.5">
                    {onDeviceAvailable ? 'Available for offline zero-latency inference' : 'Cloud accelerated mode active'}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                onDeviceAvailable ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30' : 'bg-[#12101c] text-slate-400'
              }`}>
                {onDeviceAvailable ? 'Ready' : 'Cloud Core'}
              </span>
            </div>

            {/* Google LLM Key Input (Pre-configured) */}
            <div className="bg-[#12101c]/40 backdrop-blur-xl p-4 rounded-xl border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-slate-300" />
                  Google LLM Core Key
                </label>
                <span className="text-[11px] text-emerald-700 font-medium">✓ Pre-configured for GramX</span>
              </div>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={googleKey}
                  onChange={(e) => setGoogleKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-3 pr-10 py-2.5 bg-[#09090b] border border-white/[0.08] rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-zinc-500">
                Embedded directly into the application environment. Operators do not need to configure external APIs.
              </p>
            </div>

            {/* Test Connection Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-3.5 py-2 rounded-lg bg-[#12101c] hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-slate-200 flex items-center gap-2 transition-colors border border-white/[0.12]"
              >
                {isTesting ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-300" />
                ) : (
                  <Server className="w-3.5 h-3.5 text-slate-300" />
                )}
                <span>Test Google LLM Engine</span>
              </button>

              {testResult && (
                <div className={`text-xs flex items-center gap-1.5 ${testResult.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>
          </div>


          <hr className="border-white/[0.08]" />

          {/* Section 2: Supabase / PostgreSQL Database Connection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-700" />
                2. Supabase PostgreSQL & pgvector (Optional)
              </label>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-300 flex items-center gap-1 underline decoration-emerald-500/50"
              >
                Free Supabase Account
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Enables persistent team storage for multi-user review workflows, Knowledge Vault RAG embeddings, and audit history.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#12101c]/40 backdrop-blur-xl p-3.5 rounded-xl border border-white/[0.08] space-y-1.5">
                <label className="text-[11px] font-medium text-slate-400">Project URL</label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full px-3 py-2 bg-[#09090b] border border-white/[0.08] rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="bg-[#12101c]/40 backdrop-blur-xl p-3.5 rounded-xl border border-white/[0.08] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-slate-400">Anon / Public API Key</label>
                  <button
                    type="button"
                    onClick={() => setShowSupabaseKey(!showSupabaseKey)}
                    className="text-slate-400 hover:text-slate-200 text-[11px]"
                  >
                    {showSupabaseKey ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showSupabaseKey ? 'text' : 'password'}
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  className="w-full px-3 py-2 bg-[#09090b] border border-white/[0.08] rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#12101c]/40 backdrop-blur-xl flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Reset to Default Google LLM Core
          </button>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Settings Saved!
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-slate-50 bg-[#12101c] hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-semibold text-slate-50 bg-gradient-to-r from-indigo-400 to-violet-400 text-black border border-zinc-200 hover:from-zinc-9000 hover:to-purple-500 rounded-lg shadow-lg shadow-indigo-600/30 transition-all"
            >
              Save & Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
