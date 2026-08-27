import React, { useState } from "react";
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  Lock,
  ExternalLink,
  Plus,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { PartnerClient } from "../../types/grc";

interface PartnerViewProps {
  clients: PartnerClient[];
  activeTenantId: string;
  onSelectTenant: (tenantId: string) => void;
}

export const PartnerView: React.FC<PartnerViewProps> = ({
  clients,
  activeTenantId,
  onSelectTenant,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientIndustry, setNewClientIndustry] = useState("Healthcare SaaS & Clinical AI");

  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === "all" || c.tier.toLowerCase() === selectedTier.toLowerCase();
    return matchesSearch && matchesTier;
  });

  const totalClients = clients.length;
  const avgReadiness = Math.round(
    clients.reduce((acc, c) => acc + c.readinessScore, 0) / (totalClients || 1)
  );
  const totalOpenTasks = clients.reduce((acc, c) => acc + c.openTasksCount, 0);

  return (
    <div className="space-y-6">
      {/* MSP Header */}
      <div className="bg-slate-900 text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Workflow M • Partner Edition
            </span>
            <span className="text-xs text-slate-400 font-mono">Aster Assurance Partners Portfolio</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span>MSP &amp; Fractional vCISO Client Portfolio</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Multi-tenant continuous assurance console for managing cross-client compliance postures, evidence generation pipelines, and scoped auditor engagements with strict logical isolation.
          </p>
        </div>

        {/* Global Summary */}
        <div className="flex items-center gap-6 bg-slate-800/80 border border-slate-700/80 rounded-md px-5 py-3 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Managed Tenants</span>
            <span className="text-2xl font-black text-white font-mono">{totalClients}</span>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Avg Readiness</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">{avgReadiness}%</span>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Open Action Items</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{totalOpenTasks}</span>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter clients by name, industry, or framework..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 rounded-md px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer font-medium text-slate-800"
            >
              <option value="all">All Tiers</option>
              <option value="enterprise">Enterprise</option>
              <option value="growth">Growth</option>
              <option value="seed">Seed</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Provision New Client Tenant</span>
        </button>
      </div>

      {/* Client Tenant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => {
          const isActive = client.id === activeTenantId;

          return (
            <div
              key={client.id}
              className={`bg-white rounded-lg border transition-all flex flex-col justify-between ${
                isActive
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                  : "border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                        {client.tier}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        {client.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">{client.name}</h3>
                    <p className="text-xs text-slate-500">{client.industry}</p>
                  </div>

                  {isActive && (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      Active Scope
                    </span>
                  )}
                </div>

                {/* Score & Cloud */}
                <div className="bg-slate-50 rounded-md p-3 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Readiness Score</span>
                    <span className="text-xl font-black text-slate-900 font-mono">{client.readinessScore}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Cloud Stack</span>
                    <span className="text-xs font-mono font-semibold text-slate-700">{client.primaryCloud}</span>
                  </div>
                </div>

                {/* Frameworks */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Active Programs:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {client.frameworks.map((fw, idx) => (
                      <span key={idx} className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Items count */}
                <div className="text-xs font-mono text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                  <span>Open Tasks: <strong className="text-slate-900">{client.openTasksCount}</strong></span>
                  <span>Failing Checks: <strong className={client.failingChecksCount > 0 ? "text-amber-600" : "text-emerald-600"}>{client.failingChecksCount}</strong></span>
                </div>
              </div>

              {/* Bottom Switch button */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-lg">
                <button
                  onClick={() => onSelectTenant(client.id)}
                  disabled={isActive}
                  className={`w-full py-2 px-3 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white font-bold cursor-default"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {isActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Current Active Tenant Workspace</span>
                    </>
                  ) : (
                    <>
                      <span>Switch to this Tenant Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Tenant Isolation Security Assurance Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex items-start gap-4">
        <div className="p-2 bg-slate-900 text-white rounded-md shrink-0 mt-0.5">
          <Lock className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Cryptographic Multi-Tenant Isolation Guarantee
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            All tenant data, evidence hashes, automated check runs, and AI agent prompt sessions are strictly scoped by tenant isolation boundaries in PostgreSQL with Row-Level Security (RLS). No cross-client data or telemetry leakage is permitted.
          </p>
        </div>
      </div>

      {/* Provision Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Provision New Client Tenant</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Company Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Health Systems Inc."
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Industry Sector</label>
                <select
                  value={newClientIndustry}
                  onChange={(e) => setNewClientIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-slate-900"
                >
                  <option value="Healthcare SaaS & Clinical AI">Healthcare SaaS &amp; Clinical AI</option>
                  <option value="Enterprise Fintech & B2B">Enterprise Fintech &amp; B2B</option>
                  <option value="AI / Foundation Model Developer">AI / Foundation Model Developer</option>
                  <option value="E-Commerce & Retail">E-Commerce &amp; Retail</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Target Compliance Frameworks</label>
                <div className="space-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                    <span>SOC 2 Type II (Security &amp; Confidentiality)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                    <span>ISO/IEC 27001:2022</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                    <span>HIPAA Security &amp; Privacy Rule</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                    <span>ISO/IEC 42001 (AI Governance)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Tenant workspace successfully created for ${newClientName || "Apex Health Systems"}! Provisioned with ISO 27001, SOC 2, and HIPAA control baselines.`);
                  setShowInviteModal(false);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-1.5 rounded cursor-pointer"
              >
                Complete Provisioning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
