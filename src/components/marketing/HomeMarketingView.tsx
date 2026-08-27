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
  Building2,
  GraduationCap,
  Bell,
  Sliders,
  Eye,
} from "lucide-react";
import { CONFIG, resolveDemoUrl } from "../../lib/config";
import { platformModulesData, frameworksData, integrationsData, resourcesArticlesData } from "../../data/marketingData";
import { MultiTenantSandbox } from "./interactive/MultiTenantSandbox";
import { TrainingPortalSandbox } from "./interactive/TrainingPortalSandbox";
import { NotificationEmailSandbox } from "./interactive/NotificationEmailSandbox";
import { ContextDiscoverySandbox } from "./interactive/ContextDiscoverySandbox";
import { AssetInventorySandbox } from "./interactive/AssetInventorySandbox";

interface HomeMarketingViewProps {
  onNavigate: (path: string) => void;
  onRequestBetaAccess?: () => void;
}

export const HomeMarketingView: React.FC<HomeMarketingViewProps> = ({
  onNavigate,
  onRequestBetaAccess,
}) => {
  const [activeSandboxTab, setActiveSandboxTab] = useState<number>(0);
  const demoUrl = resolveDemoUrl();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-[#07090e] text-slate-100 overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Hero Section with Interactive Sandbox Showcase Callout */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80 bg-linear-to-b from-[#0d121d] via-[#07090e] to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-medium text-emerald-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NORMORA BETA RELEASE • 5 NEW INTERACTIVE WORKFLOWS</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Turn obligations into <span className="font-serif italic font-normal text-emerald-400">operations.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Test-drive the new continuous assurance workflows below: multi-tenant isolation, interactive HIPAA training quizzes, real-time GRC delivery feeds, AI context scoping, and multi-cloud asset inventories.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary Beta Request */}
              <button
                id="btn-hero-request-beta"
                onClick={onRequestBetaAccess || (() => onNavigate(demoUrl))}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Full Beta Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Primary Product Exploration */}
              <button
                id="btn-hero-explore-demo"
                onClick={() => onNavigate(demoUrl)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Launch Interactive Demo</span>
              </button>

              {/* Book 30-min Demo */}
              <a
                id="btn-hero-book-demo"
                href={CONFIG.BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-5 py-3.5 text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Book a Demo</span>
              </a>
            </div>

            {/* Quick-Jump Workflow Navigation Chips */}
            <div className="pt-6">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                Jump directly to interactive sandbox:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: "sandbox-multi-tenant", label: "01. Multi-Tenant Console", icon: Building2 },
                  { id: "sandbox-training", label: "02. Workforce Training Quiz", icon: GraduationCap },
                  { id: "sandbox-notifications", label: "03. Real-Time Delivery Feed", icon: Bell },
                  { id: "sandbox-scoping", label: "04. Context Scoping Engine", icon: Search },
                  { id: "sandbox-assets", label: "05. Multi-Cloud Asset Catalog", icon: Database },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-2xs"
                    >
                      <Icon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principle Strip (Dark-Mode SaaS High-Contrast) */}
      <section className="py-8 bg-[#0a0d14] border-b border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="font-bold text-white font-mono">100% Cryptographic Lineage</p>
            <p className="text-[11px] text-slate-400">SHA-256 evidence hashes with UTC timestamps</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-white font-mono">Isolated KMS Envelopes</p>
            <p className="text-[11px] text-slate-400">Strict multi-tenant cryptographic boundaries</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-white font-mono">Deterministic Scanners</p>
            <p className="text-[11px] text-slate-400">Hourly multi-cloud telemetry without agent bloat</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-white font-mono">Human-in-the-Loop AI</p>
            <p className="text-[11px] text-slate-400">Zero unvetted AI mutations or phantom evidence</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SANDBOX 1: MSP & Multi-Tenant Console (Workflow M)
         ========================================================================= */}
      <section id="sandbox-multi-tenant" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#07090e] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>Workflow M: Partner &amp; MSP Edition</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Isolate Tenant Data. Scale with Confidence.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Managing dozens of portfolio companies or advisory clients shouldn't mean spreadsheet chaos. Normora's multi-tenant architecture provides strict cryptographic data isolation, aggregated portfolio health matrices, and one-click tenant provisioning.
            </p>
          </div>

          {/* Interactive Sandbox Component */}
          <MultiTenantSandbox onExploreDemo={() => onNavigate(demoUrl)} />
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SANDBOX 2: Workforce Compliance & Training Portal (Workflow K)
         ========================================================================= */}
      <section id="sandbox-training" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#0a0d14] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-mono text-indigo-400">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Workflow K: Workforce Readiness &amp; Attestation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Automate Workforce Readiness. Verify with Cryptographic Proof.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Replace boring video check-boxes with interactive, deterministic compliance assessments. Try answering the 3-question HIPAA quiz below to generate an immutable evidence artifact.
            </p>
          </div>

          {/* Interactive Sandbox Component */}
          <TrainingPortalSandbox />
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SANDBOX 3: Notification & Email Delivery Center (Workflow N)
         ========================================================================= */}
      <section id="sandbox-notifications" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#07090e] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-mono text-cyan-400">
              <Bell className="w-3.5 h-3.5" />
              <span>Workflow N: Event-Driven Delivery Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Real-Time GRC Alerts. Enterprise-Grade Delivery.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Never let an expiring vendor SOC 2 or failing IAM telemetry check slip through the cracks. Explore our live event feed and DKIM/SPF verified email dispatch sandbox.
            </p>
          </div>

          {/* Interactive Sandbox Component */}
          <NotificationEmailSandbox onNavigateToModule={() => onNavigate(demoUrl)} />
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SANDBOX 4: Context Discovery & Program Generator (Workflow B)
         ========================================================================= */}
      <section id="sandbox-scoping" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#0a0d14] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[11px] font-mono text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workflow B: Automated Scoping &amp; Scanners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Instant Scoping. Zero Guesswork.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Type any company domain into the scanner below to see how Normora extracts organizational boundaries, cloud infrastructures, and AI models into a clean, baseline control graph.
            </p>
          </div>

          {/* Interactive Sandbox Component */}
          <ContextDiscoverySandbox />
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SANDBOX 5: Multi-Cloud Asset Inventory (Workflows H & I)
         ========================================================================= */}
      <section id="sandbox-assets" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#07090e] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
              <Database className="w-3.5 h-3.5" />
              <span>Workflows H &amp; I: Continuous Operations &amp; Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Unified Asset Visibility. Continuous Encryption Auditing.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Consolidate production infrastructure across AWS, GCP, Azure, GitHub, and Workspace into a single filterable inventory. Sort, search, and audit encryption postures deterministically.
            </p>
          </div>

          {/* Interactive Sandbox Component */}
          <AssetInventorySandbox />
        </div>
      </section>

      {/* Platform Capabilities Grid */}
      <section className="py-20 md:py-28 bg-[#0a0d14] border-b border-slate-800/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Complete Assurance Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              One assurance system. Eight connected capabilities.
            </h3>
            <p className="text-sm sm:text-base text-slate-400">
              Every module shares the same business context, control graph, evidence provenance, permissions, and audit history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformModulesData.map((mod) => (
              <div
                key={mod.id}
                onClick={() => onNavigate(`/platform/${mod.id}`)}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      {mod.id.toUpperCase()}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-white">
                    {mod.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {mod.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{mod.metrics[0]?.label}</span>
                  <span className="font-bold text-emerald-400">{mod.metrics[0]?.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Coverage Section */}
      <section className="py-20 md:py-28 bg-[#07090e] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Universal Framework Coverage
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Built for modern security, privacy, and AI governance standards.
            </h3>
            <p className="text-sm sm:text-base text-slate-400">
              Independently authored control mappings that let you operate multiple assurance programs with zero redundant engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworksData.map((fw) => (
              <div
                key={fw.id}
                onClick={() => onNavigate(`/frameworks/${fw.id}`)}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] font-bold border border-slate-700">
                      {fw.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {fw.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {fw.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {fw.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>Explore Framework Guide</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Final CTA Section */}
      <section className="py-20 md:py-28 bg-[#0a0d14] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-medium text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Continuous Assurance?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            See how Normora turns evidence into continuous assurance.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience the interactive product demo with synthetic healthcare AI data, request private beta access, or book a live session with our assurance architects.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="btn-final-request-beta"
              onClick={onRequestBetaAccess || (() => onNavigate(demoUrl))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Full Beta Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="btn-final-explore-demo"
              onClick={() => onNavigate(demoUrl)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Explore Interactive Demo</span>
            </button>

            <a
              id="btn-final-book-demo"
              href={CONFIG.BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Book a 30-min Demo</span>
            </a>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate("/auth/login")}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              Already have an account? <span className="underline text-slate-400">Sign in to Normora Portal</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-emerald-500/5 rounded-full pointer-events-none" />
      </section>
    </div>
  );
};
