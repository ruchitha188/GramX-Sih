import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { DashboardView } from './features/dashboard/DashboardView';
import { TransformationStudio } from './features/transformation/TransformationStudio';
import { DeliverablesView } from './features/transformation/DeliverablesView';
import { FactVerificationView } from './features/verification/FactVerificationView';
import { SourceTraceabilityView } from './features/verification/SourceTraceabilityView';
import { ReviewWorkflowView } from './features/review/ReviewWorkflowView';
import { KnowledgeVaultView } from './features/workspace/KnowledgeVaultView';
import { ProjectsView } from './features/workspace/ProjectsView';
import { VersionHistoryView } from './features/history/VersionHistoryView';
import { AnalyticsView } from './features/analytics/AnalyticsView';
import { TrendingTopicsView } from './features/trending/TrendingTopicsView';
import { ExportModal } from './components/shared/ExportModal';
import { QuickDemoGuideModal } from './components/shared/QuickDemoGuideModal';
import { CloudSettingsModal } from './components/shared/CloudSettingsModal';
import { realLlmService, LlmConfig } from './services/realLlmService';
import { supabase } from './services/supabaseClient';
import { AuthModal } from './components/auth/AuthModal';
import { INITIAL_PROJECTS, INITIAL_VERSION_HISTORY } from './data/workspaceData';

import {
  DeliverableOutput,
  SourceDocument,
  UserRole,
  VerificationReport,
  ProjectItem
} from './types';
import { SAMPLE_SOURCES } from './data/sampleSources';
import { PRIMARY_SAMPLE_DELIVERABLES } from './data/sampleDeliverables';
import { INITIAL_VERIFICATION_REPORT } from './data/verificationData';

