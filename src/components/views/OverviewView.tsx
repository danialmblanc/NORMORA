import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Bot,
  ArrowRight,
  TrendingUp,
  Link2,
  FileCheck2,
  Lock,
  Layers,
  Sparkles,
  Activity,
  FileBadge2,
} from "lucide-react";
import {
  Framework,
  UniversalControl,
  Connector,
  EvidenceArtifact,
  AutomatedTest,
  AgentRunRecord,
  ProductModule,
} from "../../types/grc";

interface OverviewViewProps {
  context?: any;
  frameworks: Framework[];
  controls: UniversalControl[];
  connectors: Connector[];
  evidence: EvidenceArtifact[];
  tests: AutomatedTest[];
  agentRuns: AgentRunRecord[];
  onNavigate: (mod: ProductModule) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  frameworks,
  controls,
  connectors,
  evidence,
  tests,
  agentRuns,
  onNavigate,
}) => {
  const effectiveControls = controls.filter(
    (c) => c.status === "Effective" || c.status === "Exception Approved"
  ).length;
  const overallReadiness = Math.round((effectiveControls / controls.length) * 100);

  const passingTests = tests.filter((t) => t.result === "PASS").length;
  const testsPassRate = Math.round((passingTests / tests.length) * 100);

  const freshEvidenceCount = evidence.filter((e) => e.status === "Verified & Fresh").length;
  const connectedCount = connectors.filter((c) => c.status === "Connected").length;
  const pendingAgentRuns = agentRuns.filter((r) => r.status === "Needs Review").length;

  return (
    <div className="space-y-6">
      {/* Top 3 Clean Minimalist KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 border border-slate-100 bg-slate-50/30 rounded-xl hover:bg-slate-50/60 transition-colors">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
            Controls Active & Mapped
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-light italic text-slate-900">{controls.length}</p>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {overallReadiness}% Effective
            </span>
          </div>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-500"
              style={{ width: `${overallReadiness}%` }}
            />
          </div>
        </div>

        <div className="p-5 border border-slate-100 bg-slate-50/30 rounded-xl hover:bg-slate-50/60 transition-colors">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
            Evidence Health & Provenance
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-light italic text-slate-900">98.4%</p>
            <span className="text-[11px] font-mono text-green-700 bg-green-50 px-2 py-0.5 rounded">
              +0.4% from last audit
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-mono">
            {freshEvidenceCount} Cryptographically Verified (SHA-256)
          </p>
        </div>

        <div className="p-5 border border-slate-100 bg-slate-50/30 rounded-xl hover:bg-slate-50/60 transition-colors">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
            Continuous Test Pass Rate
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-light italic text-slate-900">{testsPassRate}%</p>
            <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              {passingTests}/{tests.length} Passing
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5 font-mono">
            Hourly deterministic scans on AWS, GCP & GitHub
          </p>
        </div>
      </div>

      {/* Main Grid: Left Orchestrations & Frameworks, Right Agent Activity & Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Orchestrations Stream */}
          <div className="border border-slate-100 rounded-2xl p-6 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  Active Orchestrations
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Automated continuous signal flow across integrated infrastructure
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Real-time stream
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div className="flex gap-3.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">ISO-27001 Annex A.12.1.1</p>
                    <p className="text-[11px] text-slate-400 font-mono">System: AWS CloudWatch &gt; Connect &gt; Evidence</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase tracking-tighter font-mono">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div className="flex gap-3.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">SOC2 CC6.1 Access Provisioning</p>
                    <p className="text-[11px] text-slate-400 font-mono">System: Google Workspace &gt; Connect &gt; Agent.Audit</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase tracking-tighter font-mono">
                  Processing
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div className="flex gap-3.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">ISO-42001 Cl 6.2 AI Model Risk Governance</p>
                    <p className="text-[11px] text-slate-400 font-mono">System: Vertex AI &gt; Agent.Risk &gt; Controls</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase tracking-tighter font-mono">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex gap-3.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">GDPR Article 32: Security of Processing</p>
                    <p className="text-[11px] text-slate-400 font-mono">System: GitHub Enterprise &gt; Connect &gt; Evidence</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-tighter font-mono">
                  Queued
                </span>
              </div>
            </div>
          </div>

          {/* Active Compliance Frameworks */}
          <div className="border border-slate-100 rounded-2xl p-6 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  Active Framework Readiness
                </h2>
                <p className="text-xs text-slate-400">
                  Universal control mappings calculated directly from verified evidence
                </p>
              </div>
              <button
                onClick={() => onNavigate("controls")}
                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900"
              >
                <span>View Controls</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {frameworks.map((fw) => (
                <div
                  key={fw.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition-all hover:bg-slate-50 hover:border-slate-200 cursor-pointer"
                  onClick={() => onNavigate("controls")}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-700">
                        {fw.code}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {fw.readinessPercentage}%
                      </span>
                    </div>
                    <h3 className="mt-2 text-xs font-bold text-slate-800 line-clamp-1">
                      {fw.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-200/60">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>{fw.mappedControlsCount} Controls</span>
                      <span>{fw.totalRequirements} Req.</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full bg-slate-900"
                        style={{ width: `${fw.readinessPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Agent Activity Card (Clean Minimalist Dark Card) */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="relative z-10 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold">
                Agent Activity
              </p>
              <p className="text-lg leading-snug font-serif italic text-slate-100">
                “Normora Agents are currently mapping 42 regulatory obligations to your system architecture.”
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-white/30 animate-pulse"></div>
                    <div className="w-1 h-3 bg-white/50"></div>
                    <div className="w-1 h-3 bg-white/80"></div>
                  </div>
                  <span className="text-[10px] uppercase font-mono opacity-70">Analysis active</span>
                </div>

                <button
                  onClick={() => onNavigate("agents")}
                  className="rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 transition-colors"
                >
                  Studio &rarr;
                </button>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-48 h-48 border border-white/5 rounded-full pointer-events-none"></div>
          </div>

          {/* Integrations Pipeline & Assurance Pulse Card */}
          <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Integrations Pipeline
              </h3>
              <button
                onClick={() => onNavigate("connect")}
                className="text-[10px] font-mono text-slate-400 hover:text-slate-700 uppercase"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white border border-slate-100 grid place-items-center font-mono text-[10px] font-bold text-slate-800">
                  AWS
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800">Cloud Infrastructure</p>
                  <p className="text-[10px] text-slate-400 font-mono">OIDC IAM • 42 assets synced</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white border border-slate-100 grid place-items-center font-mono text-[10px] font-bold text-slate-800">
                  GCP
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800">Workload Identity</p>
                  <p className="text-[10px] text-slate-400 font-mono">Vertex AI & BigQuery</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white border border-slate-100 grid place-items-center font-mono text-[10px] font-bold text-slate-800">
                  GH
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800">GitHub Enterprise</p>
                  <p className="text-[10px] text-slate-400 font-mono">Branch protection verified</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white border border-slate-100 grid place-items-center font-mono text-[10px] font-bold text-slate-800">
                  JRA
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800">Task Management</p>
                  <p className="text-[10px] text-slate-400 font-mono">Polling every 15m</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>

            {/* Assurance Pulse */}
            <div className="pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  Assurance Pulse
                </p>
                <span className="text-[9px] font-mono text-emerald-600 font-bold uppercase">100% Deterministic</span>
              </div>
              <div className="flex justify-between items-end h-8 gap-[3px]">
                <div className="flex-1 bg-slate-200 h-[40%] rounded-xs"></div>
                <div className="flex-1 bg-slate-200 h-[60%] rounded-xs"></div>
                <div className="flex-1 bg-slate-200 h-[50%] rounded-xs"></div>
                <div className="flex-1 bg-slate-900 h-[80%] rounded-xs"></div>
                <div className="flex-1 bg-slate-900 h-[90%] rounded-xs"></div>
                <div className="flex-1 bg-slate-900 h-[75%] rounded-xs"></div>
                <div className="flex-1 bg-slate-900 h-[100%] rounded-xs"></div>
                <div className="flex-1 bg-slate-200 h-[40%] rounded-xs"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

