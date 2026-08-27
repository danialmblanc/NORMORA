import React, { useState, useMemo } from "react";
import {
  Database,
  Server,
  Cloud,
  Lock,
  Search,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Filter,
} from "lucide-react";

interface AssetItem {
  id: string;
  name: string;
  provider: "AWS" | "GCP" | "Azure" | "GitHub" | "Google";
  type: string;
  region: string;
  impactTier: "High" | "Medium" | "Low";
  encryptionState: "AES-256 (KMS)" | "TLS 1.3 Strict" | "Encrypted At Rest" | "MFA Enforced" | "Unencrypted";
  isCompliant: boolean;
}

const mockAssets: AssetItem[] = [
  {
    id: "AST-AWS-101",
    name: "AWS EKS Production Cluster",
    provider: "AWS",
    type: "Compute / Kubernetes",
    region: "us-east-1",
    impactTier: "High",
    encryptionState: "AES-256 (KMS)",
    isCompliant: true,
  },
  {
    id: "AST-AWS-102",
    name: "S3 Telemetry & Evidence Vault",
    provider: "AWS",
    type: "Storage / Object S3",
    region: "us-east-1",
    impactTier: "High",
    encryptionState: "AES-256 (KMS)",
    isCompliant: true,
  },
  {
    id: "AST-GCP-201",
    name: "GCP Cloud SQL Postgres Primary",
    provider: "GCP",
    type: "Database / Relational",
    region: "us-central1",
    impactTier: "High",
    encryptionState: "AES-256 (KMS)",
    isCompliant: true,
  },
  {
    id: "AST-GCP-202",
    name: "Vertex AI Gemini Pipeline",
    provider: "GCP",
    type: "AI / ML Inference",
    region: "us-central1",
    impactTier: "High",
    encryptionState: "AES-256 (KMS)",
    isCompliant: true,
  },
  {
    id: "AST-GH-301",
    name: "GitHub Core Monorepo",
    provider: "GitHub",
    type: "Source Code Management",
    region: "Global",
    impactTier: "High",
    encryptionState: "TLS 1.3 Strict",
    isCompliant: true,
  },
  {
    id: "AST-WS-401",
    name: "Google Workspace Corporate Tenant",
    provider: "Google",
    type: "Identity & Productivity",
    region: "Global",
    impactTier: "Medium",
    encryptionState: "MFA Enforced",
    isCompliant: true,
  },
  {
    id: "AST-AZ-501",
    name: "Azure CosmosDB Clinical Cache",
    provider: "Azure",
    type: "Database / NoSQL",
    region: "East US 2",
    impactTier: "Medium",
    encryptionState: "Encrypted At Rest",
    isCompliant: true,
  },
  {
    id: "AST-AWS-103",
    name: "AWS DynamoDB Token Session Store",
    provider: "AWS",
    type: "Database / Key-Value",
    region: "us-east-1",
    impactTier: "Medium",
    encryptionState: "AES-256 (KMS)",
    isCompliant: true,
  },
];

export const AssetInventorySandbox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("ALL");
  const [sortField, setSortField] = useState<keyof AssetItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof AssetItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAssets = useMemo(() => {
    return mockAssets
      .filter((ast) => {
        const matchesQuery =
          ast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ast.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ast.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ast.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ast.provider.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesProvider =
          selectedProvider === "ALL" || ast.provider === selectedProvider;

        return matchesQuery && matchesProvider;
      })
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        return 0;
      });
  }, [searchQuery, selectedProvider, sortField, sortDirection]);

  const getProviderBadge = (provider: AssetItem["provider"]) => {
    switch (provider) {
      case "AWS":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "GCP":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Azure":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "GitHub":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Google":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121d] text-white p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Unified Asset Catalog (Workflows H &amp; I)
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Interactive Filterable Table
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Multi-Cloud Asset Inventory &amp; Continuous Encryption Auditing
            </h4>
          </div>
        </div>

        {/* Summary Counter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Total Scoped Assets:</span>
          <span className="font-bold text-white bg-slate-900 px-2.5 py-1 rounded border border-slate-700">
            {mockAssets.length} Assets (100% Encrypted)
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets (e.g. 'S3', 'AWS', 'Postgres')..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Provider Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["ALL", "AWS", "GCP", "GitHub", "Google", "Azure"].map((prov) => (
            <button
              key={prov}
              onClick={() => setSelectedProvider(prov)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                selectedProvider === prov
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Sleek Data Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden shadow-inner">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[10px] text-slate-400 uppercase">
                <th
                  onClick={() => handleSort("name")}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Asset Name &amp; Key</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("provider")}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Cloud Provider</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("type")}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Resource Type</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("impactTier")}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Impact Tier</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("encryptionState")}
                  className="py-3 px-4 font-bold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Encryption State</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-4 font-bold text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 font-sans">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-mono text-xs">
                    No assets matched query "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredAssets.map((ast) => (
                  <tr key={ast.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white font-mono text-xs">{ast.name}</div>
                      <span className="text-[10px] font-mono text-slate-500">ID: {ast.id} • {ast.region}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getProviderBadge(ast.provider)}`}>
                        {ast.provider}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">
                      {ast.type}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          ast.impactTier === "High"
                            ? "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                            : "bg-slate-800 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {ast.impactTier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        {ast.encryptionState}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        Compliant
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer Telemetry Statement */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <span>Continuous IAM Scans: Hourly • Ephemeral OIDC Connectors</span>
        <span className="text-emerald-400">100% Cryptographic Verification Rate</span>
      </div>
    </div>
  );
};
