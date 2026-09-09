import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  User, 
  Send, 
  Check, 
  X, 
  AlertCircle, 
  Edit3, 
  ThumbsUp, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DeliverableOutput, ReviewComment, UserRole } from '../../types';
import { INITIAL_REVIEW_COMMENTS } from '../../data/workspaceData';

interface ReviewWorkflowViewProps {
  deliverables: DeliverableOutput[];
  currentRole: UserRole;
  onApproveAll: () => void;
}

type WorkflowStatus = 'Draft' | 'AI Checked' | 'Under Review' | 'Changes Requested' | 'Approved';

export const ReviewWorkflowView: React.FC<ReviewWorkflowViewProps> = ({
  deliverables,
  currentRole,
  onApproveAll
}) => {
  const [selectedDeliverableId, setSelectedDeliverableId] = useState<string>(deliverables[0]?.id || '');
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>('Under Review');
  const [comments, setComments] = useState<ReviewComment[]>(INITIAL_REVIEW_COMMENTS);
  const [newCommentText, setNewCommentText] = useState<string>('');

  const activeDeliverable = deliverables.find(d => d.id === selectedDeliverableId) || deliverables[0];

  const steps: { status: WorkflowStatus; label: string; desc: string }[] = [
    { status: 'Draft', label: 'Draft', desc: 'Raw ingestion' },
    { status: 'AI Checked', label: 'AI Checked', desc: 'Fact audit passed' },
    { status: 'Under Review', label: 'Under Review', desc: 'Domain peer review' },
    { status: 'Changes Requested', label: 'Changes Requested', desc: 'Pending adjustments' },
    { status: 'Approved', label: 'Approved', desc: 'Enterprise signoff' },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === workflowStatus);

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const newComment: ReviewComment = {
      id: `comment-${Date.now()}`,
      author: currentRole === 'Admin' ? 'Ruchitha' : currentRole === 'Editor' ? 'Siddharth' : 'Dr. Ananya',
      role: currentRole,
      avatar: currentRole === 'Admin' ? '👩‍💻' : currentRole === 'Editor' ? '👨‍💻' : '👩‍💼',
      text: newCommentText,
      timestamp: 'Just now',
      resolved: false
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleApprove = () => {
    setWorkflowStatus('Approved');
    onApproveAll();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleRequestChanges = () => {
    setWorkflowStatus('Changes Requested');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none text-white/20 text-neutral-400 border border-neutral-700/50/30 uppercase tracking-wide">
                Governance Layer
              </span>
              <span className="text-xs text-neutral-400">Human-in-the-Loop Signoff</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-50 tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-neutral-300" />
              Human Review & Editorial Pipeline
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Cross-role peer review workflow ensuring organizational compliance and terminology adherence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Current Role:</span>
            <span className="px-3 py-1.5 rounded-xl bg-neutral-950 border-emerald-500/10 border border-white/[0.08] text-xs font-semibold text-amber-300">
              {currentRole} Access
            </span>
          </div>
        </div>

        {/* Workflow Stepper: Draft -> AI Checked -> Under Review -> Changes Requested -> Approved */}
        <div>
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-4">
            Approval Lifecycle Stage
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = step.status === workflowStatus;
              return (
                <div
                  key={step.status}
                  onClick={() => setWorkflowStatus(step.status)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none hover:bg-emerald-400 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]/20 border-teal-300 shadow-md ring-1 ring-teal-200'
                      : isPast
                      ? 'bg-neutral-950/40 backdrop-blur-xl border-white/[0.08] text-neutral-300'
                      : 'bg-neutral-950 border-emerald-500/10/40 border-white/[0.08]/60 text-neutral-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-neutral-200">{step.label}</span>
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-neutral-300 animate-ping" />
                    ) : isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-neutral-950" />
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Content & Comments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Deliverable Content Reader (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-50 flex items-center gap-2">
                <span>Deliverable Under Review:</span>
                <span className="text-neutral-300">{activeDeliverable?.title}</span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Audited against Organization Knowledge Vault & Telugu Glossary
              </p>
            </div>

            <select
              value={selectedDeliverableId}
              onChange={(e) => setSelectedDeliverableId(e.target.value)}
              className="px-2.5 py-1.5 bg-neutral-950 border-emerald-500/10 border border-white/[0.08] rounded-lg text-xs text-neutral-200 focus:outline-none focus:border-teal-300"
            >
              {deliverables.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>

          {/* Reading Box */}
          <div className="p-4 rounded-xl bg-neutral-950 border-emerald-500/10 border border-white/[0.08] space-y-3">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Content Preview (Dual-Language Alignment)
            </div>
            <div className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto p-3 bg-neutral-950 rounded-lg border border-white/[0.08]/80 font-sans">
              {activeDeliverable?.contentEn}
            </div>

            {activeDeliverable?.contentTe && (
              <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto p-3 bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none/20 rounded-lg border border-emerald-500/10 font-sans">
                <strong className="text-neutral-400 block mb-1">తెలుగు రూపాంతరం (Telugu):</strong>
                {activeDeliverable.contentTe}
              </div>
            )}
          </div>

          {/* Action Approval Bar */}
          <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-neutral-400">
              Workflow Status: <strong className="text-neutral-50">{workflowStatus}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRequestChanges}
                className="px-4 py-2 bg-neutral-950 hover:bg-neutral-700 text-amber-300 text-xs font-semibold rounded-xl border border-white/[0.12] transition-colors"
              >
                Request Changes
              </button>

              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-neutral-50 text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 transition-all active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Approve All Deliverables</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Comments Thread (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border-emerald-500/10/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-neutral-300" />
                <h3 className="text-xs font-bold text-neutral-50">
                  Reviewer Feedback Thread ({comments.length})
                </h3>
              </div>
              <span className="text-[10px] text-neutral-400">Collaborative Review</span>
            </div>

            {/* Existing Comments */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {comments.map(c => (
                <div key={c.id} className="p-3 rounded-xl bg-neutral-950 border-emerald-500/10 border border-white/[0.08]/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.avatar}</span>
                      <div>
                        <span className="font-bold text-neutral-200">{c.author}</span>
                        <span className="text-[10px] text-neutral-500 ml-1.5 font-mono">({c.role})</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-500">{c.timestamp}</span>
                  </div>
                  <p className="text-xs text-neutral-300 pl-6 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Comment */}
          <div className="pt-3 border-t border-white/[0.08] space-y-2">
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add editorial note, Telugu terminology correction, or compliance feedback..."
              className="w-full h-20 px-3 py-2 bg-neutral-950 border-emerald-500/10 border border-white/[0.08] rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-teal-300 resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                Posting as <strong className="text-neutral-300">{currentRole}</strong>
              </span>
              <button
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400 border-none hover:bg-emerald-400 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-neutral-700/50 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Post Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
