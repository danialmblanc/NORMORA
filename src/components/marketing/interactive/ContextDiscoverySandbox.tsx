import React, { useState } from "react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  Check,
  Shield,
  Layers,
  ArrowRight,
  RefreshCw,
  Cpu,
  Globe,
  Database,
  Lock,
} from "lucide-react";

interface FrameworkControl {
  framework: string;
  code: string;
  name: string;
  category: string;
}

const baselineControlsMap: Record<string, FrameworkControl[]> = {
  soc2: [
    { framework: "SOC 2", code: "CC6.1", name: "IAM & Role-Based Access Control", category: "Security" },
    { framework: "SOC 2", code: "CC6.6", name: "KMS & Key Rotation Envelopes", category: "Confidentiality" },
    { framework: "SOC 2", code: "CC7.2", name: "Continuous Infrastructure Telemetry", category: "Availability" },
  ],
  iso27001: [
    { framework: "ISO 27001", code: "A.9.2", name: "User Access Provisioning & MFA", category: "Access Control" },
    { framework: "ISO 27001", code: "A.10.1", name: "Cryptographic Controls & AES-256", category: "Cryptography" },
    { framework: "ISO 27001", code: "A.12.6", name: "Technical Vulnerability Management", category: "Operations" },
  ],
  hipaa: [
    { framework: "HIPAA", code: "164.312(a)", name: "Access Controls & Unique User IDs", category: "Technical" },
    { framework: "HIPAA", code: "164.312(e)", name: "Transmission Security & TLS 1.3", category: "Technical" },
    { framework: "HIPAA", code: "164.308(b)", name: "Business Associate Agreements (BAAs)", category: "Administrative" },
  ],
  iso42001: [
    { framework: "ISO 42001", code: "A.6.2", name: "AI Risk Assessment & Bias Monitoring", category: "AI Governance" },
    { framework: "ISO 42001", code: "A.7.3", name: "Model Training Data Provenance", category: "Data Management" },
    { framework: "ISO 42001", code: "A.9.1", name: "Human-in-the-Loop Override Gates", category: "AI Safety" },
  ],
};

export const ContextDiscoverySandbox: React.FC = () => {
  const [domainInput, setDomainInput] = useState<string>("northstar-health.ai");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [hasScanned, setHasScanned] = useState<boolean>(true);

  // Framework toggles
  const [frameworks, setFrameworks] = useState<Record<string, boolean>>({
    soc2: true,
    iso27001: true,
    hipaa: true,
    iso42001: true,
  });

  const handleRunScan = () => {
    setIsScanning(true);
    setScanStep(1);
    const s1 = setTimeout(() => setScanStep(2), 600);
    const s2 = setTimeout(() => setScanStep(3), 1300);
    const s3 = setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 2000);
  };

  const toggleFramework = (key: string) => {
    setFrameworks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeControls = Object.entries(frameworks)
    .filter(([_, active]) => active)
    .flatMap(([key]) => baselineControlsMap[key] || []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121d] text-white p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                Context Discovery &amp; Program Generator (Workflow B)
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Simulated Automated Scoping
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Automated Boundary Discovery &amp; One-Click Program Provisioning
            </h4>
          </div>
        </div>
      </div>

      {/* Input Field & Scan Action Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <label className="block text-xs font-mono text-slate-400">
          Enter Company Domain or Public Product URL to Scan:
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="e.g. acme-health.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-hidden focus:border-purple-500 transition-colors"
            />
          </div>
          <button
            onClick={handleRunScan}
            disabled={isScanning || !domainInput}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning Footprint...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Run Domain Scan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulated Scan Loading State */}
      {isScanning && (
        <div className="p-6 rounded-xl bg-slate-900/60 border border-purple-500/30 space-y-3 animate-pulse">
          <div className="flex items-center justify-between text-xs font-mono text-purple-300">
            <span>
              {scanStep === 1 && "Step 1/3: Resolving DNS topology, reverse proxies & SSL certificates..."}
              {scanStep === 2 && "Step 2/3: Discovering model inference APIs & cloud workloads..."}
              {scanStep === 3 && "Step 3/3: Mapping legal entities & subprocessor disclosures..."}
            </span>
            <span className="font-bold">{scanStep * 33}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${scanStep * 33}%` }}
            />
          </div>
        </div>
      )}

      {/* Scan Results & Scoped Confidence Metrics */}
      {hasScanned && !isScanning && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Confidence Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Legal Entities</span>
                <span className="text-emerald-400 font-bold">99%</span>
              </div>
              <p className="text-sm font-bold text-white">Northstar Health Inc.</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full w-[99%]" />
              </div>
              <p className="text-[10px] font-mono text-slate-500">Delaware C-Corp • US/EU</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Cloud Footprint</span>
                <span className="text-emerald-400 font-bold">94%</span>
              </div>
              <p className="text-sm font-bold text-white">AWS us-east-1 + GCP</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full w-[94%]" />
              </div>
              <p className="text-[10px] font-mono text-slate-500">EKS Cluster + Vertex AI</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>AI Workloads</span>
                <span className="text-emerald-400 font-bold">97%</span>
              </div>
              <p className="text-sm font-bold text-white">Gemini 1.5 + PyTorch</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full w-[97%]" />
              </div>
              <p className="text-[10px] font-mono text-slate-500">Zero Retention • HITRUST</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Data Classification</span>
                <span className="text-emerald-400 font-bold">96%</span>
              </div>
              <p className="text-sm font-bold text-white">ePHI &amp; Confidential</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full w-[96%]" />
              </div>
              <p className="text-[10px] font-mono text-slate-500">HIPAA Security Rule Scope</p>
            </div>
          </div>

          {/* One-Click Program Provisioning Area */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                  One-Click Program Provisioning
                </h5>
                <p className="text-[11px] text-slate-400">
                  Toggle target standards to instantly generate a unified baseline control checklist.
                </p>
              </div>
              <span className="text-[11px] font-mono font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                {activeControls.length} Controls Auto-Mapped
              </span>
            </div>

            {/* Toggle Switches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "soc2", label: "SOC 2 Type II", desc: "Trust Criteria (AICPA)" },
                { id: "iso27001", label: "ISO 27001:2022", desc: "Global ISMS Controls" },
                { id: "hipaa", label: "HIPAA Security", desc: "ePHI & Safeguards" },
                { id: "iso42001", label: "ISO 42001", desc: "AI Management System" },
              ].map((fw) => {
                const isActive = frameworks[fw.id];
                return (
                  <button
                    key={fw.id}
                    onClick={() => toggleFramework(fw.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-purple-950/50 border-purple-500/80 text-white shadow-xs"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{fw.label}</span>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                          isActive
                            ? "bg-purple-500 text-white"
                            : "bg-slate-800 text-slate-500 border border-slate-700"
                        }`}
                      >
                        {isActive ? "✓" : ""}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">{fw.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Auto-Populating Controls Checklist */}
            <div className="space-y-2 pt-2">
              <p className="text-[10px] font-mono uppercase text-slate-400">
                Generated Baseline Universal Controls Checklist:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeControls.map((c, idx) => (
                  <div
                    key={`${c.code}-${idx}`}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs animate-in fade-in duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                        {c.code}
                      </span>
                      <span className="text-slate-200 text-[11px] font-semibold">{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{c.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