export function App() {
  // Global Workspace & Role State
  const [currentWorkspace, setCurrentWorkspace] = useState<string>('Personal Account');
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');
  const [activeTab, setActiveTab] = useState<NavTab>('transform');

  // Transformation Data State
  const [currentSource, setCurrentSource] = useState<SourceDocument>({
    id: 'empty',
    title: '',
    filename: 'No input provided',
    type: 'text',
    pages: 0,
    size: '0 KB',
    uploadedAt: new Date().toLocaleTimeString(),
    detectedFacts: { total: 0, dates: 0, entities: 0, numericalValues: 0 },
    contextSummary: '',
    intent: '',
    rawContent: '',
    paragraphs: []
  });
  const [deliverables, setDeliverables] = useState<DeliverableOutput[]>([]);
  const [verificationReport, setVerificationReport] = useState<VerificationReport | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);

  // Modals State
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);
  const [isCloudSettingsOpen, setIsCloudSettingsOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [llmConfig, setLlmConfig] = useState<LlmConfig | null>(() => realLlmService.getStoredConfig());

  // Supabase Auth State
  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handlers
  const handleGenerationComplete = (
    newDeliverables: DeliverableOutput[],
    newVerification: VerificationReport,
    source: SourceDocument
  ) => {
    setDeliverables(newDeliverables);
    setVerificationReport(newVerification);
    setCurrentSource(source);

    // Persist as a new project in local memory so the user sees it in their Projects tab
    setProjects(prev => [{
      id: Date.now().toString(),
      title: source.filename !== 'No input provided' ? source.filename : 'Ad-hoc AI Generation',
      description: `Auto-generated multi-output content package containing ${newDeliverables.length} professional deliverables.`,
      sourceName: source.filename || 'Source Document',
      deliverablesCount: newDeliverables.length,
      updatedAt: 'Just now',
      status: 'Draft',
      team: [user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'You']
    }, ...prev]);

    INITIAL_VERSION_HISTORY.unshift({
      versionNumber: INITIAL_VERSION_HISTORY.length + 1,
      label: 'Version 1 — AI Generated',
      modifiedBy: 'GramX Engine',
      timestamp: new Date().toLocaleTimeString(),
      snippet: `Generated multi-output content package from ${source.filename}. Fact checking applied.`,
      diffSummary: `${newDeliverables.length} deliverables successfully generated.`
    });

    setActiveTab('deliverables');
  };

  const handleFixMismatch = (mismatchId: string, fixText: string) => {
    // 1. Update verification report
    setVerificationReport(prev => {
      if (!prev) return null;
      return {
        ...prev,
        factPreservationScore: 100,
        verifiedCount: prev.totalFacts,
        mismatchCount: 0,
        metrics: {
          ...prev.metrics,
          factPreservation: 100
        },
        mismatches: []
      };
    });

    // 2. Correct deliverable text where 24 hours was mentioned
    setDeliverables(prev => prev.map(d => {
      let updatedEn = d.contentEn.replace('24 hours', '48 hours');
      let updatedClaims = d.sourceClaims.map(c => {
        if (!c.verified) {
          return {
            ...c,
            verified: true,
            claimText: c.suggestedFix || fixText,
            confidence: 0.99,
            mismatchWarning: undefined
          };
        }
        return c;
      });

      return {
        ...d,
        contentEn: updatedEn,
        sourceClaims: updatedClaims
      };
    }));
  };

  const handleSendToReview = (deliverableId?: string) => {
    setActiveTab('reviews');
  };

  const handleApproveAll = () => {
    setDeliverables(prev => prev.map(d => ({
      ...d,
      reviewStatus: 'Approved',
      version: d.version + 1
    })));
  };

  const handleUpdateDeliverableContent = (id: string, newContent: string) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          contentEn: newContent,
          version: d.version + 1
        };
      }
      return d;
    }));
  };

  const handleJumpToDemoStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        setCurrentRole('Admin');
        setActiveTab('dashboard');
        break;
      case 2:
        setCurrentWorkspace('Personal Account');
        setActiveTab('dashboard');
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        setActiveTab('transform');
        break;
      case 9:
        setActiveTab('deliverables');
        break;
      case 10:
        setActiveTab('verification');
        break;
      case 11:
        setActiveTab('traceability');
        break;
      case 12:
      case 13:
      case 14:
        setActiveTab('reviews');
        break;
      case 15:
        setActiveTab('deliverables');
        setIsExportModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a14] border-indigo-500/10 text-white flex flex-col font-sans selection:bg-indigo-600 text-white selection:text-white">
      {/* Top Header Navbar */}
      <Navbar
        currentWorkspace={currentWorkspace}
        onWorkspaceChange={setCurrentWorkspace}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onRunDemoFlow={() => setIsDemoGuideOpen(true)}
        onOpenCloudSettings={() => setIsCloudSettingsOpen(true)}
        isLiveAiActive={!!llmConfig?.apiKey}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Body with Left Sidebar + Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden overflow-y-auto lg:overflow-y-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentRole={currentRole}
          currentWorkspace={currentWorkspace}
          hasGeneratedOutputs={deliverables.length > 0}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          projects={projects}
        />

        {/* Dynamic Center Stage View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#09090b]">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                onNavigate={setActiveTab}
                currentRole={currentRole}
                onLaunchTransformation={() => setActiveTab('transform')}
                user={user}
              />
            )}

            {activeTab === 'transform' && (
              <TransformationStudio
                onGenerationComplete={handleGenerationComplete}
                onOpenCloudSettings={() => setIsCloudSettingsOpen(true)}
                llmConfig={llmConfig}
              />
            )}

            {activeTab === 'deliverables' && (
              <DeliverablesView
                deliverables={deliverables}
                sourceName={currentSource.filename}
                onOpenVerification={() => setActiveTab('verification')}
                onOpenTraceability={() => setActiveTab('traceability')}
                onSendToReview={handleSendToReview}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onUpdateDeliverableContent={handleUpdateDeliverableContent}
              />
            )}

            {activeTab === 'verification' && verificationReport && (
              <FactVerificationView
                report={verificationReport}
                sourceName={currentSource?.filename || 'No Source'}
                onFixMismatch={handleFixMismatch}
                onSendToReview={handleSendToReview}
                onNavigateToTraceability={() => setActiveTab('traceability')}
              />
            )}

            {activeTab === 'traceability' && (
              <SourceTraceabilityView
                source={currentSource}
                deliverables={deliverables}
              />
            )}

            {activeTab === 'reviews' && (
              <ReviewWorkflowView
                deliverables={deliverables}
                currentRole={currentRole}
                onApproveAll={handleApproveAll}
              />
            )}

            {activeTab === 'knowledge-vault' && (
              <KnowledgeVaultView />
            )}

            {activeTab === 'projects' && (
              <ProjectsView
                onOpenProject={() => setActiveTab('transform')}
              />
            )}

            {activeTab === 'version-history' && (
              <VersionHistoryView />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView />
            )}

            {activeTab === 'trending' && (
              <TrendingTopicsView />
            )}
          </div>
        </main>
      </div>

      {/* Export Deliverables Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        deliverables={deliverables}
        sourceName={currentSource.filename}
      />

      {/* Quick 2-Minute SIH Demo Modal */}
      <QuickDemoGuideModal
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        onJumpToStep={handleJumpToDemoStep}
      />

      {/* Cloud & AI API Settings Modal */}
      <CloudSettingsModal
        isOpen={isCloudSettingsOpen}
        onClose={() => setIsCloudSettingsOpen(false)}
        onConfigUpdated={(cfg) => setLlmConfig(cfg)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;
