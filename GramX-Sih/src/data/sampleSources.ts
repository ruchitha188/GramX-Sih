import { SourceDocument } from '../types';

export const SAMPLE_SOURCES: SourceDocument[] = [
  {
    id: 'cybersecurity-report-2026',
    title: 'Cybersecurity Incident Report — CERT-In Alert & Mitigation Mandate',
    filename: 'Cybersecurity_Incident_Report.pdf',
    type: 'pdf',
    pages: 8,
    size: '2.8 MB',
    uploadedAt: '2026-09-05 08:30 IST',
    detectedFacts: {
      total: 32,
      dates: 6,
      entities: 8,
      numericalValues: 4,
    },
    contextSummary: 'Technical incident investigation and national mitigation advisory following an intrusion attempt on state critical infrastructure perimeter gateways.',
    intent: 'Issue emergency remediation guidelines, clarify citizen data protection status, and enforce strict reporting timelines.',
    rawContent: `NATIONAL CYBERSECURITY INCIDENT ADVISORY — REF: CERT-IN/ADV-2026-0894
Date of Release: September 3, 2026 | Severity: High | Target: Critical Infrastructure & Public Sector Networks

EXECUTIVE SUMMARY:
On 1 September 2026, the Computer Emergency Response Team (CERT-In) detected an coordinated intrusion telemetry signature against public-facing VPN edge routers. Prompt containment prevented access to core state databases. No citizen biometric records or PII were compromised.

CRITICAL TIMELINES & COMPLIANCE:
All public sector digital platforms and enterprise networks are required to audit network perimeter logs immediately. Organizations are advised to report incidents within 48 hours to the national cyber coordination center.

REMEDIATION PROTOCOL:
1. Enforce Multi-Factor Authentication (MFA) on all remote administrative endpoints.
2. Isolate compromised edge routing firmware and flash hotfix patch v4.8.2.
3. Reset domain controller Kerberos ticket granting keys.
4. Notify partner financial switches and inter-departmental API gateways.`,
    paragraphs: [
      {
        id: 'p-1',
        page: 1,
        paragraph: 1,
        text: 'On 1 September 2026, national threat telemetry identified an advanced targeted intrusion attempt on perimeter edge gateways of government administrative networks.'
      },
      {
        id: 'p-2',
        page: 1,
        paragraph: 2,
        text: 'The defensive containment operations were executed within 42 minutes of alert generation by the Security Operations Center (SOC).'
      },
      {
        id: 'p-3',
        page: 2,
        paragraph: 1,
        text: 'Forensic inspection revealed threat actors utilized weaponized spear-phishing emails containing malicious macros disguised as administrative budget revisions.'
      },
      {
        id: 'p-4',
        page: 3,
        paragraph: 2,
        text: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.'
      },
      {
        id: 'p-5',
        page: 4,
        paragraph: 1,
        text: 'Under national cybersecurity directives, organizations are advised to report incidents within 48 hours of detection to the nodal CERT-In response cell.'
      },
      {
        id: 'p-6',
        page: 5,
        paragraph: 2,
        text: 'All system administrators must enforce mandatory FIDO2 hardware token multi-factor authentication for remote access across enterprise gateways.'
      },
      {
        id: 'p-7',
        page: 6,
        paragraph: 1,
        text: 'Immediate patch firmware update version 4.8.2 has been released to address CVE-2026-38291 affecting SSL VPN gateways.'
      },
      {
        id: 'p-8',
        page: 8,
        paragraph: 3,
        text: 'Public grievance portals and citizen-facing digital services remain completely secure, operational, and monitored 24x7 by AI telemetry.'
      }
    ]
  },
  {
    id: 'health-scheme-2026',
    title: 'Aarogya Bharathi Universal Health Insurance Scheme — Phase 2 Guidelines',
    filename: 'Government_Health_Scheme.pdf',
    type: 'pdf',
    pages: 5,
    size: '1.4 MB',
    uploadedAt: '2026-09-02 11:15 IST',
    detectedFacts: {
      total: 24,
      dates: 4,
      entities: 6,
      numericalValues: 8,
    },
    contextSummary: 'Comprehensive healthcare coverage expansion covering 4.2 crore families with cashless hospitalization up to ₹10 Lakhs per annum.',
    intent: 'Inform rural and semi-urban citizens regarding enrollment criteria, empanelled hospitals, and biometric card issuance.',
    rawContent: `MINISTRY OF HEALTH & FAMILY WELFARE — AAROGYA BHARATHI 2026
Phase 2 Expansion covers tertiary and secondary treatment across 2,400 empanelled hospitals with ₹10,00,000 annual family coverage.
Registration is 100% cashless and paperless via Gram Panchayat service centers.`,
    paragraphs: [
      {
        id: 'h-1',
        page: 1,
        paragraph: 1,
        text: 'The Aarogya Bharathi Universal Health Scheme extends cashless health coverage of up to ₹10 Lakhs per family annually.'
      },
      {
        id: 'h-2',
        page: 2,
        paragraph: 2,
        text: 'Citizens can enroll at local Gram Panchayat digital service centers using Aadhaar and ration cards without fee.'
      }
    ]
  },
  {
    id: 'student-notice-2026',
    title: 'State Technical University — Semester Examination & Digital ID Mandate',
    filename: 'University_Student_Notice.pdf',
    type: 'pdf',
    pages: 3,
    size: '850 KB',
    uploadedAt: '2026-09-01 14:00 IST',
    detectedFacts: {
      total: 16,
      dates: 3,
      entities: 5,
      numericalValues: 3,
    },
    contextSummary: 'Academic council notification regarding digital hall ticket issuance and biometric verification for upcoming semester finals.',
    intent: 'Educate students on examination timetable, prohibited devices, and reporting procedures.',
    rawContent: `EXAMINATION REGULATORY BOARD NOTICE
Semester examinations commence on 15 October 2026. Students must download digital hall tickets via DigiLocker.`,
    paragraphs: [
      {
        id: 's-1',
        page: 1,
        paragraph: 1,
        text: 'Final semester examinations will commence across all affiliated colleges from October 15, 2026.'
      }
    ]
  },
  {
    id: 'ngo-report-2026',
    title: 'Gram Vikas Foundation — Rural Clean Drinking Water Impact Report',
    filename: 'NGO_Awareness_Report.pdf',
    type: 'pdf',
    pages: 6,
    size: '1.9 MB',
    uploadedAt: '2026-08-28 16:45 IST',
    detectedFacts: {
      total: 28,
      dates: 5,
      entities: 7,
      numericalValues: 6,
    },
    contextSummary: 'Community water purification project covering 140 villages with solar-powered filtration units.',
    intent: 'Persuade donors and community leaders to scale solar RO plants in drought-prone districts.',
    rawContent: `RURAL WATER ACCESS SURVEY
Over 140 villages now have access to clean fluorosis-free potable drinking water, reducing waterborne illness by 64%.`,
    paragraphs: [
      {
        id: 'n-1',
        page: 1,
        paragraph: 1,
        text: 'Solar-powered reverse osmosis filtration units have reduced fluorosis cases by 64% in 140 targeted villages.'
      }
    ]
  }
];
