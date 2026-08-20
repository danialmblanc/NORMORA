import {
  PlatformModuleInfo,
  FrameworkInfo,
  IntegrationInfo,
  ResourceArticle,
  SolutionInfo,
} from "../types/marketing";

export const platformModulesData: PlatformModuleInfo[] = [
  {
    id: "context",
    name: "Normora Context",
    tagline: "Business and compliance context that grounds every workflow",
    description: "Captures your organizational boundaries, systems architecture, multi-cloud hosting regions, workforce topology, and data classification schemas to ground all automated evaluations and AI agents.",
    capabilities: [
      "Dynamic Base Context schema versioning (v3.4.0)",
      "Multi-cloud topology and hosting boundaries map (AWS / GCP / Azure)",
      "Data classification levels (Public, Internal, Confidential, Restricted)",
      "AI Governance Registry (ISO 42001 & EU AI Act model inventory)",
      "Strict context approval workflows before agent synthesis",
    ],
    roleBenefits: [
      { role: "CISO / Compliance Lead", benefit: "Maintain a single, audit-defensible source of truth for company scope and boundaries." },
      { role: "Engineering Team", benefit: "Eliminate repetitive context questionnaires when rolling out new systems." },
      { role: "Auditors & Assessors", benefit: "Instantly verify management assertions and system boundaries with timestamped history." }
    ],
    securityNotes: "Context profiles are cryptographically hashed and strictly tenant-isolated. Context revisions require dual-custody approval.",
    connections: ["Normora Controls", "Normora Agents", "Normora Audit"],
    metrics: [
      { label: "Grounding Accuracy", value: "99.8%" },
      { label: "Approved Revisions", value: "v3.4 Active" },
    ]
  },
  {
    id: "controls",
    name: "Normora Controls",
    tagline: "A universal control library mapped across multiple standards",
    description: "Implement once, comply everywhere. A unified universal control graph mapped dynamically across SOC 2 Type II, ISO 27001:2022, HIPAA, GDPR, ISO 42001, and EU AI Act.",
    capabilities: [
      "Single universal control cross-mapped to 5+ global frameworks",
      "Automated evidence and deterministic test binding",
      "Dynamic applicability toggles and formal exception waiver logs",
      "Responsible owner and executive reviewer assignment with SLA alerts",
      "Zero redundant engineering effort across overlapping compliance mandates",
    ],
    roleBenefits: [
      { role: "Founders & CEOs", benefit: "Add new compliance certifications (e.g. ISO 42001 or HIPAA) with 70%+ existing control reuse." },
      { role: "Control Owners", benefit: "Own a single technical safeguard instead of fulfilling 5 separate audit spreadsheets." }
    ],
    securityNotes: "Control mappings are deterministic and versioned. Changes generate immutable audit log entries.",
    connections: ["Normora Connect", "Normora Evidence", "Normora Operations"],
    metrics: [
      { label: "Universal Controls", value: "124 Mapped" },
      { label: "Framework Cross-Over", value: "78% Reuse" },
    ]
  },
  {
    id: "connect",
    name: "Normora Connect",
    tagline: "Read-only integrations and governed data sources",
    description: "Connect cloud providers, version control, identity providers, and ticketing systems using strictly scoped, read-only OIDC IAM roles and Workload Identity Federation.",
    capabilities: [
      "Zero persistent static credentials (OIDC IAM & Workload Identity)",
      "Read-only least-privilege permissions by default",
      "Continuous asset discovery and signal polling (hourly / 15-minute)",
      "Connector health status, sync telemetry, and failover notifications",
      "Single-click revocation and zero data retention on disconnect",
    ],
    roleBenefits: [
      { role: "Security & Cloud Engineers", benefit: "No long-lived API keys or root tokens. Inspect precise read-only IAM policies." },
      { role: "Auditors", benefit: "Verifiable direct-from-source data extraction with tamper-evident chain of custody." }
    ],
    securityNotes: "Credentials encrypted with tenant-specific KMS envelope encryption. Connectors cannot perform write operations.",
    connections: ["Normora Evidence", "Normora Operations", "Normora Risk"],
    metrics: [
      { label: "Live Connectors", value: "7 Active" },
      { label: "Discovered Assets", value: "620+ Monitored" },
    ]
  },
  {
    id: "evidence",
    name: "Normora Evidence",
    tagline: "Automated evidence collection with defensible cryptographic provenance",
    description: "Every piece of evidence gathered by Normora includes cryptographic SHA-256 signatures, collector lineage, scope timestamps, and raw JSON payloads for frictionless auditor verification.",
    capabilities: [
      "Immutable SHA-256 cryptographic hashing on all collected payloads",
      "Continuous automated evidence refreshing (zero stale artifacts)",
      "Direct raw-data viewer with auditor suitability inspection",
      "Automated evidence binding to universal controls and frameworks",
      "One-click signed audit bundle zip export with verified manifest",
    ],
    roleBenefits: [
      { role: "Auditors & Assessors", benefit: "Inspect cryptographic proof, origin connector, and collection timestamps in seconds." },
      { role: "Engineering Leads", benefit: "Never take another manual screenshot or export cloud console pages." }
    ],
    securityNotes: "WORM (Write Once, Read Many) compliant storage with signed SHA-256 verification hashes.",
    connections: ["Normora Controls", "Normora Audit", "Normora Agents"],
    metrics: [
      { label: "Verified Artifacts", value: "100% SHA-256" },
      { label: "Evidence Freshness", value: "98.4% Up-to-Date" },
    ]
  },
  {
    id: "agents",
    name: "Normora Agents",
    tagline: "Human-reviewed AI compliance agents studio",
    description: "Server-side AI compliance agents that retrieve tenant-approved context and evidence to draft policies, assess risks, detect compliance gaps, evaluate vendors, and synthesize security questionnaires.",
    capabilities: [
      "Six specialized agents: Policy, Risk, Gap, Evidence, Vendor, and Questionnaire",
      "Mandatory human-in-the-loop approval workflow (Draft -> Review -> Approved)",
      "Zero training on customer data & tenant-scoped permission boundaries",
      "Verifiable source citations and confidence metrics on every recommendation",
      "Automated prompt-injection and adversarial defense guards",
    ],
    roleBenefits: [
      { role: "Compliance Leaders", benefit: "Reduce security questionnaire and policy drafting time by 85% with verified citations." },
      { role: "Executive Reviewers", benefit: "Full transparency: see exactly what evidence the agent analyzed before approving." }
    ],
    securityNotes: "Tenant data is never used to train foundational AI models. Enterprise server-side isolation.",
    connections: ["Normora Context", "Normora Evidence", "Normora Policies"],
    metrics: [
      { label: "Time Saved", value: "85% Reduction" },
      { label: "Human Review Gate", value: "100% Enforced" },
    ]
  },
  {
    id: "risk",
    name: "Normora Risk",
    tagline: "Enterprise and third-party risk management with quantitative scoring",
    description: "Centralized enterprise risk register paired with comprehensive vendor risk management, subprocessor monitoring, SOC 2 report expiration tracking, and interactive 5x5 heatmap visualization.",
    capabilities: [
      "Mathematical Inherent vs. Residual risk calculation (Likelihood x Impact)",
      "Interactive 5x5 enterprise risk matrix with treatment task tracking",
      "Vendor and subprocessor inventory with critical data access tiers",
      "Automated vendor SOC 2 / ISO certificate expiration countdowns",
      "Direct linkage between identified risks and mitigation controls",
    ],
    roleBenefits: [
      { role: "Risk Committee & Board", benefit: "Clear, quantitative visual risk posture with traceable mitigation roadmap." },
      { role: "Procurement & Security", benefit: "Automated vendor onboarding reviews with AI-assisted report analysis." }
    ],
    securityNotes: "Vendor data access tiers and DPA commitments tracked with audit-ready log history.",
    connections: ["Normora Controls", "Normora Agents", "Normora Trust"],
    metrics: [
      { label: "Mitigated Risks", value: "4 Tracked" },
      { label: "Subprocessors", value: "8 Assessed" },
    ]
  },
  {
    id: "audit",
    name: "Normora Audit",
    tagline: "A collaborative, controlled audit workspace with scope freeze",
    description: "Run audits smoothly in a dedicated, time-bounded workspace. Invite external auditors with granular read-only access, immutable evidence snapshots, and structured sampling workflows.",
    capabilities: [
      "Time-bounded auditor guest role with scoped read-only permissions",
      "Evidence freeze snapshot with immutable cryptographic root hash",
      "Auditor sample request tracker with automated population extraction",
      "Real-time audit progress, observation logs, and corrective action workflows",
      "Auditor-ready export package generation with cryptographic manifests",
    ],
    roleBenefits: [
      { role: "External Auditors", benefit: "Clean, structured evidence vault with direct provenance and raw payloads." },
      { role: "Compliance Admins", benefit: "No uncontrolled Slack channels or lost email attachments during audit season." }
    ],
    securityNotes: "Auditor access is strictly time-bounded and logged with non-repudiable audit access trails.",
    connections: ["Normora Evidence", "Normora Controls", "Normora Trust"],
    metrics: [
      { label: "Active Engagements", value: "2 in Progress" },
      { label: "Audit Cycle Speed", value: "3x Faster" },
    ]
  },
  {
    id: "trust",
    name: "Normora Trust",
    tagline: "Customer-facing assurance and live public/gated security portal",
    description: "Turn security and compliance into a competitive sales accelerator. Showcase live compliance status, approved certifications, public DPAs, and gated penetration test reports behind clickwrap NDAs.",
    capabilities: [
      "Public trust center with live compliance posture indicator",
      "NDA-gated confidential resource repository (Penetration Tests, SOC 2 Reports)",
      "Automated clickwrap NDA verification and access request approvals",
      "Real-time subprocessor directory and data residency disclosures",
      "Instant questionnaire acceleration powered by certified Trust Profile",
    ],
    roleBenefits: [
      { role: "Sales & Account Executives", benefit: "Close enterprise deals faster by sharing self-serve verified security posture." },
      { role: "Customer Security Reviewers", benefit: "Access verified reports and answers without weeks of back-and-forth emails." }
    ],
    securityNotes: "Gated document access requires verified corporate domain and logged NDA consent.",
    connections: ["Normora Controls", "Normora Risk", "Normora Audit"],
    metrics: [
      { label: "Deal Acceleration", value: "40% Faster" },
      { label: "Live Uptime Posture", value: "99.99%" },
    ]
  }
];

