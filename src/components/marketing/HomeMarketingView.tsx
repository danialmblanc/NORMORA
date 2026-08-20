import React, { useState } from "react";
import {
  Shield,
  Bot,
  Link2,
  FileCheck2,
  Lock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Activity,
  Cpu,
  Database,
  Search,
  ExternalLink,
  ChevronRight,
  Check,
} from "lucide-react";
import { CONFIG, resolveDemoUrl } from "../../lib/config";
import { platformModulesData, frameworksData, integrationsData, resourcesArticlesData } from "../../data/marketingData";

interface HomeMarketingViewProps {
  onNavigate: (path: string) => void;
}

export const HomeMarketingView: React.FC<HomeMarketingViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const demoUrl = resolveDemoUrl();

  return (
    <div className="w-full bg-white text-slate-900 overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-100 bg-linear-to-b from-slate-50/60 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-[11px] font-mono font-medium text-slate-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI-Native Continuous Assurance Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Turn obligations into <span className="font-serif italic font-normal text-slate-800">operations.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Map requirements to reusable controls, collect evidence from connected systems, and coordinate human-reviewed AI agents in one traceable assurance platform.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Primary Product Exploration */}
              <button
                id="btn-hero-explore-demo"
                onClick={() => onNavigate(demoUrl)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Explore the interactive demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Sales Conversion */}
              <a
                id="btn-hero-book-demo"
                href={CONFIG.BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Book a 30-minute demo</span>
              </a>

              {/* Quiet Sign In */}
              <button
                onClick={() => onNavigate("/auth/login")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Sign in</span>
              </button>
            </div>

            {/* Trust and Assurance Statement */}
            <p className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Built for accountable automation: read-only connectors, evidence provenance, deterministic tests, and human approval.</span>
            </p>
          </div>

          {/* Interactive Product Mockup Preview */}
          <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl shadow-slate-200/50">
            {/* Window chrome header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">app.normora.ai/orchestrator • Active Assurance Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                  SHA-256 VERIFIED
                </span>
                <span className="text-[10px] font-mono text-slate-400">v1.0.4</span>
              </div>
            </div>

            {/* Mockup Inside Visual */}
            <div className="p-4 sm:p-6 bg-slate-900 rounded-xl text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Universal Controls</p>
                  <p className="text-2xl font-bold font-sans text-white mt-1">124 Mapped</p>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1">✓ 94.2% Automated Readiness</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Cryptographic Evidence</p>
                  <p className="text-2xl font-bold font-sans text-white mt-1">100% SHA-256</p>
                  <p className="text-[11px] text-slate-300 font-mono mt-1">Zero stale artifacts</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">AI Agent Queue</p>
                  <p className="text-2xl font-bold font-sans text-white mt-1">2 Pending Review</p>
                  <p className="text-[11px] text-amber-400 font-mono mt-1">Human-in-the-loop gate active</p>
                </div>
              </div>

              {/* Sample Live Graph Stream */}
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-700/60 pb-2">
                  <span>Requirement → Universal Control → Telemetry Test → Provenance Hash</span>
                  <span className="text-emerald-400">Continuous Stream</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400">SOC 2 CC6.1 & ISO A.9</p>
                    <p className="font-semibold text-slate-200 mt-0.5">IAM Access Review</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400">Universal Control</p>
                    <p className="font-semibold text-slate-200 mt-0.5">CTRL-01: OIDC MFA</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400">Automated Test</p>
                    <p className="font-semibold text-emerald-400 mt-0.5">TEST-101: PASS (AWS/GCP)</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400">Evidence Hash</p>
                    <p className="font-mono text-[10px] text-slate-300 mt-0.5 truncate">sha256:7f83b165...verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principle Strip */}
      <section className="py-8 bg-slate-50 border-b border-slate-100 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Deterministic Checks</p>
            <p className="text-[11px] text-slate-500">Hourly infrastructure scans &amp; immutable proofs</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Zero Redundancy</p>
            <p className="text-[11px] text-slate-500">Universal control graph reused across 6+ frameworks</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Source-Grounded AI</p>
            <p className="text-[11px] text-slate-500">Every draft cites tenant context with human review</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Defensible Provenance</p>
            <p className="text-[11px] text-slate-500">SHA-256 signed evidence bundles for auditors</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              The Reality of Compliance Today
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Compliance fails when the work lives everywhere.
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Requirements sit in documents. Owners track tasks in project tools. Evidence is buried across cloud accounts, repositories, HR systems, and shared drives. Audits then become a recurring exercise in reconstruction. Normora connects that work into a continuously operating control system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors space-y-3">
              <div className="w-8 h-8 rounded bg-slate-200 text-slate-800 grid place-items-center font-mono font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-bold text-slate-900">Overlapping Framework Chaos</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Engineering teams recreate the same access control or encryption safeguards across SOC 2, ISO 27001, HIPAA, and GDPR.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors space-y-3">
              <div className="w-8 h-8 rounded bg-slate-200 text-slate-800 grid place-items-center font-mono font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-bold text-slate-900">Screenshots &amp; Stale Evidence</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                PNG screenshots lack verifiable timestamps, collection scopes, and audit integrity, leading to auditor friction and sample failures.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors space-y-3">
              <div className="w-8 h-8 rounded bg-slate-200 text-slate-800 grid place-items-center font-mono font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-bold text-slate-900">Disconnected Risks &amp; Vendors</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Third-party vendor risks, subprocessor DPAs, and SOC 2 expiration dates are scattered across emails and forgotten spreadsheets.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors space-y-3">
              <div className="w-8 h-8 rounded bg-slate-200 text-slate-800 grid place-items-center font-mono font-bold text-xs">
                04
              </div>
              <h4 className="text-sm font-bold text-slate-900">Untraceable AI Hallucinations</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generic AI tools generate security policies and questionnaire answers that cannot be traced to real architecture or evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Normora Works (Four-Step Operating Model) */}
      <section className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              The Operating Truth Model
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              How Normora creates continuous assurance.
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Four deliberate stages that connect company reality to audit-ready proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">STAGE 01</span>
                <span className="w-2 h-2 rounded-full bg-slate-900" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Ground the Program</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Capture organizational boundaries, cloud topology, workforce size, jurisdictions, data classifications, and approved AI systems in <strong>Normora Context</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">STAGE 02</span>
                <span className="w-2 h-2 rounded-full bg-slate-900" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Unify the Controls</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Map overlapping framework requirements (SOC 2, ISO 27001, HIPAA, ISO 42001) to a single versioned <strong>Universal Control Library</strong> with assigned owners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">STAGE 03</span>
                <span className="w-2 h-2 rounded-full bg-slate-900" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Connect the Evidence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Collect scoped evidence and execute deterministic checks across AWS, GCP, GitHub, and Google Workspace via read-only <strong>Normora Connect</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">STAGE 04</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Operate Continuously</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Route exceptions, vendor risks, audit requests, and AI agent drafts through human review in <strong>Normora Audit</strong> and <strong>Normora Trust</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Suite: 8 Connected Modules */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Complete Assurance Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              One assurance system. Eight connected capabilities.
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Every module shares the same business context, control graph, evidence provenance, permissions, and audit history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformModulesData.map((mod) => (
              <div
                key={mod.id}
                onClick={() => onNavigate(`/platform/${mod.id}`)}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50/80 hover:border-slate-200 transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      {mod.id.toUpperCase()}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-slate-900">
                    {mod.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {mod.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <span>{mod.metrics[0]?.label}</span>
                  <span className="font-bold text-slate-900">{mod.metrics[0]?.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate("/platform")}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-700"
            >
              <span>Explore Complete Platform Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Agents Studio Showcase */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Normora AI Agents Studio</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                AI that assists the work—<br className="hidden sm:inline" />
                and shows its work.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Normora Agents retrieve tenant-approved sources, produce structured drafts, cite their evidence, report uncertainty, and route consequential actions to authorized reviewers.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>State Lifecycle: Draft → Needs Review → Approved or Rejected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Zero training on tenant data • Isolated server-side inference</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Verifiable citations with confidence score &amp; uncertainty analysis</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate(demoUrl)}
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <Bot className="w-4 h-4 text-slate-900" />
                  <span>Test Agent Studio in Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Agent Draft Card */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-850 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                    EVIDENCE AGENT RUN
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Grounding Context: v3.4.0</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  NEEDS REVIEW
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-200">
                  Trigger: AWS KMS Multi-Region Key Rotation Verification
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Evaluated 12 active KMS keys across us-east-1 and eu-west-1. Identified 1 key lacking automatic 365-day rotation. Proposed remediation ticket created in Jira.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-[11px] font-mono">
                <p className="text-slate-400">Cited Sources:</p>
                <div className="space-y-1 text-slate-300">
                  <p>• AWS CloudTrail Log: <span className="text-emerald-400">arn:aws:kms:us-east-1:...</span></p>
                  <p>• SOC 2 Trust Services Criteria: <span className="text-emerald-400">CC6.6 Key Management</span></p>
                </div>
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 border-t border-slate-800">
                  <span>Confidence Score: <strong className="text-white">96.8%</strong></span>
                  <span>Uncertainty: None</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300">
                  Reject Draft
                </button>
                <button className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-xs font-semibold text-slate-950">
                  Approve &amp; Log to Audit Trail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Coverage Section */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Universal Framework Coverage
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Built for modern security, privacy, and AI governance standards.
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Independently authored control mappings that let you operate multiple assurance programs with zero redundant engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworksData.map((fw) => (
              <div
                key={fw.id}
                onClick={() => onNavigate(`/frameworks/${fw.id}`)}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-bold">
                      {fw.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {fw.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {fw.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                    {fw.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Explore Framework Guide</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Architecture Summary */}
      <section className="py-20 md:py-28 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Zero-Trust Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Automation built with assurance boundaries.
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              We design Normora under the same rigorous security principles we help our customers operate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-3">
              <Lock className="w-5 h-5 text-slate-900" />
              <h4 className="text-sm font-bold text-slate-900">Read-Only OIDC &amp; Workload Identity</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero long-lived static API secrets. Cloud connectors authenticate using ephemeral OIDC tokens with strict read-only least-privilege IAM policies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-3">
              <Database className="w-5 h-5 text-slate-900" />
              <h4 className="text-sm font-bold text-slate-900">Tenant-Scoped Isolation &amp; KMS</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Customer data, context profiles, and evidence payloads are strictly isolated per tenant and encrypted at rest using AES-256 with tenant-specific KMS keys.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-3">
              <CheckCircle2 className="w-5 h-5 text-slate-900" />
              <h4 className="text-sm font-bold text-slate-900">Cryptographic WORM Provenance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                All evidence artifacts are stored with immutable SHA-256 signatures, collector lineage, and UTC timestamps for non-repudiable auditor inspection.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate("/security")}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-slate-900"
            >
              <span>Read Full Security Architecture Documentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Conversion Final CTA Section */}
      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            See how Normora turns evidence into continuous assurance.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience the interactive product demo with synthetic healthcare AI data, or book a live session with our assurance specialists.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="btn-final-explore-demo"
              onClick={() => onNavigate(demoUrl)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 shadow-sm hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Explore the interactive demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              id="btn-final-book-demo"
              href={CONFIG.BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800/80 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Book a 30-minute demo</span>
            </a>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate("/auth/login")}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Already have an account? <span className="underline">Sign in to Normora Portal</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
      </section>
    </div>
  );
};
