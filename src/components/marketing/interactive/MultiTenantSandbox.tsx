import React, { useState } from "react";
import {
  Building2,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  Plus,
  CheckCircle2,
  Lock,
  ArrowRight,
  Server,
  Database,
  ExternalLink,
} from "lucide-react";

interface TenantData {
  id: string;
  name: string;
  badge: string;
  industry: string;
  readinessScore: number;
  criticalItems: number;
  highItems: number;
  medItems: number;
  totalControls: number;
  evidenceArtifacts: number;
  frameworks: string[];
  cloudRegions: string[];
  kmsStatus: string;
  recentAudit: string;
}

const mockTenants: Record<string, TenantData> = {
  northstar: {
    id: "TENANT-NORTHSTAR-01",
    name: "Northstar Health AI (Primary)",
    badge: "Healthcare SaaS",
    industry: "Clinical Diagnostic AI",
    readinessScore: 92,
    criticalItems: 0,
    highItems: 3,
    medItems: 11,
    totalControls: 142,
    evidenceArtifacts: 48,
    frameworks: ["HIPAA Security", "SOC 2 Type II", "ISO 42001"],
    cloudRegions: ["AWS us-east-1", "GCP us-central1"],
    kmsStatus: "AES-256 (KMS-CMK Dedicated)",
    recentAudit: "BDO SOC 2 Type II • In Progress",
  },
  cedar: {
    id: "TENANT-CEDAR-02",
    name: "Cedar B2B Cloud",
    badge: "Enterprise SaaS",
    industry: "Financial Data Processing",
    readinessScore: 88,
    criticalItems: 1,
    highItems: 5,
    medItems: 15,
    totalControls: 118,
    evidenceArtifacts: 36,
    frameworks: ["ISO 27001:2022", "SOC 2 Type II", "GDPR"],
    cloudRegions: ["AWS eu-west-1", "GCP europe-west3"],
    kmsStatus: "AES-256 (Cloud HSM Dedicated)",
    recentAudit: "Schellman ISO 27001 • Stage 2 Ready",
  },
  lumen: {
    id: "TENANT-LUMEN-03",
    name: "Lumen Clinical Systems",
    badge: "MedTech / AI",
    industry: "Radiology Telemetry Platform",
    readinessScore: 79,
    criticalItems: 2,
    highItems: 8,
    medItems: 24,
    totalControls: 165,
    evidenceArtifacts: 29,
    frameworks: ["HIPAA", "ISO 42001 AI Ethics", "SOC 2"],
    cloudRegions: ["Azure East US", "GCP us-east4"],
    kmsStatus: "AES-256 (Dedicated Key Vault)",
    recentAudit: "A-LIGN HIPAA & SOC 2 • Pre-Assessment",
  },
};

export const MultiTenantSandbox: React.FC<{ onExploreDemo?: () => void }> = ({
  onExploreDemo,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>("northstar");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [provisionToast, setProvisionToast] = useState<string | null>(null);
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);

  const tenant = mockTenants[selectedKey];

  const handleSelectTenant = (key: string) => {
    setSelectedKey(key);
    setIsDropdownOpen(false);
  };

  const handleInstantProvision = () => {
    setIsProvisioning(true);
    setTimeout(() => {
      setIsProvisioning(false);
      setProvisionToast("Tenant 'TENANT-APOLLO-9812' instantly provisioned with isolated KMS envelope & SOC 2 baseline!");
      setTimeout(() => {
        setProvisionToast(null);
      }, 5000);
    }, 900);
  };

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#0d121d] text-white p-6 shadow-2xl overflow-hidden">
      {/* Toast Notification */}
      {provisionToast && (
        <div className="absolute top-4 right-4 z-30 max-w-md bg-emerald-500 text-slate-950 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div className="text-xs font-semibold">
            <p className="font-bold">New Tenant Provisioned Successfully</p>
            <p className="text-[11px] opacity-90">{provisionToast}</p>
          </div>
        </div>
      )}

      {/* Top Bar Header & Interactive Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                MSP &amp; Advisory Console (Workflow M)
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Live Interactive Sandbox
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Portfolio Health &amp; Multi-Tenant Isolation
            </h4>
          </div>
        </div>

        {/* Tenant Switcher Dropdown */}
        <div className="relative">
          <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
            Switch Active Tenant Scope:
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between gap-3 bg-slate-900 border border-slate-700 hover:border-slate-600 px-3.5 py-2 rounded-lg text-xs font-medium text-white min-w-[240px] transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate font-semibold">{tenant.name}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-xl p-1.5 shadow-2xl z-20 space-y-1">
              {Object.entries(mockTenants).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => handleSelectTenant(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedKey === key
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">{t.industry}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-white">
                    {t.readinessScore}%
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Sandbox Body: Smoothly Updating Metrics */}
      <div className="pt-6 space-y-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Readiness Gauge */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              Continuous Readiness
            </p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-white font-mono">
                {tenant.readinessScore}%
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Audit Ready
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${tenant.readinessScore}%` }}
              />
            </div>
          </div>

          {/* Action Item Tally */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              Action Items Tally
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="text-center">
                <span className="text-xl font-bold font-mono text-rose-400">{tenant.criticalItems}</span>
                <p className="text-[9px] font-mono text-slate-400">CRITICAL</p>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-xl font-bold font-mono text-amber-400">{tenant.highItems}</span>
                <p className="text-[9px] font-mono text-slate-400">HIGH</p>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-xl font-bold font-mono text-slate-300">{tenant.medItems}</span>
                <p className="text-[9px] font-mono text-slate-400">MEDIUM</p>
              </div>
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-2">
              {tenant.criticalItems === 0 ? "✓ Zero blocking exceptions" : "Requires auditor approval"}
            </p>
          </div>

          {/* Universal Controls */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              Universal Control Graph
            </p>
            <p className="text-3xl font-extrabold text-white font-mono mt-2">
              {tenant.totalControls}
            </p>
            <p className="text-[10px] font-mono text-slate-400 mt-2">
              Reused across {tenant.frameworks.length} frameworks
            </p>
          </div>

          {/* Evidence Artifacts */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              Cryptographic Proofs
            </p>
            <p className="text-3xl font-extrabold text-emerald-400 font-mono mt-2">
              {tenant.evidenceArtifacts}
            </p>
            <p className="text-[10px] font-mono text-slate-400 mt-2 truncate">
              100% SHA-256 verified lineage
            </p>
          </div>
        </div>

        {/* Isolation Guarantee Bar & Provision CTA */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono text-slate-300 font-semibold">
                Logical Isolation Envelope: <strong className="text-white">{tenant.id}</strong>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
              <span>Regions: {tenant.cloudRegions.join(", ")}</span>
              <span>•</span>
              <span>KMS: <span className="text-emerald-300">{tenant.kmsStatus}</span></span>
              <span>•</span>
              <span>Frameworks: <span className="text-white">{tenant.frameworks.join(" + ")}</span></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstantProvision}
              disabled={isProvisioning}
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isProvisioning ? "Provisioning..." : "Instant Provision New Tenant"}</span>
            </button>
            {onExploreDemo && (
              <button
                onClick={onExploreDemo}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Launch in Full Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
