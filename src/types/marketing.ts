export interface MarketingNavSection {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface PlatformModuleInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  roleBenefits: { role: string; benefit: string }[];
  securityNotes: string;
  connections: string[];
  metrics: { label: string; value: string }[];
}

export interface FrameworkInfo {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  whoUses: string;
  readinessApproach: string;
  keyControls: string[];
  disclaimer: string;
  officialRef: string;
}

export interface IntegrationInfo {
  id: string;
  name: string;
  slug: string;
  category: "Cloud" | "Source Control" | "Identity" | "Productivity" | "Task Management" | "AI & Observability";
  authMethod: string;
  status: "Available" | "Beta" | "Planned";
  dataCollected: string[];
  syncFrequency: string;
  permissions: string;
  description: string;
  iconText: string;
}

export interface ResourceArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  author: string;
  reviewedDate: string;
}

export interface SolutionInfo {
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  outcomes: string[];
  recommendedModules: string[];
  frameworks: string[];
}