export const frameworksData: FrameworkInfo[] = [
  {
    id: "soc-2",
    code: "SOC 2",
    name: "SOC 2 Type II (AICPA Trust Services Criteria)",
    category: "Security & Availability",
    description: "The gold standard for technology companies serving North American enterprises, evaluating Security, Availability, Processing Integrity, Confidentiality, and Privacy over a multi-month testing period.",
    whoUses: "B2B SaaS companies, cloud providers, and technology vendors processing customer data.",
    readinessApproach: "Normora continuously maps CC6.1-CC9.2 controls to cloud IAM, branch protection, KMS encryption, and vulnerability management tests.",
    keyControls: ["Access Provisioning & Deprovisioning", "Infrastructure Vulnerability Scanning", "Production Change Management", "Incident Response Testing"],
    disclaimer: "Normora provides continuous controls and readiness automation; official SOC 2 attestation is conducted by licensed independent CPA firms.",
    officialRef: "https://www.aicpa-cima.com"
  },
  {
    id: "iso-27001",
    code: "ISO 27001",
    name: "ISO/IEC 27001:2022 Information Security Management",
    category: "Global Security Standard",
    description: "The premier international standard for Information Security Management Systems (ISMS), specifying requirements for establishing, implementing, maintaining, and continually improving information security.",
    whoUses: "Global technology enterprises, European market entrants, and multinational B2B vendors.",
    readinessApproach: "Normora maps ISO Annex A.5 through A.8 safeguards directly to universal controls, tracking ISMS governance clauses 4 through 10 with versioned context.",
    keyControls: ["Organizational Safeguards (A.5)", "People Controls (A.6)", "Physical Security (A.7)", "Technological Safeguards (A.8)"],
    disclaimer: "Official ISO/IEC 27001:2022 certification is issued exclusively by accredited third-party certification bodies.",
    officialRef: "https://www.iso.org/isoiec-27001-information-security.html"
  },
  {
    id: "hipaa",
    code: "HIPAA",
    name: "HIPAA Security & Privacy Rules",
    category: "Healthcare Data Protection",
    description: "United States federal standards protecting the security and confidentiality of Protected Health Information (PHI) and electronic PHI (ePHI) across Covered Entities and Business Associates.",
    whoUses: "Digital health startups, healthtech SaaS, telehealth platforms, and health data processors.",
    readinessApproach: "Continuous monitoring for ePHI encryption at rest and in transit, Business Associate Agreement (BAA) vendor tracking, and granular audit log retention.",
    keyControls: ["Administrative Safeguards (§164.308)", "Physical Safeguards (§164.310)", "Technical Safeguards (§164.312)", "BAA Tracking"],
    disclaimer: "HIPAA compliance is an ongoing legal and operational requirement; government bodies do not issue formal certificates.",
    officialRef: "https://www.hhs.gov/hipaa"
  },
  {
    id: "gdpr",
    code: "GDPR",
    name: "EU General Data Protection Regulation (GDPR)",
    category: "Data Privacy & Governance",
    description: "The European Union's comprehensive data privacy regulation regulating how personal data of EU residents is collected, stored, processed, and transferred globally.",
    whoUses: "Any software company or platform serving users located in the European Union or European Economic Area.",
    readinessApproach: "Automated Data Processing Agreement (DPA) tracking, subprocessor change notifications, Article 32 security measures verification, and data subject access workflows.",
    keyControls: ["Security of Processing (Art. 32)", "Data Minimization", "Records of Processing Activities (ROPA)", "Subprocessor Governance"],
    disclaimer: "GDPR requires ongoing legal and operational privacy governance; independent legal counsel is advised for complex transfers.",
    officialRef: "https://gdpr.eu"
  },
  {
    id: "iso-42001",
    code: "ISO 42001",
    name: "ISO/IEC 42001:2023 Artificial Intelligence Management",
    category: "AI Governance",
    description: "The world's first certifiable standard for Artificial Intelligence Management Systems (AIMS), addressing the unique risks, transparency, traceability, and ethical considerations of AI technologies.",
    whoUses: "AI model developers, generative AI startups, autonomous systems providers, and AI-enabled enterprise applications.",
    readinessApproach: "Normora tracks model inventories, training data provenance, prompt-injection testing, human oversight triggers, and bias evaluations.",
    keyControls: ["AI Risk Assessment (Cl. 6.1.2)", "Data for AI Systems (Annex A.7)", "AI System Lifecycle (Annex A.8)", "Transparency & Human Oversight"],
    disclaimer: "ISO/IEC 42001 certification is granted by accredited registrar assessment bodies.",
    officialRef: "https://www.iso.org/standard/81230.html"
  },
  {
    id: "eu-ai-act",
    code: "EU AI Act",
    name: "EU Artificial Intelligence Act (Regulation EU 2024/1689)",
    category: "AI Regulation",
    description: "The pioneering risk-based legislative framework governing the development, deployment, and marketing of artificial intelligence systems in the European Union.",
    whoUses: "Organizations developing, placing on the market, or putting into service AI systems in the European Union.",
    readinessApproach: "Categorizes AI risk tiers (Minimal, Specific Transparency, High Risk, Prohibited), tracking technical documentation, data governance, and post-market monitoring.",
    keyControls: ["Risk Categorization", "Technical Documentation (Annex IV)", "High-Risk AI Quality Management", "Transparency Obligations"],
    disclaimer: "Regulatory compliance under the EU AI Act follows statutory enforcement timelines established by the European Commission.",
    officialRef: "https://artificialintelligenceact.eu"
  }
];

