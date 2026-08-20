import React, { useState } from "react";
import { frameworksData, integrationsData, solutionsData, resourcesArticlesData } from "../../data/marketingData";
import { resolveDemoUrl, CONFIG } from "../../lib/config";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Lock, ExternalLink, Calendar, Layers, Search, Filter, Sparkles } from "lucide-react";

interface SubPageViewProps {
  type: "frameworks" | "integrations" | "solutions" | "resources" | "pricing" | "security" | "trust" | "contact";
  subSlug?: string;
  onNavigate: (path: string) => void;
}

export const SubPageView: React.FC<SubPageViewProps> = ({ type, subSlug, onNavigate }) => {
  const demoUrl = resolveDemoUrl();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Contact form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [contactGoal, setContactGoal] = useState("SOC 2 Type II");
  const [contactMessage, setContactMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* ---------------- Frameworks View ---------------- */
  if (type === "frameworks") {
    const singleFw = subSlug ? frameworksData.find((f) => f.id === subSlug) : null;

    if (singleFw) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <button
            onClick={() => onNavigate("/frameworks")}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Frameworks</span>
          </button>

          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-xs font-bold">
              {singleFw.code}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{singleFw.name}</h1>
            <p className="text-sm text-slate-600 leading-relaxed">{singleFw.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
              <p className="text-xs font-mono font-bold uppercase text-slate-400">Target Organizations</p>
              <p className="text-xs text-slate-800 leading-relaxed">{singleFw.whoUses}</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
              <p className="text-xs font-mono font-bold uppercase text-slate-400">Normora Readiness Approach</p>
              <p className="text-xs text-slate-800 leading-relaxed">{singleFw.readinessApproach}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Key Automated Safeguards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {singleFw.keyControls.map((c, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-white flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-1">
            <p className="font-bold text-slate-200">Legal &amp; Assessment Disclaimer</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">{singleFw.disclaimer}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <a
              href={singleFw.officialRef}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-mono"
            >
              <span>Official Publisher Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onNavigate(demoUrl)}
              className="px-4 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Test in Demo →
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Supported Frameworks &amp; Compliance Standards
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Normora continuously cross-maps regulations to unified universal controls, allowing you to operate multiple certifications with zero redundant engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworksData.map((fw) => (
            <div
              key={fw.id}
              onClick={() => onNavigate(`/frameworks/${fw.id}`)}
              className="p-6 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/70 hover:border-slate-200 transition-all cursor-pointer space-y-4 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-slate-700">
                    {fw.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{fw.category}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{fw.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">{fw.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>View Framework Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Integrations View ---------------- */
  if (type === "integrations") {
    const categories = ["All", "Cloud", "Source Control", "Identity", "Productivity", "Task Management"];
    const filteredIntegrations = integrationsData.filter((i) => {
      const matchCat = selectedCategory === "All" || i.category === selectedCategory;
      const matchSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Integrations Library
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Read-only, zero-static-credential connectors that collect defensible evidence from your cloud infrastructure, repositories, identity providers, and ticketing systems.
          </p>
        </div>

        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search integrations by name or data collected..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCategory === c ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white grid place-items-center font-mono font-bold text-xs">
                    {item.iconText}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1 font-mono text-[11px]">
                    <p className="text-slate-400">Auth Method:</p>
                    <p className="text-slate-800 font-semibold">{item.authMethod}</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1 font-mono text-[11px]">
                    <p className="text-slate-400">Sync Cadence:</p>
                    <p className="text-slate-800 font-semibold">{item.syncFrequency}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                <span>Permissions: {item.permissions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Solutions View ---------------- */
  if (type === "solutions") {
    const activeSolution = solutionsData.find((s) => s.slug === subSlug) || solutionsData[0];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            INDUSTRY SOLUTION
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {activeSolution.title}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {activeSolution.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              The Operational Bottleneck
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeSolution.problem}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Measurable Outcomes
            </h3>
            <div className="space-y-2.5">
              {activeSolution.outcomes.map((out, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900 text-white space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Recommended Assurance Modules
          </h3>
          <div className="flex flex-wrap gap-2">
            {activeSolution.recommendedModules.map((m, idx) => (
              <span key={idx} className="px-3 py-1 rounded bg-slate-800 font-mono text-xs text-emerald-400">
                {m}
              </span>
            ))}
          </div>
          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={() => onNavigate(demoUrl)}
              className="px-4 py-2 rounded bg-white text-slate-900 text-xs font-semibold uppercase tracking-wider"
            >
              Test with Sample Data →
            </button>
            <a
              href={CONFIG.BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider hover:bg-slate-800"
            >
              Book Specialist Session
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Pricing View ---------------- */
  if (type === "pricing") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Predictable, capability-based assurance tiers.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Transparent packages designed for early-stage startups through global enterprise assurance programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Foundation */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                TIER 01 • FOUNDATION
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Foundation</h3>
              <p className="text-xs text-slate-500">
                Essential context grounding, universal controls, policy generation, and manual evidence tasks.
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Normora Context &amp; Organization Profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Universal Control Library (SOC 2 &amp; ISO 27001)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Policy Authoring &amp; Employee Signatures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Task Management &amp; Exception Logging</span>
                </div>
              </div>
            </div>

            <a
              href={CONFIG.BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-md border border-slate-200 text-slate-800 hover:bg-slate-50"
            >
              Book a Demo
            </a>
          </div>

          {/* Continuous (Featured) */}
          <div className="p-8 rounded-2xl border-2 border-slate-900 bg-slate-900 text-white shadow-xl space-y-6 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                TIER 02 • CONTINUOUS
              </span>
              <h3 className="text-2xl font-bold text-white">Continuous</h3>
              <p className="text-xs text-slate-300">
                Full automated evidence collection, deterministic telemetry tests, quantitative risk, and AI Agent Studio.
              </p>

              <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Everything in Foundation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Read-Only Connectors (AWS, GCP, GitHub, etc.)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SHA-256 Cryptographic Evidence Provenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hourly Deterministic Infrastructure Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI Compliance Agent Studio (Human-in-the-loop)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enterprise &amp; Vendor Risk Register (5x5 Matrix)</span>
                </div>
              </div>
            </div>

            <a
              href={CONFIG.BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-md bg-white text-slate-950 hover:bg-slate-100"
            >
              Get Started with Continuous
            </a>
          </div>

          {/* Enterprise & Partner */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                TIER 03 • ENTERPRISE
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Enterprise &amp; Partner</h3>
              <p className="text-xs text-slate-500">
                Collaborative auditor room, customer-facing Trust Center, custom integrations, and multi-tenant partner mode.
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Everything in Continuous</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Normora Audit Collaborative Workspace</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Public &amp; NDA-Gated Trust Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Multi-Tenant Advisor / Partner Workspace</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enterprise SSO (SAML / Okta / Azure AD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dedicated Assurance Architect Support</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("/contact")}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-md bg-slate-900 text-white hover:bg-slate-800"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Resources View ---------------- */
  if (type === "resources") {
    const singleArticle = subSlug ? resourcesArticlesData.find((a) => a.slug === subSlug) : null;

    if (singleArticle) {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <button
            onClick={() => onNavigate("/resources")}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </button>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span>{singleArticle.category}</span>
              <span>•</span>
              <span>{singleArticle.readTime}</span>
              <span>•</span>
              <span>{singleArticle.date}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{singleArticle.title}</h1>
          </div>

          <div className="space-y-4 text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-6">
            {singleArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Author: {singleArticle.author}</span>
            <span>Reviewed: {singleArticle.reviewedDate}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Assurance Knowledge &amp; Engineering Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Practical insights on continuous controls, evidence provenance, AI governance, and audit readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resourcesArticlesData.map((art) => (
            <div
              key={art.slug}
              onClick={() => onNavigate(`/resources/${art.slug}`)}
              className="p-6 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all cursor-pointer space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="font-bold text-slate-700">{art.category}</span>
                <span>{art.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{art.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{art.excerpt}</p>
              <p className="text-[11px] font-mono text-slate-400 pt-2">{art.date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Security & Trust View ---------------- */
  if (type === "security" || type === "trust") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {type === "security" ? "Normora Security Architecture" : "Normora Public Trust Center"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Transparent documentation of our zero-trust engineering boundaries, tenant isolation safeguards, and data governance commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Tenant Isolation &amp; KMS Envelope Encryption</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every customer organization operates within a strictly isolated database partition. All data at rest is encrypted using AES-256 with tenant-unique KMS keys.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Read-Only OIDC Connectors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Normora requires zero static access tokens or write permissions. Connectors authenticate via short-lived AWS OIDC IAM roles and GCP Workload Identity Federation.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">AI Privacy &amp; Anti-Training Commitments</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customer evidence, policies, context, and questionnaire records are never used to train foundational AI models. Inference runs in isolated server-side execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Cryptographic WORM Provenance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Collected evidence payloads are cryptographically signed with SHA-256 hashes and timestamped in immutable append-only logs for tamper-evident auditor defense.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <p className="text-xs font-bold text-slate-900">Need specific compliance documentation or NDA access?</p>
          <p className="text-xs text-slate-500">Contact our security office directly for vendor security packets or vulnerability disclosures.</p>
          <div className="pt-1">
            <a
              href={`mailto:${CONFIG.SECURITY_EMAIL}`}
              className="text-xs font-mono font-bold text-slate-900 underline"
            >
              {CONFIG.SECURITY_EMAIL}
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Contact View ---------------- */
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Talk to a Normora Assurance Specialist
        </h1>
        <p className="text-sm text-slate-600">
          Discuss your certification timeline, existing technical stack, or partner workspace needs.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-emerald-950">Thank you for contacting Normora</h3>
          <p className="text-xs text-emerald-800">
            An assurance specialist will follow up with you within one business day. In the meantime, you can explore our read-only interactive demo.
          </p>
          <button
            onClick={() => onNavigate(demoUrl)}
            className="mt-4 px-4 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Launch Interactive Demo →
          </button>
        </div>
      ) : (
        <form onSubmit={handleContactSubmit} className="p-8 rounded-2xl border border-slate-100 bg-white shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                required
                value={contactCompany}
                onChange={(e) => setContactCompany(e.target.value)}
                placeholder="Northstar AI, Inc."
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Your Role
              </label>
              <input
                type="text"
                required
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                placeholder="CTO / Head of Security"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Primary Assurance Goal / Framework
            </label>
            <select
              value={contactGoal}
              onChange={(e) => setContactGoal(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
            >
              <option value="SOC 2 Type II">SOC 2 Type II</option>
              <option value="ISO 27001:2022">ISO 27001:2022</option>
              <option value="HIPAA Security & Privacy">HIPAA Security &amp; Privacy</option>
              <option value="ISO 42001 & EU AI Act">ISO 42001 &amp; EU AI Act</option>
              <option value="Multi-Framework Overhaul">Multi-Framework Overhaul</option>
              <option value="Consultant / Partner Workspace">Consultant / Partner Workspace</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              How can we help? (Optional)
            </label>
            <textarea
              rows={3}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Tell us about your upcoming audit timeline, cloud infrastructure, or team size..."
              className="w-full rounded-md border border-slate-200 p-3 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};
