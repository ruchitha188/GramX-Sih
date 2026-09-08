import { KnowledgeDocument, ProjectItem, ReviewComment, VersionHistoryItem } from '../types';

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'kb-1',
    name: 'Cybersecurity_Guidelines_2026.pdf',
    folder: 'Government Guidelines',
    size: '4.1 MB',
    indexedDate: '2026-08-15',
    chunks: 1420,
    status: 'Indexed'
  },
  {
    id: 'kb-2',
    name: 'National_Critical_Infra_Protocol_v3.pdf',
    folder: 'Government Guidelines',
    size: '6.8 MB',
    indexedDate: '2026-08-20',
    chunks: 2150,
    status: 'Indexed'
  },
  {
    id: 'kb-3',
    name: 'Official_Telugu_Digital_Lexicon.xlsx',
    folder: 'Telugu Glossary',
    size: '850 KB',
    indexedDate: '2026-08-22',
    chunks: 480,
    status: 'Indexed'
  },
  {
    id: 'kb-4',
    name: 'Cert_In_Standard_Operating_Procedures.pdf',
    folder: 'Official Terminology',
    size: '3.2 MB',
    indexedDate: '2026-08-25',
    chunks: 980,
    status: 'Indexed'
  },
  {
    id: 'kb-5',
    name: 'Aarogya_Health_Scheme_Policy_Handbook.pdf',
    folder: 'Previous Campaigns',
    size: '5.4 MB',
    indexedDate: '2026-08-29',
    chunks: 1840,
    status: 'Indexed'
  },
  {
    id: 'kb-6',
    name: 'Public_Advisory_Editorial_Standards.pdf',
    folder: 'FAQs',
    size: '1.7 MB',
    indexedDate: '2026-09-01',
    chunks: 620,
    status: 'Indexed'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Cybersecurity Awareness Campaign',
    description: 'National emergency notification and enterprise cyber hygiene transformation across 42 departments.',
    sourceName: 'Cybersecurity_Incident_Report.pdf',
    deliverablesCount: 6,
    updatedAt: '10 mins ago',
    status: 'In Review',
    team: ['Ruchitha (Admin)', 'Siddharth (Editor)', 'Dr. Ananya (Reviewer)']
  },
  {
    id: 'proj-2',
    title: 'Government Health Scheme Rollout',
    description: 'Aarogya Bharathi Phase-2 multi-channel citizen dissemination across 14 rural districts.',
    sourceName: 'Government_Health_Scheme.pdf',
    deliverablesCount: 4,
    updatedAt: '2 days ago',
    status: 'Approved',
    team: ['Ruchitha (Admin)', 'Kavya (Reviewer)']
  },
  {
    id: 'proj-3',
    title: 'University Student Communication',
    description: 'State examination regulatory guidelines, hall tickets, and proctoring advisory transformations.',
    sourceName: 'University_Student_Notice.pdf',
    deliverablesCount: 5,
    updatedAt: '3 days ago',
    status: 'Published',
    team: ['Siddharth (Editor)', 'Rahul (Reviewer)']
  },
  {
    id: 'proj-4',
    title: 'NGO Awareness Campaign',
    description: 'Clean drinking water impact report for donor outreach and village panchayat briefings.',
    sourceName: 'NGO_Awareness_Report.pdf',
    deliverablesCount: 3,
    updatedAt: '5 days ago',
    status: 'Draft',
    team: ['Ruchitha (Admin)', 'Siddharth (Editor)']
  }
];

export const INITIAL_REVIEW_COMMENTS: ReviewComment[] = [
  {
    id: 'rc-1',
    author: 'Dr. Ananya',
    role: 'Reviewer',
    avatar: '👩‍💼',
    text: 'Please ensure we strictly use the organization-approved Telugu terminology for "Cybersecurity" (సైబర్ భద్రత) and "Multi-Factor Authentication" (బహుళ-కారకాల ప్రామాణీకరణ) in the public advisory section.',
    timestamp: '25 mins ago',
    resolved: false
  },
  {
    id: 'rc-2',
    author: 'Ruchitha',
    role: 'Admin',
    avatar: '👩‍💻',
    text: 'Notice the AI verification flagged a 24h vs 48h statutory reporting discrepancy on Slide 4. Let us apply the "Fix using source" action before final signoff.',
    timestamp: '15 mins ago',
    resolved: false
  }
];

export const INITIAL_VERSION_HISTORY: VersionHistoryItem[] = [
  {
    versionNumber: 1,
    label: 'Version 1 — AI Generated',
    modifiedBy: 'GramX Engine',
    timestamp: 'Today, 08:35 IST',
    snippet: 'Initial multi-output generation of 6 deliverables from Cybersecurity_Incident_Report.pdf. AI Fact Preservation score 96%.',
    diffSummary: '6 deliverables generated across Social, Documents, Presentation, and Video Package.'
  },
  {
    versionNumber: 2,
    label: 'Version 2 — Editor Updated',
    modifiedBy: 'Siddharth (Editor)',
    timestamp: 'Today, 08:42 IST',
    snippet: 'Refined LinkedIn intro formatting and verified Telugu translation alignment against Organization Glossary.',
    diffSummary: 'Adjusted tone parameters and highlighted emergency helpline.'
  },
  {
    versionNumber: 3,
    label: 'Version 3 — Reviewer Changes',
    modifiedBy: 'Dr. Ananya (Reviewer)',
    timestamp: 'Today, 08:50 IST',
    snippet: 'Accepted AI verification correction on reporting timeframe: updated from 24h to 48h statutory window.',
    diffSummary: 'Resolved fact verification warning on Slide 4 and Twitter thread.'
  },
  {
    versionNumber: 4,
    label: 'Version 4 — Approved',
    modifiedBy: 'Ruchitha (Admin)',
    timestamp: 'Today, 09:05 IST',
    snippet: 'Final statutory signoff granted. All 6 deliverables authorized for enterprise export and cross-platform publishing.',
    diffSummary: 'Finalized and locked for export (PDF, DOCX, PPTX, SRT).'
  }
];
