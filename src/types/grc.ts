export type ProductModule =
  | "overview"
  | "context"
  | "controls"
  | "connect"
  | "evidence"
  | "agents"
  | "risk"
  | "audit"
  | "trust"
  | "operations"
  | "policies";

export type FrameworkId = "soc2" | "iso27001" | "hipaa" | "gdpr" | "iso42001";

export interface Framework {
  id: FrameworkId;
  name: string;
  code: string;
  version: string;
  description: string;
  category: "Security" | "Privacy" | "AI Governance" | "Healthcare";
  totalRequirements: number;
  mappedControlsCount: number;
  readinessPercentage: number;
  status: "Active" | "Scoping" | "Target Q4";
  icon: string;
}

export type ControlStatus = "Effective" | "Testing Pending" | "Evidence Pending" | "Ineffective" | "Exception Approved" | "Not Started";

export interface UniversalControl {
  id: string;
  code: string;
  title: string;
  category: "Access Control" | "Cryptography" | "Operations & Monitoring" | "Human Resources" | "Vendor & Third-Party" | "AI Safety & Governance" | "Data Protection";
  description: string;
  owner: string;
  reviewer: string;
  frequency: "Continuous" | "Weekly" | "Monthly" | "Quarterly" | "Annual";
  status: ControlStatus;
  frameworkMappings: {
    frameworkId: FrameworkId;
    requirementCode: string;
    requirementTitle: string;
    rationale: string;
  }[];
  automatedTestId?: string;
  lastTested?: string;
  evidenceIds: string[];
}

export interface Connector {
  id: string;
  name: string;
  type: "Cloud Infrastructure" | "Source Control" | "Identity & Workspace" | "Ticketing & Ops" | "Collaboration" | "Custom";
  icon: string;
  status: "Connected" | "Syncing" | "Beta" | "Request" | "Disconnected";
  health: "Healthy" | "Degraded" | "Requires Re-auth" | "N/A";
  lastSync: string;
  nextSync: string;
  assetsDiscovered: number;
  automatedTestsCount: number;
  scopes: string[];
  connectionMethod: "OIDC Role Assumption" | "OAuth 2.0" | "Workload Identity" | "API Token (Vault)";
}

export interface EvidenceArtifact {
  id: string;
  title: string;
  sourceConnector: string;
  category: "Configuration" | "Access Review" | "Vulnerability Scan" | "Policy Sign-off" | "Audit Log" | "Penetration Test";
  collectionTimestamp: string;
  periodCovered: string;
  fileFormat: string;
  fileSize: string;
  sha256Hash: string;
  status: "Verified & Fresh" | "Expiring Soon" | "Stale" | "Requires Human Review";
  mappedControls: string[];
  uploadedBy: string;
  legalHold: boolean;
}

export interface AutomatedTest {
  id: string;
  code: string;
  title: string;
  controlId: string;
  connectorId: string;
  frequency: string;
  lastRun: string;
  result: "PASS" | "FAIL" | "ERROR" | "EXCEPTION";
  evaluationRule: string;
  observedValue: string;
  expectedValue: string;
  remediationGuidance: string;
}

export interface RiskItem {
  id: string;
  title: string;
  threatActor: string;
  category: "Security" | "Privacy" | "Operational" | "Third-Party" | "AI & Model Safety" | "Compliance";
  inherentLikelihood: number; // 1-5
  inherentImpact: number; // 1-5
  inherentScore: number; // calculated L x I
  mitigatingControls: string[];
  treatment: "Mitigate" | "Avoid" | "Transfer" | "Accept";
  residualLikelihood: number;
  residualImpact: number;
  residualScore: number;
  owner: string;
  status: "Open" | "Mitigated" | "Accepted (Waiver)" | "Under Review";
  reviewCadence: string;
  nextReviewDate: string;
}

export interface VendorItem {
  id: string;
  name: string;
  category: "Cloud Hosting" | "Data Pipeline" | "Observability" | "CRM & Support" | "AI Infrastructure";
  criticality: "Tier 1 - Critical" | "Tier 2 - High" | "Tier 3 - Medium" | "Tier 4 - Low";
  dataAccessLevel: "Customer PII & Production" | "Internal Metadata" | "No Production Access";
  certifications: string[];
  dpaStatus: "Executed & Active" | "Pending Review" | "Not Applicable";
  soc2Expiry: string;
  inherentRisk: "High" | "Medium" | "Low";
  status: "Approved" | "Conditionally Approved" | "Under Review" | "Remediation Required";
  lastReviewed: string;
}

export interface PolicyItem {
  id: string;
  code: string;
  title: string;
  version: string;
  status: "Published & Active" | "In Review" | "Draft" | "Requires Annual Review";
  owner: string;
  approver: string;
  lastApprovedDate: string;
  acknowledgementRate: number; // e.g. 98%
  totalAssigned: number;
  mappedControlsCount: number;
  summary: string;
}

export interface AgentRunRecord {
  id: string;
  agentType: "Policy Agent" | "Risk Agent" | "Evidence Agent" | "Gap Agent" | "Vendor Agent" | "Questionnaire Agent";
  timestamp: string;
  trigger: string;
  status: "Approved" | "Needs Review" | "Draft" | "Rejected";
  confidenceScore: number;
  groundingCitations: string[];
  summary: string;
  structuredOutput: any;
}

export interface AuditEngagement {
  id: string;
  title: string;
  auditorFirm: string;
  framework: string;
  auditType: "SOC 2 Type II" | "ISO 27001 Surveillance" | "HIPAA Security Evaluation";
  period: string;
  status: "Fieldwork Active" | "Evidence Freeze" | "Findings Draft" | "Completed";
  progressPct: number;
  scopedControlsCount: number;
  evidencePackageHash: string;
  auditorAccessExpiry: string;
  openRequests: number;
  findingsCount: number;
}

export interface ContextProfile {
  companyName: string;
  tradingName: string;
  legalEntity: string;
  headquarters: string;
  operatingJurisdictions: string[];
  businessModel: string;
  workforceSize: string;
  workModel: string;
  hostingRegions: string[];
  primaryCloud: string;
  dataClassificationLevels: string[];
  aiSystemsInProduction: boolean;
  aiUseCases: string[];
  targetCertifications: string[];
  updatedAt: string;
  version: string;
  completionScore: number;
}
