export type SourceType = 'text' | 'pdf' | 'image' | 'audio' | 'video' | 'prompt';

export interface SourceParagraph {
  id: string;
  page: number;
  paragraph: number;
  text: string;
}

export interface SourceDocument {
  id: string;
  title: string;
  filename: string;
  type: SourceType;
  pages: number;
  size: string;
  uploadedAt: string;
  detectedFacts: {
    total: number;
    dates: number;
    entities: number;
    numericalValues: number;
  };
  contextSummary: string;
  intent: string;
  rawContent: string;
  contextualInfo?: string;
  mediaUrl?: string;
  paragraphs: SourceParagraph[];
}

export type TargetAudience = 
  | 'General Public'
  | 'Students'
  | 'Government Officials'
  | 'Employees'
  | 'Healthcare Workers'
  | 'Technical Audience';

export type ToneType = 
  | 'Formal'
  | 'Professional'
  | 'Simple'
  | 'Conversational'
  | 'Awareness';

export type LanguageType = 
  | 'English'
  | 'Telugu'
  | 'English + Telugu';

export type DetailLevel = 
  | 'Short'
  | 'Medium'
  | 'Detailed';

export type CommunicationObjective = 
  | 'Awareness'
  | 'Inform'
  | 'Educate'
  | 'Persuade'
  | 'Executive Briefing';

export type ContentStyle = 
  | 'Official'
  | 'News-style'
  | 'Social'
  | 'Educational'
  | 'Technical';

export interface TransformationConfig {
  audience: TargetAudience;
  tone: ToneType;
  language: LanguageType;
  detailLevel: DetailLevel;
  objective: CommunicationObjective;
  contentStyle: ContentStyle;
  organizationKnowledgeEnabled: boolean;
  contextualInfo?: string;
}

export type DeliverableType = 
  | 'linkedin'
  | 'twitter_post'
  | 'twitter_thread'
  | 'whatsapp'
  | 'email'
  | 'advisory'
  | 'executive_summary'
  | 'report'
  | 'article'
  | 'infographic'
  | 'presentation'
  | 'video_package';

export type DeliverableCategory = 
  | 'Social / Communication'
  | 'Documents'
  | 'Visual / Presentation'
  | 'Video';

export interface SourceClaimLink {
  claimId: string;
  claimText: string;
  sourcePage: number;
  sourceParagraph: number;
  sourceText: string;
  confidence: number;
  verified: boolean;
  mismatchWarning?: string;
  suggestedFix?: string;
}

export interface StructuredAdvisory {
  title: string;
  summary: string;
  situation: string;
  keyInformation: string[];
  recommendedActions: string[];
  references: string[];
}

export interface StructuredExecutiveSummary {
  overview: string;
  keyFindings: string[];
  impact: string;
  recommendations: string[];
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  bullets: string[];
  speakerNotes: string;
}

export interface StructuredPresentation {
  slideCount: number;
  slides: SlideItem[];
}

export interface StoryboardItem {
  sceneNumber: number;
  visual: string;
  audio: string;
  duration: string;
}

export interface SceneItem {
  sceneNumber: number;
  setting: string;
  visualDescription: string;
  cameraAngle: string;
}

export interface StructuredVideoPackage {
  script: string;
  storyboard: StoryboardItem[];
  scenes: SceneItem[];
  narration: string;
  subtitlesSrt: string;
  visualRecommendations: string[];
}

export interface TweetItem {
  tweetNumber: number;
  text: string;
}

export interface InfographicData {
  title: string;
  subtitle: string;
  keyMessaging: string[];
  layoutRecommendations: {
    recommendedGrid: string;
    aspectRatio: string;
    typographyHierarchy: string;
    colorPalette: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    suggestedIcons: string[];
    visualFlowType: string;
  };
  statistics: Array<{ label: string; value: string; desc: string; iconName?: string }>;
  keyTakeaways: string[];
  visualFlow: string[];
  contentSections: Array<{
    heading: string;
    bulletPoints: string[];
    placement: string;
  }>;
}

export interface DeliverableOutput {
  id: string;
  type: DeliverableType;
  title: string;
  category: DeliverableCategory;
  description: string;
  status: 'Ready' | 'Generating' | 'Failed';
  contentEn: string;
  contentTe?: string;
  structuredData?: {
    advisory?: StructuredAdvisory;
    executiveSummary?: StructuredExecutiveSummary;
    presentation?: StructuredPresentation;
    videoPackage?: StructuredVideoPackage;
    thread?: TweetItem[];
    infographic?: InfographicData;
  };
  sourceClaims: SourceClaimLink[];
  reviewStatus: 'Draft' | 'AI Checked' | 'Under Review' | 'Changes Requested' | 'Approved';
  version: number;
}

export interface FactMismatch {
  id: string;
  generatedStatement: string;
  sourceFile: string;
  sourcePage: number;
  sourceStatement: string;
  status: 'Potential mismatch' | 'Resolved';
  suggestedFix: string;
}

export interface VerificationReport {
  factPreservationScore: number;
  totalFacts: number;
  verifiedCount: number;
  mismatchCount: number;
  metrics: {
    factPreservation: number;
    formatCompliance: number;
    translationQuality: number;
    sourceCoverage: number;
  };
  mismatches: FactMismatch[];
}

export interface ReviewComment {
  id: string;
  author: string;
  role: 'Admin' | 'Editor' | 'Reviewer';
  avatar: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

export interface VersionHistoryItem {
  versionNumber: number;
  label: string;
  modifiedBy: string;
  timestamp: string;
  snippet: string;
  diffSummary?: string;
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  folder: string;
  size: string;
  indexedDate: string;
  chunks: number;
  status: 'Indexed' | 'Processing';
}

export interface GlossaryTerm {
  id: string;
  english: string;
  telugu: string;
  category: string;
  usageNote: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  deliverablesCount: number;
  updatedAt: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Published';
  team: string[];
}

export type UserRole = 'Admin' | 'Editor' | 'Reviewer';
