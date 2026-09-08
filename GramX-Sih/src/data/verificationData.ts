import { VerificationReport } from '../types';

export const INITIAL_VERIFICATION_REPORT: VerificationReport = {
  factPreservationScore: 96,
  totalFacts: 32,
  verifiedCount: 31,
  mismatchCount: 1,
  metrics: {
    factPreservation: 96,
    formatCompliance: 99,
    translationQuality: 98,
    sourceCoverage: 94
  },
  mismatches: [
    {
      id: 'mismatch-1',
      generatedStatement: 'Organizations must report incidents within 24 hours.',
      sourceFile: 'Cybersecurity_Incident_Report.pdf',
      sourcePage: 4,
      sourceStatement: 'Under national cybersecurity directives, organizations are advised to report incidents within 48 hours of detection to the nodal CERT-In response cell.',
      status: 'Potential mismatch',
      suggestedFix: 'Organizations are advised to report incidents within 48 hours.'
    }
  ]
};

export const VERIFIED_FACTS_LIST = [
  {
    id: 'vf-1',
    fact: 'Intrusion telemetry signature detected on 1 September 2026',
    sourcePage: 1,
    sourceParagraph: 1,
    status: 'Verified',
    confidence: '99%'
  },
  {
    id: 'vf-2',
    fact: 'Defensive containment completed in 42 minutes by SOC team',
    sourcePage: 1,
    sourceParagraph: 2,
    status: 'Verified',
    confidence: '99%'
  },
  {
    id: 'vf-3',
    fact: 'Attack vector weaponized spear-phishing with malicious budget macros',
    sourcePage: 2,
    sourceParagraph: 1,
    status: 'Verified',
    confidence: '98%'
  },
  {
    id: 'vf-4',
    fact: 'Zero citizen biometric records or Aadhaar PII exfiltrated or accessed',
    sourcePage: 3,
    sourceParagraph: 2,
    status: 'Verified',
    confidence: '100%'
  },
  {
    id: 'vf-5',
    fact: 'Enforcement of mandatory hardware token MFA for administrative endpoints',
    sourcePage: 5,
    sourceParagraph: 2,
    status: 'Verified',
    confidence: '97%'
  },
  {
    id: 'vf-6',
    fact: 'Security patch v4.8.2 released to fix CVE-2026-38291 SSL VPN vulnerability',
    sourcePage: 6,
    sourceParagraph: 1,
    status: 'Verified',
    confidence: '99%'
  },
  {
    id: 'vf-7',
    fact: 'Citizen-facing government portals remained fully operational 24x7',
    sourcePage: 8,
    sourceParagraph: 3,
    status: 'Verified',
    confidence: '99%'
  }
];
