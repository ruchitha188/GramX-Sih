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
      <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600/20 text-blue-600 border border-blue-300/40 uppercase tracking-wide">
                Governance Layer
              </span>
              <span className="text-xs text-slate-600">Human-in-the-Loop Signoff</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-blue-700" />
              Human Review & Editorial Pipeline
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Cross-role peer review workflow ensuring organizational compliance and terminology adherence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">Current Role:</span>
            <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-amber-300">
              {currentRole} Access
            </span>
          </div>
        </div>

        {/* Workflow Stepper: Draft -> AI Checked -> Under Review -> Changes Requested -> Approved */}
        <div>
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-4">
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
                      ? 'bg-blue-700/20 border-blue-300 shadow-md ring-1 ring-blue-200'
                      : isPast
                      ? 'bg-white/80 border-slate-200 text-slate-700'
                      : 'bg-white/40 border-slate-200/60 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{step.label}</span>
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    ) : isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-100" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Content & Comments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Deliverable Content Reader (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50/90 border border-slate-200 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Deliverable Under Review:</span>
                <span className="text-blue-700">{activeDeliverable?.title}</span>
              </h3>
              <p className="text-[11px] text-slate-600">
                Audited against Organization Knowledge Vault & Telugu Glossary
              </p>
            </div>

            <select
              value={selectedDeliverableId}
              onChange={(e) => setSelectedDeliverableId(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-300"
            >
              {deliverables.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>

          {/* Reading Box */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Content Preview (Dual-Language Alignment)
            </div>
            <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto p-3 bg-slate-50 rounded-lg border border-slate-200/80 font-sans">
              {activeDeliverable?.contentEn}
            </div>

            {activeDeliverable?.contentTe && (
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto p-3 bg-indigo-950/20 rounded-lg border border-blue-300/20 font-sans">
                <strong className="text-blue-600 block mb-1">తెలుగు రూపాంతరం (Telugu):</strong>
                {activeDeliverable.contentTe}
              </div>
            )}
          </div>

          {/* Action Approval Bar */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              Workflow Status: <strong className="text-slate-900">{workflowStatus}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRequestChanges}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl border border-slate-300 transition-colors"
              >
                Request Changes
              </button>

              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-900 text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 transition-all active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Approve All Deliverables</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Comments Thread (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/90 border border-slate-200 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-700" />
                <h3 className="text-xs font-bold text-slate-900">
                  Reviewer Feedback Thread ({comments.length})
                </h3>
              </div>
              <span className="text-[10px] text-slate-600">Collaborative Review</span>
            </div>

            {/* Existing Comments */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {comments.map(c => (
                <div key={c.id} className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.avatar}</span>
                      <div>
                        <span className="font-bold text-slate-800">{c.author}</span>
                        <span className="text-[10px] text-slate-500 ml-1.5 font-mono">({c.role})</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700 pl-6 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Comment */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add editorial note, Telugu terminology correction, or compliance feedback..."
              className="w-full h-20 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-blue-300 resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Posting as <strong className="text-slate-700">{currentRole}</strong>
              </span>
              <button
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-600 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition-colors"
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
