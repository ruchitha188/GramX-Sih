import { DeliverableOutput } from '../types';

export const PRIMARY_SAMPLE_DELIVERABLES: DeliverableOutput[] = [
  {
    id: 'deliv-summary',
    type: 'executive_summary',
    title: 'Executive Summary',
    category: 'Documents',
    description: 'Concise executive briefing focusing on strategic impact, risk posture, and actionable leadership recommendations.',
    status: 'Ready',
    version: 1,
    reviewStatus: 'Draft',
    contentEn: `EXECUTIVE SUMMARY: CYBERSECURITY INCIDENT INVESTIGATION & MITIGATION

1. EXECUTIVE OVERVIEW
On 1 September 2026, an external state-sponsored threat vector targeted perimeter edge gateways of government administrative networks. Proactive defensive automation and Security Operations Center (SOC) intervention contained the threat within 42 minutes, ensuring continuous service delivery and perimeter integrity.

2. KEY FINDINGS
• Attack Vector: Spear-phishing documents weaponized with macros exploiting CVE-2026-38291 on unpatched SSL VPN nodes.
• Data Integrity: Zero breach of citizen personally identifiable information (PII), biometric records, or financial databases.
• Remediation: Firmware hotfix v4.8.2 issued and successfully applied to 94% of designated nodes within 12 hours.
• Statutory Reporting: Guidelines stipulate reporting to CERT-In within designated timelines.

3. STRATEGIC IMPACT
No downtime experienced across citizen-facing public utility portals. The incident validated automated telemetry containment while highlighting the necessity of mandatory hardware MFA for remote contractors.

4. RECOMMENDATIONS
• Mandate FIDO2 hardware tokens across all 42 state departments.
• Implement automated vulnerability compliance gates in procurement contracts.
• Accelerate zero-trust network access (ZTNA) rollout to Q1 2027.`,
    contentTe: `కార్యనిర్వాహక సారాంశం: సైబర్ భద్రతా సంఘటన దర్యాప్తు మరియు నివారణ నివేదిక

1. కార్యనిర్వాహక అవలోకనం
సెప్టెంబర్ 1, 2026న ప్రభుత్వ నెట్‌వర్క్ వ్యవస్థలపై జరిగిన చొరబాటు ప్రయత్నాన్ని సెక్యూరిటీ ఆపరేషన్స్ సెంటర్ (SOC) కేవలం 42 నిమిషాల్లోనే విజయవంతంగా అడ్డుకుంది. ఎటువంటి ప్రజా సేవలకు అంతరాయం కలగకుండా రక్షణ చర్యలు పూర్తయ్యాయి.

2. ముఖ్య ఫలితాలు
• దాడుల తీరు: ఫిషింగ్ ఈమెయిల్స్ ద్వారా ఎడ్జ్ రౌటర్లను లక్ష్యంగా చేసుకున్నారు.
• డేటా సమగ్రత: పౌరుల బయోమెట్రిక్ సమాచారం, ఆధార్ అనుసంధాన డేటా లేదా బ్యాంకింగ్ వివరాలు పూర్తిగా సురక్షితంగా ఉన్నాయి.
• పరిష్కారం: తాజా భద్రతా ప్యాచ్ v4.8.2 విడుదల చేయబడింది మరియు 94% సర్వర్లలో విజయవంతంగా ఇన్‌స్టాల్ చేయబడింది.

3. సంస్థాగత ప్రభావం
ప్రజలకు అందించే ఆన్‌లైన్ సేవలలో ఎలాంటి అంతరాయం కలగలేదు. ప్రభుత్వం సూచించిన భద్రతా ప్రమాణాలకు అనుగుణంగా వ్యవహరించడం ద్వారా నష్ట నివారణ జరిగింది.

4. సిఫార్సులు
• అన్ని విభాగాలలో బహుళ-కారకాల ప్రామాణీకరణను (MFA) వెంటనే తప్పనిసరి చేయాలి.
• జీరో-ట్రస్ట్ ఆర్కిటెక్చర్‌ను వేగవంతం చేయాలి.`,
    structuredData: {
      executiveSummary: {
        overview: 'On 1 September 2026, an external threat actor attempted unauthorized intrusion on government network edge gateways. SOC intervention contained the threat within 42 minutes, preventing core database infiltration.',
        keyFindings: [
          'Zero compromise of citizen biometrics, Aadhaar records, or payment gateways.',
          'Attack vector identified as weaponized spear-phishing exploiting CVE-2026-38291.',
          'Hotfix firmware v4.8.2 deployed across 94% of infrastructure within 12 hours.'
        ],
        impact: 'Citizen-facing portals remained 100% operational with zero service disruption.',
        recommendations: [
          'Mandate hardware-based FIDO2 MFA across all administrative access points.',
          'Establish continuous automated vulnerability audit for partner API endpoints.',
          'Accelerate Zero Trust Network Architecture implementation.'
        ]
      }
    },
    sourceClaims: [
      {
        claimId: 'c-sum1',
        claimText: 'SOC intervention contained the threat within 42 minutes.',
        sourcePage: 1,
        sourceParagraph: 2,
        sourceText: 'The defensive containment operations were executed within 42 minutes of alert generation by the Security Operations Center (SOC).',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-sum2',
        claimText: 'Zero breach of citizen personally identifiable information (PII), biometric records, or financial databases.',
        sourcePage: 3,
        sourceParagraph: 2,
        sourceText: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.',
        confidence: 0.99,
        verified: true
      }
    ]
  },
  {
    id: 'deliv-linkedin',
    type: 'linkedin',
    title: 'LinkedIn Executive Post',
    category: 'Social / Communication',
    description: 'Professional executive briefing post tailored for industry leadership, enterprise CISOs, and public sector stakeholders.',
    status: 'Ready',
    version: 1,
    reviewStatus: 'Draft',
    contentEn: `🛡️ National Cybersecurity Advisory: Proactive Containment & Enterprise Action Required

On September 1, 2026, CERT-In detected an unauthorized intrusion attempt targeting perimeter VPN edge gateways across critical infrastructure networks. 

Key Takeaways for Enterprise Leaders:
✅ Zero Compromise: Definitive forensics confirm zero citizen biometric records or financial payment identifiers were compromised.
⚡ Rapid Containment: Threat perimeter containment was achieved in under 42 minutes.
⚠️ Reporting Mandate: Organizations must report incidents within 24 hours to the national nodal cell.
🔐 Immediate Defense: Enforce mandatory hardware-token Multi-Factor Authentication (MFA) across all administrative access.

Proactive cyber defense requires active vigilance. Read the full CERT-In containment advisory and apply firmware hotfix v4.8.2 immediately.

#CyberSecurity #CERTIn #DigitalIndia #EnterpriseSecurity #ZeroTrust #InfoSec`,
    contentTe: `🛡️ జాతీయ సైబర్ భద్రత (Cybersecurity) అధికారిక ప్రకటన: ముందస్తు నియంత్రణ చర్యలు మరియు సంస్థాగత మార్గదర్శకాలు

సెప్టెంబర్ 1, 2026న, కీలకమైన ప్రభుత్వ నెట్‌వర్క్ ప్రవేశ మార్గాలపై (VPN gateways) జరిగిన అనధికారిక సైబర్ చొరబాటు యత్నాన్ని సెక్యూరిటీ బృందాలు విజయవంతంగా అడ్డుకున్నాయి.

ముఖ్యమైన వివరాలు:
✅ పూర్తి భద్రత: పౌరుల బయోమెట్రిక్ సమాచారం (Biometric Data) లేదా ఆర్థిక చెల్లింపు వివరాలు ఏవీ చొరబాటుదారుల చేతికి చిక్కలేదు.
⚡ తక్షణ నియంత్రణ: హెచ్చరిక వచ్చిన 42 నిమిషాల్లోనే ముప్పును అరికట్టడం జరిగింది.
⚠️ నివేదిక గడువు: సైబర్ సంఘటనలను నిర్దేశిత గడువులోగా జాతీయ రక్షణ విభాగానికి నివేదించాలి.
🔐 తక్షణ రక్షణ: ఉద్యోగులందరికీ బహుళ-కారకాల ప్రామాణీకరణను (MFA) తప్పనిసరి చేయండి.

సురక్షిత డిజిటల్ వ్యవస్థ కోసం సంస్థలన్నీ తాజా భద్రతా ప్యాచ్ v4.8.2 ను వెంటనే అమలు చేయాల్సిందిగా కోరుతున్నాం.

#సైబర్‌భద్రత #CyberSecurity #డిజిటల్‌ఇండియా #MFA #డేటాభద్రత`,
    sourceClaims: [
      {
        claimId: 'c-1',
        claimText: 'On September 1, 2026, CERT-In detected an unauthorized intrusion attempt targeting perimeter VPN edge gateways.',
        sourcePage: 1,
        sourceParagraph: 1,
        sourceText: 'On 1 September 2026, national threat telemetry identified an advanced targeted intrusion attempt on perimeter edge gateways of government administrative networks.',
        confidence: 0.98,
        verified: true
      },
      {
        claimId: 'c-2',
        claimText: 'Definitive forensics confirm zero citizen biometric records or financial payment identifiers were compromised.',
        sourcePage: 3,
        sourceParagraph: 2,
        sourceText: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-3',
        claimText: 'Organizations must report incidents within 24 hours to the national nodal cell.',
        sourcePage: 4,
        sourceParagraph: 1,
        sourceText: 'Under national cybersecurity directives, organizations are advised to report incidents within 48 hours of detection to the nodal CERT-In response cell.',
        confidence: 0.72,
        verified: false,
        mismatchWarning: 'Potential reporting timeframe mismatch: Output specifies 24 hours while Source Document specifies 48 hours.',
        suggestedFix: 'Organizations are advised to report incidents within 48 hours to the national nodal cell.'
      },
      {
        claimId: 'c-4',
        claimText: 'Enforce mandatory hardware-token Multi-Factor Authentication (MFA) across all administrative access.',
        sourcePage: 5,
        sourceParagraph: 2,
        sourceText: 'All system administrators must enforce mandatory FIDO2 hardware token multi-factor authentication for remote access across enterprise gateways.',
        confidence: 0.97,
        verified: true
      }
    ]
  },
  {
    id: 'deliv-twitter',
    type: 'twitter_thread',
    title: 'X (Twitter) Thread',
    category: 'Social / Communication',
    description: '5-part structured thread optimized for viral engagement, public transparency, and actionable awareness.',
    status: 'Ready',
    version: 1,
    reviewStatus: 'Draft',
    contentEn: `1/5 🚨 Incident Advisory: Defensive containment initiated following intrusion telemetry detected on state network edge gateways on 1 Sept 2026. Here is what every IT team needs to know 🧵👇

2/5 🛡️ Citizen Data Status: Forensic validation confirms 0 biometric records or citizen databases were accessed or compromised. Critical public services continue without interruption.

3/5 ⚡ Incident Response: Containment occurred within 42 mins. Threat vector identified: weaponized spear-phishing targeting VPN gateway configurations (CVE-2026-38291).

4/5 ⏱️ Statutory Compliance: Organizations must report incidents within 24 hours to CERT-In and apply firmware update v4.8.2 immediately.

5/5 🔐 Defensive Checklist:
• Enforce FIDO2 MFA on all remote endpoints
• Rotate domain controller Kerberos credentials
• Audit edge routing logs
Official helpline: 1800-11-4949. Stay secure!`,
    contentTe: `1/5 🚨 సైబర్ భద్రతా హెచ్చరిక: సెప్టెంబర్ 1, 2026న ప్రభుత్వ నెట్‌వర్క్ ఎడ్జ్ గేట్‌వేలపై గుర్తించిన చొరబాటు యత్నాన్ని భద్రతా బృందాలు విజయవంతంగా అడ్డుకున్నాయి. ముఖ్య వివరాలు 🧵👇

2/5 🛡️ ప్రజల డేటా పూర్తి సురక్షితం: ఎలాంటి బయోమెట్రిక్ లేదా పౌరుల డేటా రాజీ పడలేదని ఫోరెన్సిక్ తనిఖీల్లో స్పష్టమైంది. పౌర సేవలు నిరంతరాయంగా పనిచేస్తున్నాయి.

3/5 ⚡ సత్వర స్పందన: హెచ్చరిక వచ్చిన 42 నిమిషాల్లోనే నియంత్రణ పూర్తయింది. ఫిషింగ్ ఈమెయిల్స్ ద్వారా ఈ దాడి ప్రయత్నం జరిగినట్లు గుర్తించారు.

4/5 ⏱️ మార్గదర్శకాలు: భద్రతా సంఘటనలను నిర్దేశిత వ్యవధిలోగా నివేదించాలి మరియు సిస్టమ్ ప్యాచ్ v4.8.2 ను వెంటనే అప్‌డేట్ చేయాలి.

5/5 🔐 తీసుకోవాల్సిన జాగ్రత్తలు:
• బహుళ-కారకాల ప్రామాణీకరణ (MFA) తప్పనిసరి
• సిస్టమ్ పాస్‌వర్డ్‌లను మార్చుకోండి
• హెల్ప్‌లైన్: 1800-11-4949 సంప్రదించండి.`,
    structuredData: {
      thread: [
        { tweetNumber: 1, text: '1/5 🚨 Incident Advisory: Defensive containment initiated following intrusion telemetry detected on state network edge gateways on 1 Sept 2026. Here is what every IT team needs to know 🧵👇' },
        { tweetNumber: 2, text: '2/5 🛡️ Citizen Data Status: Forensic validation confirms 0 biometric records or citizen databases were accessed or compromised. Critical public services continue without interruption.' },
        { tweetNumber: 3, text: '3/5 ⚡ Incident Response: Containment occurred within 42 mins. Threat vector identified: weaponized spear-phishing targeting VPN gateway configurations (CVE-2026-38291).' },
        { tweetNumber: 4, text: '4/5 ⏱️ Statutory Compliance: Organizations must report incidents within 24 hours to CERT-In and apply firmware update v4.8.2 immediately.' },
        { tweetNumber: 5, text: '5/5 🔐 Defensive Checklist:\n• Enforce FIDO2 MFA on all remote endpoints\n• Rotate domain controller Kerberos credentials\n• Audit edge routing logs\nOfficial helpline: 1800-11-4949. Stay secure!' }
      ]
    },
    sourceClaims: [
      {
        claimId: 'c-t1',
        claimText: 'Defensive containment initiated following intrusion telemetry detected on state network edge gateways on 1 Sept 2026.',
        sourcePage: 1,
        sourceParagraph: 1,
        sourceText: 'On 1 September 2026, national threat telemetry identified an advanced targeted intrusion attempt on perimeter edge gateways of government administrative networks.',
        confidence: 0.98,
        verified: true
      },
      {
        claimId: 'c-t2',
        claimText: 'Forensic validation confirms 0 biometric records or citizen databases were accessed or compromised.',
        sourcePage: 3,
        sourceParagraph: 2,
        sourceText: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-t3',
        claimText: 'Organizations must report incidents within 24 hours to CERT-In.',
        sourcePage: 4,
        sourceParagraph: 1,
        sourceText: 'Under national cybersecurity directives, organizations are advised to report incidents within 48 hours of detection to the nodal CERT-In response cell.',
        confidence: 0.72,
        verified: false,
        mismatchWarning: 'Flagged discrepancy in reporting window (24h vs 48h).',
        suggestedFix: 'Organizations are advised to report incidents within 48 hours to CERT-In.'
      }
    ]
  },
  {
    id: 'deliv-advisory',
    type: 'advisory',
    title: 'Official Government Advisory',
    category: 'Documents',
    description: 'Comprehensive statutory technical advisory formatted for government departments, ministries, and enterprise sysadmins.',
    status: 'Ready',
    version: 1,
    reviewStatus: 'Draft',
    contentEn: `GOVERNMENT OF INDIA — CYBERSECURITY EMERGENCY ADVISORY
DOCUMENT REF: CERT-IN/ADV-2026-0894 | CLASSIFICATION: OFFICIAL USE

1. TITLE
Emergency Mitigation Advisory: Mitigation of CVE-2026-38291 Targeting Perimeter SSL VPN Edge Routers

2. SUMMARY
A coordinated unauthorized intrusion attempt targeting public sector network edge routing infrastructure was intercepted and neutralized on 1 September 2026. Forensic verification has established zero compromise of citizen biometric records, Aadhaar databases, or financial systems.

3. SITUATION
Threat actors deployed weaponized spear-phishing attachments masquerading as fiscal budget notices to harvest administrative credentials. Containment was finalized in 42 minutes.

4. KEY INFORMATION
• Affected Components: SSL VPN gateways running firmware prior to v4.8.2.
• Indicator of Compromise (IoC): Inbound telemetry from IP ranges 185.220.101.0/24.
• Compliance Notice: Organizations must report incidents within 24 hours of anomaly detection.

5. RECOMMENDED ACTIONS
• Flash hotfix patch firmware v4.8.2 on all edge gateway hardware.
• Enforce FIDO2 hardware token MFA on all remote administrative gateways.
• Conduct mandatory credential revocations for elevated domain controllers.
• Isolate unpatched perimeter nodes from core state intranets.

6. REFERENCES
• CERT-In Advisory Bulletin 2026-0894
• NCIIPC Critical Infrastructure Guidelines Section 4.2`,
    contentTe: `భారత ప్రభుత్వం — అత్యవసర సైబర్ భద్రత మార్గదర్శక ఆదేశం (అధికారిక సలహా)
పత్రం సంఖ్య: CERT-IN/ADV-2026-0894 | వర్గీకరణ: అధికారిక వినియోగం

1. శీర్షిక
అత్యవసర భద్రతా నివారణ మార్గదర్శకం: నెట్‌వర్క్ ఎడ్జ్ రౌటర్లలో CVE-2026-38291 భద్రతా లోపం నివారణ

2. సారాంశం
సెప్టెంబర్ 1, 2026న ప్రభుత్వ డిజిటల్ మౌలిక సదుపాయాలపై జరిగిన చొరబాటు ప్రయత్నాన్ని రక్షణ బృందాలు విజయవంతంగా నియంత్రించాయి. పౌరుల బయోమెట్రిక్ డేటా లేదా బ్యాంకింగ్ రికార్డులకు ఎటువంటి నష్టం వాటిల్లలేదని నిర్ధారించబడింది.

3. ప్రస్తుత పరిస్థితి
ఫిషింగ్ ఈమెయిల్స్ ద్వారా పరిపాలనా అనుమతులను దక్కించుకునేందుకు సైబర్ నేరగాళ్లు ప్రయత్నించారు. భద్రతా వ్యవస్థలు 42 నిమిషాల్లోనే స్పందించి ముప్పును తొలగించాయి.

4. ముఖ్య సమాచారం
• ప్రభావిత భాగాలు: వెర్షన్ v4.8.2 కంటే పాత సాఫ్ట్‌వేర్ ఉన్న VPN గేట్‌వేలు.
• నివేదిక గడువు: మార్గదర్శకాల ప్రకారం భద్రతా సంఘటనలను నిర్దేశిత సమయంలో నివేదించాలి.

5. తక్షణ కార్యాచరణ చర్యలు
• అన్ని గేట్‌వేలకు తక్షణమే v4.8.2 సాఫ్ట్‌వేర్ ప్యాచ్ ఇన్‌స్టాల్ చేయాలి.
• బహుళ-కారకాల ప్రామాణీకరణను (MFA) నిర్బంధంగా అమలు చేయాలి.
• అడ్మిన్ పాస్‌వర్డ్‌లను రీసెట్ చేయాలి.

6. రిఫరెన్సులు
• జాతీయ సైబర్ కోఆర్డినేషన్ సెంటర్ బులిటెన్ 2026-0894`,
    structuredData: {
      advisory: {
        title: 'Emergency Mitigation Advisory: Mitigation of CVE-2026-38291 Targeting Perimeter SSL VPN Edge Routers',
        summary: 'A coordinated unauthorized intrusion attempt targeting public sector network edge routing infrastructure was intercepted and neutralized on 1 September 2026. Forensic verification has established zero compromise of citizen biometric records.',
        situation: 'Threat actors deployed weaponized spear-phishing attachments masquerading as fiscal budget notices to harvest administrative credentials. Containment was finalized in 42 minutes.',
        keyInformation: [
          'Affected Components: SSL VPN gateways running firmware prior to v4.8.2.',
          'Threat Signature: Anomalous credential tunneling on port 8443.',
          'Compliance Notice: Organizations must report incidents within 24 hours of detection.'
        ],
        recommendedActions: [
          'Flash hotfix patch firmware v4.8.2 on all edge gateway hardware immediately.',
          'Enforce mandatory FIDO2 hardware token MFA on all remote administrative gateways.',
          'Perform Kerberos ticket key rollover across domain controllers.',
          'Isolate unpatched perimeter nodes from internal government subnets.'
        ],
        references: [
          'CERT-In Advisory Bulletin 2026-0894',
          'National Critical Information Infrastructure Protection Guidelines Section 4.2'
        ]
      }
    },
    sourceClaims: [
      {
        claimId: 'c-adv1',
        claimText: 'Forensic verification has established zero compromise of citizen biometric records, Aadhaar databases, or financial systems.',
        sourcePage: 3,
        sourceParagraph: 2,
        sourceText: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-adv2',
        claimText: 'Organizations must report incidents within 24 hours of anomaly detection.',
        sourcePage: 4,
        sourceParagraph: 1,
        sourceText: 'Under national cybersecurity directives, organizations are advised to report incidents within 48 hours of detection to the nodal CERT-In response cell.',
        confidence: 0.72,
        verified: false,
        mismatchWarning: 'Advisory timeline states 24 hours while source document specifies 48 hours.',
        suggestedFix: 'Organizations are advised to report incidents within 48 hours of anomaly detection.'
      },
      {
        claimId: 'c-adv3',
        claimText: 'Immediate patch firmware update version 4.8.2 has been released to address CVE-2026-38291 affecting SSL VPN gateways.',
        sourcePage: 6,
        sourceParagraph: 1,
        sourceText: 'Immediate patch firmware update version 4.8.2 has been released to address CVE-2026-38291 affecting SSL VPN gateways.',
        confidence: 0.99,
        verified: true
      }
    ]
  },
  {
    id: 'deliv-presentation',
    type: 'presentation',
    title: 'Visual Presentation (8 Slides)',
    category: 'Visual / Presentation',
    description: 'Complete slide deck with speaker notes, slide content, visual cues, and interactive slide previewer.',
    status: 'Ready',
    version: 1,
    reviewStatus: 'Draft',
    contentEn: `SLIDE DECK: National Cybersecurity Incident Response & Governance Briefing (8 Slides)`,
    contentTe: `ప్రెజెంటేషన్ స్లయిడ్‌లు: జాతీయ సైబర్ భద్రతా సంఘటన మరియు నివారణ మార్గదర్శకాలు (8 స్లయిడ్‌లు)`,
    structuredData: {
      presentation: {
        slideCount: 8,
        slides: [
          {
            slideNumber: 1,
            title: 'Executive Incident Briefing: Perimeter Gateway Defense',
            bullets: [
              'Incident Reference: CERT-IN/ADV-2026-0894',
              'Date of Detection: September 1, 2026',
              'Containment Response: 42 minutes to full isolation',
              'Status: All public digital infrastructure 100% operational'
            ],
            speakerNotes: 'Good morning committee members. Today we are presenting the comprehensive incident response report regarding the containment of perimeter intrusions on September 1.'
          },
          {
            slideNumber: 2,
            title: 'Attack Vector & Chronology',
            bullets: [
              'Vector: Weaponized spear-phishing emails containing malicious macros',
              'Targeted Vulnerability: CVE-2026-38291 on edge SSL VPN gateways',
              'Defense Actions: Automated SOC telemetry isolation and routing rules lockdown',
              'Containment Delta: Total duration 42 minutes'
            ],
            speakerNotes: 'Explain the technical timeline. Emphasize that automated isolation protocols operated without requiring manual committee approval.'
          },
          {
            slideNumber: 3,
            title: 'Data Integrity & Citizen Privacy Status',
            bullets: [
              'Citizen Biometric Data: 0 records compromised (Verified)',
              'Aadhaar / PII Databases: 100% isolated and untouched',
              'Banking & Financial Switches: Zero unauthorized transactions detected',
              'Citizen Portals: Zero service interruption reported'
            ],
            speakerNotes: 'This slide provides reassurance regarding public data. Emphasize the definitive forensic audit signed off by CERT-In.'
          },
          {
            slideNumber: 4,
            title: 'Statutory Compliance & Reporting Timeline',
            bullets: [
              'Directive: National Cyber Security Incident Mandate 2026',
              'Reporting Requirement: Organizations must report incidents within 24 hours (Flagged for review)',
              'Correction Notice: Source directive specifies 48 hours window',
              'Nodal Authority: National Cyber Coordination Center'
            ],
            speakerNotes: 'Highlight the reporting obligations for enterprise partners and public sector entities.'
          },
          {
            slideNumber: 5,
            title: 'Remediation & Technical Hotfixes',
            bullets: [
              'Firmware Hotfix: Patch v4.8.2 deployed across all nodes',
              'Credential Rollback: Domain controller Kerberos ticket revocation completed',
              'Network Hardening: Perimeter port 8443 restricted to internal bastion hosts',
              'Audit Trail: 100% telemetry logs preserved for forensic chain of custody'
            ],
            speakerNotes: 'Detail the engineering actions taken by the infrastructure team to patch the vulnerability.'
          },
          {
            slideNumber: 6,
            title: 'Multi-Factor Authentication (MFA) Mandate',
            bullets: [
              'Policy Upgrade: Mandatory FIDO2 hardware tokens for all admins',
              'Elimination of SMS OTP: Deprecated for administrative access',
              'Contractor Access: Strict time-bound just-in-time provisioning',
              'Compliance Deadline: Immediate 72-hour enforcement'
            ],
            speakerNotes: 'Emphasize transitioning from vulnerable SMS verification to cryptographic hardware tokens.'
          },
          {
            slideNumber: 7,
            title: 'Inter-Departmental Coordination & Public Comms',
            bullets: [
              'Banking Regulators: Advisory issued to 34 commercial banks',
              'State Data Centers: Joint containment audit executed',
              'Public Awareness: Transparent factual updates released to prevent disinformation',
              'Toll-Free Cyber Helpline: 1800-11-4949 manned 24/7'
            ],
            speakerNotes: 'Review the inter-agency collaboration and public messaging strategy.'
          },
          {
            slideNumber: 8,
            title: 'Future Roadmap: Zero-Trust Architecture 2027',
            bullets: [
              'Phase 1: Complete elimination of perimeter VPN access by Q4 2026',
              'Phase 2: Continuous micro-segmentation of government intranets',
              'Phase 3: AI-driven autonomous anomaly isolation',
              'Budget Allocation: Approved under National Cyber Resilience Fund'
            ],
            speakerNotes: 'Conclude with the forward-looking strategic investments to ensure permanent resilience.'
          }
        ]
      }
    },
    sourceClaims: [
      {
        claimId: 'c-p1',
        claimText: 'Containment Response: 42 minutes to full isolation.',
        sourcePage: 1,
        sourceParagraph: 2,
        sourceText: 'The defensive containment operations were executed within 42 minutes of alert generation by the Security Operations Center (SOC).',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-p2',
        claimText: 'Citizen Biometric Data: 0 records compromised.',
        sourcePage: 3,
        sourceParagraph: 2,
        sourceText: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-p3',
        claimText: 'Organizations must report incidents within 24 hours.',
        sourcePage: 4,
        sourceParagraph: 1,
        sourceText: 'Under national cybersecurity directives, organizations are advised to report incidents within 48 hours of detection to the nodal CERT-In response cell.',
        confidence: 0.72,
        verified: false,
        mismatchWarning: 'Slide 4 states 24 hours instead of 48 hours.',
        suggestedFix: 'Organizations are advised to report incidents within 48 hours.'
      }
    ]
  },
  {
    id: 'deliv-video',
    type: 'video_package',
    title: 'Complete Video Package',
    category: 'Video',
    description: 'Comprehensive broadcast video package including Script, Storyboard, Scene breakdown, Narration audio text, Subtitles (SRT), and Visual recommendations.',
    status: 'Ready',
    version: 1,
    reviewStatus: 'Draft',
    contentEn: `VIDEO PACKAGE: 60-Second Public Cybersecurity Advisory & Enterprise Protocol`,
    contentTe: `వీడియో ప్యాకేజీ: 60 సెకన్ల సైబర్ భద్రత ప్రజా అవగాహన మరియు మార్గదర్శకాలు`,
    structuredData: {
      videoPackage: {
        script: `[TITLE: DEFENDING INDIA'S DIGITAL FRONTIER — OFFICIAL CERT-IN ADVISORY]

(00:00 - 00:08)
[SCENE 1: High-tech Security Operations Center with real-time digital map showing defensive shield activation]
NARRATOR (Firm, reassuring): "On September 1, 2026, national cyber defense networks successfully detected and neutralized an intrusion attempt against critical infrastructure."

(00:08 - 00:22)
[SCENE 2: Split screen showing citizen digital services, UPI transactions, and biometric verification icons with verified green checkmarks]
NARRATOR: "Let's be completely clear: Zero citizen biometric data or banking records were breached. India's digital services remain fully secure and operational."

(00:22 - 00:38)
[SCENE 3: 3D animated diagram of VPN gateway receiving instant firmware patch v4.8.2 and hardware security key activation]
NARRATOR: "Defense teams contained the intrusion within 42 minutes. We now call on all enterprise system administrators to immediately flash security update v4.8.2 and activate Multi-Factor Authentication."

(00:38 - 00:50)
[SCENE 4: Calendar graphic showing 48-hour compliance window with official notification seal]
NARRATOR: "Remember: All organizations are advised to report security incidents to CERT-In within 48 hours. Early reporting protects the entire national ecosystem."

(00:50 - 01:00)
[SCENE 5: Official helpline 1800-11-4949 and website cert-in.org.in with National Emblem]
NARRATOR: "Stay vigilant. Stay protected. An initiative of the Government of India in public cyber safety."`,
        storyboard: [
          {
            sceneNumber: 1,
            visual: 'Futuristic national Cyber Command Center with large video wall displaying digital grid of India and defensive containment shield animation.',
            audio: 'Low subtle electronic ambient hum followed by authoritative narrator voiceover.',
            duration: '8 seconds'
          },
          {
            sceneNumber: 2,
            visual: 'Close up of smartphone screen conducting secure instant UPI transaction, fading into biometric Aadhaar vault icon with glowing green verification badge.',
            audio: 'Clear positive chime, calm and reassuring narrator vocal delivery.',
            duration: '14 seconds'
          },
          {
            sceneNumber: 3,
            visual: 'Technical 3D render of server rack showing red threat packet blocked by firewall barrier, followed by firmware v4.8.2 patch installation progress bar reaching 100%.',
            audio: 'Fast-paced cybersecurity sound effects, brisk instructional narration.',
            duration: '16 seconds'
          },
          {
            sceneNumber: 4,
            visual: 'Clean motion graphics displaying statutory notification timer (48 Hours) and official CERT-In digital submission portal interface.',
            audio: 'Clear tone emphasis on compliance and teamwork.',
            duration: '12 seconds'
          },
          {
            sceneNumber: 5,
            visual: 'Clean white-and-tricolor background displaying National Cyber Coordination Center logo, 24x7 toll-free helpline number 1800-11-4949.',
            audio: 'Uplifting orchestral signature sting, closing voiceover.',
            duration: '10 seconds'
          }
        ],
        scenes: [
          {
            sceneNumber: 1,
            setting: 'Central Cybersecurity Command Center (Studio / 3D Render)',
            visualDescription: 'Dimly lit high-tech environment with blue and amber telemetry displays. Engineers in uniform monitoring real-time network defense graphs.',
            cameraAngle: 'Wide cinematic tracking shot zooming slowly into the central command display.'
          },
          {
            sceneNumber: 2,
            setting: 'Everyday Citizen Context (Mobile App & Banking)',
            visualDescription: 'Clean macro shots of ordinary citizens in Hyderabad and Delhi using smartphones for digital payments without disruption.',
            cameraAngle: 'Eye-level medium close-up, natural warm lighting.'
          },
          {
            sceneNumber: 3,
            setting: 'Enterprise Server Facility / Data Center',
            visualDescription: 'Blinking LED server blade arrays with visual overlay depicting FIDO2 hardware token authentication.',
            cameraAngle: 'Dutch angle low-shot tilting upward across server cabinets.'
          },
          {
            sceneNumber: 4,
            setting: 'Motion Graphics Vector Workspace',
            visualDescription: 'Minimalist infographic showing the 48-hour timeline and CERT-In compliance checklist.',
            cameraAngle: 'Direct overhead flat graphic layout with smooth 60fps transitions.'
          },
          {
            sceneNumber: 5,
            setting: 'Official Government End-Card',
            visualDescription: 'High-resolution Government of India seal, CERT-In logo, and helpline numbers in English and Telugu.',
            cameraAngle: 'Static frontal lock-in with subtle fade out.'
          }
        ],
        narration: `NARRATION TRACK (ENGLISH & TELUGU AUDIO STEMS):
Voice Profile: Professional, calm, authoritative broadcast announcer (35-45 age bracket).
English Narration: "On September 1, 2026, national cyber defense networks successfully detected and neutralized an intrusion attempt against critical infrastructure. Zero citizen biometric data or banking records were breached. India's digital services remain fully secure and operational. Defense teams contained the intrusion within 42 minutes. We now call on all enterprise system administrators to immediately flash security update v4.8.2 and activate Multi-Factor Authentication. All organizations are advised to report security incidents to CERT-In within 48 hours. Stay vigilant. Stay protected."

Telugu Narration (వాయిస్ ఓవర్):
"సెప్టెంబర్ 1, 2026న మన ప్రభుత్వ నెట్‌వర్క్‌లపై జరిగిన సైబర్ చొరబాటు ప్రయత్నాన్ని రక్షణ బృందాలు విజయవంతంగా అడ్డుకున్నాయి. పౌరుల బయోమెట్రిక్ సమాచారం లేదా బ్యాంకింగ్ వివరాలు పూర్తిగా సురక్షితంగా ఉన్నాయి. హెచ్చరిక వచ్చిన 42 నిమిషాల్లోనే ముప్పును తొలగించడం జరిగింది. సంస్థలన్నీ వెంటనే తమ సిస్టమ్‌లలో తాజా భద్రతా ప్యాచ్ v4.8.2 ను ఇన్‌స్టాల్ చేసి, బహుళ-కారకాల ప్రామాణీకరణను అమలు చేయాలని కోరుతున్నాం. సైబర్ భద్రతను కాపాడటం మనందరి బాధ్యత."`,
        subtitlesSrt: `1
00:00:01,200 --> 00:00:06,500
On September 1, 2026, national cyber defense networks detected and neutralized an intrusion attempt.

2
00:00:06,800 --> 00:00:12,400
Forensics confirm zero citizen biometric records or financial databases were compromised.

3
00:00:12,700 --> 00:00:17,900
Defensive containment was executed within 42 minutes by the Security Operations Center.

4
00:00:18,200 --> 00:00:23,800
Enterprise administrators must apply security patch v4.8.2 and enforce Multi-Factor Authentication.

5
00:00:24,100 --> 00:00:30,500
Organizations are advised to report incidents within 48 hours to CERT-In at cert-in.org.in.`,
        visualRecommendations: [
          'Use 16:9 4K resolution at 60fps for crisp display on conference screens and television broadcasts.',
          'Display synchronized dual-language subtitles (English + Telugu) across lower third.',
          'Avoid red alarming flash animations; use professional dark blue (#0f172a) and emerald green (#10b981) to communicate authoritative containment.',
          'Include high-contrast QR code in final 5 seconds linking directly to the CERT-In patch bulletin repository.'
        ]
      }
    },
    sourceClaims: [
      {
        claimId: 'c-v1',
        claimText: 'Zero citizen biometric data or banking records were breached.',
        sourcePage: 3,
        sourceParagraph: 2,
        sourceText: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-v2',
        claimText: 'Defense teams contained the intrusion within 42 minutes.',
        sourcePage: 1,
        sourceParagraph: 2,
        sourceText: 'The defensive containment operations were executed within 42 minutes of alert generation by the Security Operations Center (SOC).',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-v3',
        claimText: 'Organizations are advised to report security incidents to CERT-In within 48 hours.',
        sourcePage: 4,
        sourceParagraph: 1,
        sourceText: 'Under national cybersecurity directives, organizations are advised to report incidents within 48 hours of detection to the nodal CERT-In response cell.',
        confidence: 0.98,
        verified: true
      }
    ]
  },
  {
    id: 'deliv-infographic',
    type: 'infographic',
    title: 'Infographic Package (Content & Layout Blueprint)',
    category: 'Visual / Presentation',
    description: 'Complete infographic specification including key messaging pillars, statistical telemetry, layout blueprint, and color palettes.',
    status: 'Ready',
    version: 1,
    reviewStatus: 'Draft',
    contentEn: `INFOGRAPHIC SPECIFICATION: National Cybersecurity Defense & Citizen Data Integrity

KEY MESSAGING PILLARS:
1. Zero Citizen Data Compromise: Definitive forensics confirm 100% security of citizen biometric records, Aadhaar-linked databases, and banking payment switches.
2. Rapid Defense Containment: Perimeter edge intrusion halted within 42 minutes by national SOC automation.
3. Universal Enterprise Mitigation: Instant release of hotfix firmware v4.8.2 and mandatory hardware-token MFA enforcement.

LAYOUT RECOMMENDATIONS:
• Recommended Grid: 3-Tier Vertical Flow (Hero Metric ➔ Threat Chronology ➔ Action Checklist)
• Aspect Ratio: 9:16 (Optimized for Mobile/Social) & 16:9 (Executive Briefing)
• Typography Hierarchy: Bold Display Sans (Header 36pt), Clean Sans (Body 14pt), Monospace (Telemetry 12pt)
• Color Palette: Deep Slate (#0F172A), Cyber Blue (#6366F1), Emerald Shield (#10B981), Amber Alert (#F59E0B)
• Suggested Icons: ShieldCheck, Lock, Activity, Server, Zap, PhoneCall
• Visual Flow: Incident Alert ➔ SOC Containment (42m) ➔ Forensic Clean Bill ➔ Admin Action Mandate`,
    contentTe: `ఇన్ఫోగ్రాఫిక్ సమాచారం: జాతీయ సైబర్ రక్షణ మరియు పౌర సమాచార భద్రత

ముఖ్యమైన సందేశాలు (Key Messaging):
1. పౌరుల డేటా పూర్తి సురక్షితం: బయోమెట్రిక్ సమాచారం లేదా బ్యాంకింగ్ రికార్డులు ఏవీ రాజీ పడలేదు.
2. వేగవంతమైన రక్షణ: 42 నిమిషాల్లోనే సైబర్ ముప్పును అరికట్టడం జరిగింది.
3. సంస్థాగత మార్గదర్శకాలు: భద్రతా ప్యాచ్ v4.8.2 మరియు బహుళ-కారకాల ప్రామాణీకరణ (MFA) తప్పనిసరి.

డిజైన్ సిఫార్సులు (Layout Recommendations):
• సిఫార్సు చేసిన లేఅవుట్: 3-స్థాయి నిలువు లేఅవుట్ (హీరో మెట్రిక్స్ ➔ ముప్పు కాలక్రమం ➔ కార్యాచరణ చెక్‌లిస్ట్)
• రంగుల ఎంపిక: డార్క్ బ్లూ, ఎమరాల్డ్ గ్రీన్, వైట్
• ఐకాన్‌లు: షీల్డ్, తాళం, సర్వర్, హెల్ప్‌లైన్`,
    structuredData: {
      infographic: {
        title: 'National Cyber Defense Telemetry & Citizen Data Integrity',
        subtitle: 'Official CERT-In Incident Forensic Summary & Mitigation Blueprint',
        keyMessaging: [
          'Citizen Privacy 100% Preserved: Zero biometric or payment records breached.',
          'Autonomous Rapid Containment: Threat neutralized in 42 minutes by SOC telemetry.',
          'Mandatory Enterprise Hygiene: Immediate deployment of patch v4.8.2 and FIDO2 MFA.',
          'Transparent Public Governance: 24/7 Citizen helpline 1800-11-4949 active.'
        ],
        layoutRecommendations: {
          recommendedGrid: '3-Tier Vertical Card Stack (Banner ➔ Key Metric Hub ➔ 4-Step Defensive Timeline ➔ Action CTA)',
          aspectRatio: '9:16 (Social Stories / Mobile) & 4:5 (LinkedIn/Instagram Feed)',
          typographyHierarchy: 'Primary Headline: 38pt Semi-Bold Sans; Metric Numbers: 48pt Bold Mono; Body Text: 14pt Regular Sans',
          colorPalette: {
            primary: '#0F172A',
            secondary: '#6366F1',
            accent: '#10B981',
            background: '#020617'
          },
          suggestedIcons: ['ShieldCheck', 'DatabaseLock', 'Cpu', 'CheckCircle2', 'Lock', 'PhoneCall'],
          visualFlowType: 'Top-to-Bottom Hierarchical Cascade with Visual Connectors'
        },
        statistics: [
          { label: 'Containment Speed', value: '42 Min', desc: 'From SOC alert to full edge isolation', iconName: 'Zap' },
          { label: 'Biometric Records Breached', value: '0', desc: 'Citizen privacy 100% intact', iconName: 'ShieldCheck' },
          { label: 'Patch Compliance', value: '94%', desc: 'Nodes updated within 12 hours', iconName: 'CheckCircle2' },
          { label: 'Citizen Portal Uptime', value: '100%', desc: 'Zero disruption to public utilities', iconName: 'Activity' }
        ],
        keyTakeaways: [
          'Zero citizen data exfiltration confirmed by CERT-In forensic audit.',
          'Automated SOC telemetry isolation prevented internal lateral network movement.',
          'Mandatory hardware token MFA (FIDO2) replaces vulnerable legacy passwords.',
          'Advisory reporting timeline: 48 hours for enterprise compliance.'
        ],
        visualFlow: [
          'Detection (1 Sept 2026, 08:30 IST)',
          'SOC Containment (42 Minutes)',
          'Forensic Audit (0 Records Compromised)',
          'Patch Release (Firmware v4.8.2)',
          'Citizen Safety Assurance Verified'
        ],
        contentSections: [
          {
            heading: 'Section 1: The Threat Containment',
            bulletPoints: [
              'Target: Perimeter SSL VPN Gateways (CVE-2026-38291)',
              'Defense Response: Automated IP isolation & Kerberos token rollback',
              'Duration: 42 minutes total response latency'
            ],
            placement: 'Top Half - Hero telemetry area'
          },
          {
            heading: 'Section 2: Forensic Data Guarantee',
            bulletPoints: [
              'Aadhaar databases completely unaffected',
              'Core banking switches 100% operational',
              'Public grievance portals active 24/7'
            ],
            placement: 'Center Hub - High-contrast highlight box'
          },
          {
            heading: 'Section 3: Enterprise Action Checklist',
            bulletPoints: [
              'Deploy patch v4.8.2 immediately',
              'Turn on FIDO2 hardware MFA tokens',
              'Report anomalies to CERT-In within 48 hours'
            ],
            placement: 'Bottom Section - Actionable checklist & helpline'
          }
        ]
      }
    },
    sourceClaims: [
      {
        claimId: 'c-inf1',
        claimText: 'Zero biometric or payment records breached.',
        sourcePage: 3,
        sourceParagraph: 2,
        sourceText: 'The audit definitively confirmed that zero citizen biometric records, Aadhaar-linked databases, or banking payment identifiers were accessed or exfiltrated.',
        confidence: 0.99,
        verified: true
      },
      {
        claimId: 'c-inf2',
        claimText: 'Threat neutralized in 42 minutes by SOC telemetry.',
        sourcePage: 1,
        sourceParagraph: 2,
        sourceText: 'The defensive containment operations were executed within 42 minutes of alert generation by the Security Operations Center (SOC).',
        confidence: 0.99,
        verified: true
      }
    ]
  }
];