export const integrationsData: IntegrationInfo[] = [
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    slug: "aws",
    category: "Cloud",
    authMethod: "OIDC IAM Role (Read-Only)",
    status: "Available",
    dataCollected: ["IAM Policies & Roles", "S3 Bucket Encryption & Public Access", "KMS Key Rotation", "CloudTrail & GuardDuty Logs", "Security Groups & VPC Config"],
    syncFrequency: "Hourly automated poll",
    permissions: "SecurityAudit & ViewOnlyAccess managed policy",
    description: "Seamless read-only continuous posture evaluation across all your AWS accounts without static IAM keys.",
    iconText: "AWS"
  },
  {
    id: "gcp",
    name: "Google Cloud Platform (GCP)",
    slug: "gcp",
    category: "Cloud",
    authMethod: "Workload Identity Federation",
    status: "Available",
    dataCollected: ["IAM & Service Account Roles", "Cloud Storage Bucket Permissions", "KMS Key Configuration", "Cloud Logging & Cloud Armor", "Vertex AI System Registry"],
    syncFrequency: "Hourly automated poll",
    permissions: "roles/viewer and roles/securityReviewer",
    description: "Direct-from-source GCP infrastructure and Vertex AI governance monitoring with zero long-lived credentials.",
    iconText: "GCP"
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    slug: "azure",
    category: "Cloud",
    authMethod: "Managed Identity / App Registration",
    status: "Available",
    dataCollected: ["Microsoft Entra ID Access", "Azure Key Vault Rotation", "Storage Account Encryption", "NSG Rules", "Azure Security Center Recommendations"],
    syncFrequency: "Hourly automated poll",
    permissions: "Reader & Security Reader",
    description: "Comprehensive Azure cloud infrastructure and Entra ID compliance monitoring.",
    iconText: "AZR"
  },
  {
    id: "github",
    name: "GitHub Enterprise",
    slug: "github",
    category: "Source Control",
    authMethod: "GitHub App (Read-Only)",
    status: "Available",
    dataCollected: ["Branch Protection Rules", "Required Pull Request Reviews", "Secret Scanning Alerts", "Dependabot Security Alerts", "MFA Enforcement"],
    syncFrequency: "15-minute sync + Webhooks",
    permissions: "Read-only repository metadata and branch policies",
    description: "Verify software development lifecycle safeguards, code reviews, and dependency vulnerability tracking.",
    iconText: "GH"
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    slug: "google-workspace",
    category: "Identity",
    authMethod: "Google OAuth 2.0 (Read-Only)",
    status: "Available",
    dataCollected: ["Employee Directory Status", "MFA / 2-Step Verification", "Password Policy Enforcement", "Super Admin Accounts List"],
    syncFrequency: "Hourly automated sync",
    permissions: "https://www.googleapis.com/auth/admin.directory.user.readonly",
    description: "Automate workforce onboarding and offboarding evidence, MFA verification, and access reviews.",
    iconText: "GWS"
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    slug: "microsoft-365",
    category: "Identity",
    authMethod: "Microsoft Graph API",
    status: "Available",
    dataCollected: ["User Directory & Employment State", "Conditional Access MFA", "Admin Privilege Lists", "Device Compliance"],
    syncFrequency: "Hourly automated sync",
    permissions: "User.Read.All, Policy.Read.All",
    description: "Verify identity security, MFA adoption, and administrative access controls across Microsoft 365.",
    iconText: "M365"
  },
  {
    id: "jira",
    name: "Jira Software & Cloud",
    slug: "jira",
    category: "Task Management",
    authMethod: "Atlassian OAuth 2.0 (3LO)",
    status: "Available",
    dataCollected: ["Security Ticket SLAs", "Vulnerability Remediation Tasks", "Access Request Tickets", "Change Management Approvals"],
    syncFrequency: "15-minute sync",
    permissions: "read:jira-work, read:jira-user",
    description: "Link security remediation and change management tickets directly to universal control operations.",
    iconText: "JRA"
  },
  {
    id: "slack",
    name: "Slack Enterprise",
    slug: "slack",
    category: "Productivity",
    authMethod: "Slack Bot Token (OAuth)",
    status: "Available",
    dataCollected: ["Security Incident Channels", "Control Owner Alert Acknowledgements", "Weekly Assurance Digest"],
    syncFrequency: "Real-time webhook events",
    permissions: "channels:read, chat:write",
    description: "Send actionable compliance alerts, exception approvals, and evidence renewal requests directly to engineers.",
    iconText: "SLK"
  }
];

export const solutionsData: SolutionInfo[] = [
  {
    slug: "ai-companies",
    title: "AI Companies & Foundation Model Builders",
    subtitle: "Navigate ISO 42001 and EU AI Act without slowing down frontier development.",
    problem: "Rapidly evolving AI regulations require tracking model inventory, training data lineage, prompt injection testing, and transparency obligations alongside standard SOC 2 requirements.",
    outcomes: [
      "Catalog models, weights, and fine-tuning datasets in Normora Context",
      "Deploy ISO 42001 universal controls alongside SOC 2 without duplicate effort",
      "Automate prompt-injection and alignment test evidence collection",
      "Generate audit-ready AI System Transparency reports in seconds"
    ],
    recommendedModules: ["Normora Context", "Normora Controls", "Normora Agents", "Normora Risk"],
    frameworks: ["ISO 42001", "EU AI Act", "SOC 2", "ISO 27001"]
  },
  {
    slug: "healthcare-saas",
    title: "Digital Health & HealthTech SaaS",
    subtitle: "Unify HIPAA, SOC 2, and cloud security controls across your entire data stack.",
    problem: "Healthtech startups get tangled in overlapping HIPAA administrative safeguards, cloud encryption requirements, vendor BAAs, and enterprise hospital security reviews.",
    outcomes: [
      "Continuous verification of ePHI encryption at rest and in transit across AWS/GCP",
      "Centralized subprocessor BAA tracking with automated expiration alerts",
      "Automated evidence collection for annual HIPAA risk assessments",
      "Accelerate hospital vendor security questionnaires using Normora Trust"
    ],
    recommendedModules: ["Normora Controls", "Normora Evidence", "Normora Risk", "Normora Trust"],
    frameworks: ["HIPAA", "SOC 2", "GDPR", "ISO 27001"]
  },
  {
    slug: "b2b-saas",
    title: "B2B SaaS & Enterprise Software",
    subtitle: "Turn enterprise security reviews from a sales bottleneck into a growth flywheel.",
    problem: "Enterprise deals stall out when prospective customers demand SOC 2 Type II reports, penetration testing results, and 150-question custom security spreadsheets.",
    outcomes: [
      "Reach audit readiness for SOC 2 Type II in weeks, not months",
      "Share public and NDA-gated compliance reports via Normora Trust",
      "Answer vendor questionnaires 85% faster using AI Questionnaire Agent",
      "Continuous control monitoring to prevent audit surprises"
    ],
    recommendedModules: ["Normora Controls", "Normora Connect", "Normora Agents", "Normora Trust"],
    frameworks: ["SOC 2", "ISO 27001", "GDPR"]
  },
  {
    slug: "consultants",
    title: "vCISOs, MSPs & Compliance Advisors",
    subtitle: "Deliver repeatable, multi-tenant continuous assurance across all your client accounts.",
    problem: "Advisory firms struggle to manage dozens of client spreadsheets, evidence folders, and disparate auditor questionnaires.",
    outcomes: [
      "Multi-tenant partner dashboard with client workspace separation",
      "Reusable universal control baseline templates tailored to client industries",
      "AI-assisted policy drafting and gap assessments for rapid client onboarding",
      "Export standardized audit packs directly to accredited CPA partners"
    ],
    recommendedModules: ["Normora Controls", "Normora Context", "Normora Audit", "Normora Agents"],
    frameworks: ["SOC 2", "ISO 27001", "HIPAA", "ISO 42001"]
  }
];

export const resourcesArticlesData: ResourceArticle[] = [
  {
    slug: "what-continuous-assurance-actually-means",
    title: "What Continuous Assurance Actually Means in 2026",
    category: "Assurance Engineering",
    readTime: "6 min read",
    date: "August 18, 2026",
    excerpt: "Why point-in-time compliance snapshots are broken, and how deterministic infrastructure tests turn obligations into living control systems.",
    content: [
      "For over two decades, enterprise compliance has operated on an annual panic cycle. Companies spend nine months ignoring compliance controls, followed by three frantic months of collecting screenshots, backdating policy signatures, and begging engineers to export cloud logs.",
      "Continuous assurance fundamentally replaces this manual scramble with automated telemetry. By binding cloud APIs, source code repositories, and identity providers directly to universal controls, organizations test technical safeguards every single hour.",
      "When a misconfiguration occurs—such as a public S3 bucket or a repository lacking branch protection—the system flags it instantly rather than discovering it nine months later during an auditor sample selection."
    ],
    author: "Normora Research & Engineering",
    reviewedDate: "2026-08-18"
  },
  {
    slug: "evidence-provenance-beyond-screenshots",
    title: "Evidence Provenance: What Auditors Need Beyond Screenshots",
    category: "Auditor Insights",
    readTime: "8 min read",
    date: "August 12, 2026",
    excerpt: "Screenshots can be forged, manipulated, or taken out of context. Here is why cryptographic hashes and raw JSON payloads represent the future of audit defense.",
    content: [
      "Ask any experienced CPA or ISO lead assessor about their biggest frustration, and they will tell you: contextless screenshots.",
      "A PNG image of a cloud console cannot prove who took it, what account it came from, whether it represents the entire population, or whether it was captured during the actual period under audit.",
      "Normora Evidence introduces cryptographic SHA-256 signatures, collector lineage, and raw API response payloads. When an auditor inspects an artifact, they verify its exact origin, UTC timestamp, and mathematical hash in seconds."
    ],
    author: "Normora Assurance Architecture",
    reviewedDate: "2026-08-12"
  },
  {
    slug: "universal-controls-across-soc2-and-iso27001",
    title: "Universal Controls: Mapping SOC 2, ISO 27001, and ISO 42001",
    category: "Framework Architecture",
    readTime: "7 min read",
    date: "August 05, 2026",
    excerpt: "How to design a single universal control library that satisfies 75%+ of global compliance requirements without redundant engineering.",
    content: [
      "If you implement access control for SOC 2 (CC6.1), you should not have to re-engineer access control for ISO 27001 (Annex A.5.15) or HIPAA (§164.312).",
      "Universal control modeling creates a single operational safeguard—e.g. 'Automated Multi-Factor Authentication on All Cloud & Identity Accounts'—and maps it to every relevant regulatory requirement.",
      "This approach reduces engineering overhead by over 70% while ensuring complete traceability during cross-framework audits."
    ],
    author: "Normora Framework Intelligence",
    reviewedDate: "2026-08-05"
  },
  {
    slug: "human-accountability-in-ai-compliance",
    title: "Human Accountability in AI-Assisted Compliance",
    category: "AI Governance",
    readTime: "5 min read",
    date: "July 28, 2026",
    excerpt: "Why autonomous AI compliance agents must never replace human control owners, and how structured citation reviews protect governance.",
    content: [
      "AI is exceptionally capable at synthesizing large volumes of regulatory text, drafting comprehensive policies, and analyzing third-party SOC 2 reports. However, AI cannot be held legally or operationally accountable for organizational security.",
      "At Normora, we enforce a strict principle: deterministic testing validates technical truth, while AI agents draft and synthesize under human-in-the-loop oversight.",
      "Every agent output is accompanied by verifiable citations, uncertainty ratings, and a required review gate before it enters production compliance records."
    ],
    author: "Normora AI Governance Team",
    reviewedDate: "2026-07-28"
  }
];
