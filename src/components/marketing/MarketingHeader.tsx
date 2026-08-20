import React, { useState } from "react";
import {
  Shield,
  Bot,
  Link2,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  Menu,
  X,
  Lock,
  Calendar,
  Layers,
  FileCode2,
  ExternalLink,
} from "lucide-react";
import { CONFIG, resolveDemoUrl } from "../../lib/config";

interface MarketingHeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MarketingHeader: React.FC<MarketingHeaderProps> = ({
  currentPath,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const demoUrl = resolveDemoUrl();

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* Top Banner: Real Operational Principle */}
      <div className="bg-slate-900 text-white text-[11px] font-mono py-1 px-4 text-center tracking-wider flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Normora Operating Principle: Turn obligations into continuously operating controls.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            {/* Original Geometric Normora Logo Mark */}
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19V5L11.5 14.5L19 5V19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11.5" cy="14.5" r="2" fill="#34D399" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                NORMORA
              </span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest -mt-1">
                Assurance OS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            {/* Platform Dropdown Trigger */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMegaMenu("platform")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => handleNavClick("/platform")}
                className={`flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer ${
                  currentPath.startsWith("/platform") ? "text-slate-900 font-bold" : ""
                }`}
              >
                <span>Platform</span>
                <span className="text-[10px] opacity-60">▾</span>
              </button>

              {/* Platform Mega Menu */}
              {activeMegaMenu === "platform" && (
                <div className="absolute top-12 left-0 w-[540px] bg-white border border-slate-100 rounded-2xl p-4 shadow-xl grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div
                    onClick={() => handleNavClick("/platform/context")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <FileCode2 className="w-3.5 h-3.5 text-slate-700" />
                      <span>Normora Context</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Grounding boundaries &amp; systems architecture</p>
                  </div>

                  <div
                    onClick={() => handleNavClick("/platform/controls")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <Shield className="w-3.5 h-3.5 text-slate-700" />
                      <span>Normora Controls</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Universal cross-framework control library</p>
                  </div>

                  <div
                    onClick={() => handleNavClick("/platform/connect")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <Link2 className="w-3.5 h-3.5 text-slate-700" />
                      <span>Normora Connect</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Read-only IAM &amp; cloud workload identity</p>
                  </div>

                  <div
                    onClick={() => handleNavClick("/platform/evidence")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <FileCheck2 className="w-3.5 h-3.5 text-slate-700" />
                      <span>Normora Evidence</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">SHA-256 hashed cryptographic provenance</p>
                  </div>

                  <div
                    onClick={() => handleNavClick("/platform/agents")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Normora Agents</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Human-reviewed AI compliance studio</p>
                  </div>

                  <div
                    onClick={() => handleNavClick("/platform/risk")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-slate-700" />
                      <span>Normora Risk</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Enterprise &amp; vendor 5x5 risk scoring</p>
                  </div>

                  <div className="col-span-2 pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">8 connected capabilities</span>
                    <button
                      onClick={() => handleNavClick("/platform")}
                      className="text-slate-900 font-bold flex items-center gap-1 hover:underline"
                    >
                      View Platform Architecture <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMegaMenu("solutions")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => handleNavClick("/solutions/ai-companies")}
                className={`flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer ${
                  currentPath.startsWith("/solutions") ? "text-slate-900 font-bold" : ""
                }`}
              >
                <span>Solutions</span>
                <span className="text-[10px] opacity-60">▾</span>
              </button>

              {activeMegaMenu === "solutions" && (
                <div className="absolute top-12 left-0 w-80 bg-white border border-slate-100 rounded-2xl p-3 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div
                    onClick={() => handleNavClick("/solutions/ai-companies")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-900">AI Companies</p>
                    <p className="text-[11px] text-slate-500">ISO 42001 &amp; EU AI Act governance</p>
                  </div>
                  <div
                    onClick={() => handleNavClick("/solutions/healthcare-saas")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-900">Healthcare SaaS</p>
                    <p className="text-[11px] text-slate-500">HIPAA, ePHI &amp; BAA vendor automation</p>
                  </div>
                  <div
                    onClick={() => handleNavClick("/solutions/b2b-saas")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-900">B2B SaaS</p>
                    <p className="text-[11px] text-slate-500">SOC 2 Type II &amp; ISO 27001 readiness</p>
                  </div>
                  <div
                    onClick={() => handleNavClick("/solutions/consultants")}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-900">Consultants &amp; vCISOs</p>
                    <p className="text-[11px] text-slate-500">Multi-tenant client assurance workspaces</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick("/frameworks")}
              className={`hover:text-slate-900 transition-colors cursor-pointer ${
                currentPath.startsWith("/frameworks") ? "text-slate-900 font-bold" : ""
              }`}
            >
              Frameworks
            </button>

            <button
              onClick={() => handleNavClick("/integrations")}
              className={`hover:text-slate-900 transition-colors cursor-pointer ${
                currentPath.startsWith("/integrations") ? "text-slate-900 font-bold" : ""
              }`}
            >
              Integrations
            </button>

            <button
              onClick={() => handleNavClick("/resources")}
              className={`hover:text-slate-900 transition-colors cursor-pointer ${
                currentPath.startsWith("/resources") ? "text-slate-900 font-bold" : ""
              }`}
            >
              Resources
            </button>

            <button
              onClick={() => handleNavClick("/pricing")}
              className={`hover:text-slate-900 transition-colors cursor-pointer ${
                currentPath === "/pricing" ? "text-slate-900 font-bold" : ""
              }`}
            >
              Pricing
            </button>
          </nav>
        </div>

        {/* Right CTA Group */}
        <div className="flex items-center gap-3">
          {/* Sign In Quiet Action */}
          <button
            onClick={() => handleNavClick("/auth/login")}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Sign in</span>
          </button>

          {/* Explore Demo CTA */}
          <button
            onClick={() => handleNavClick(demoUrl)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Explore Demo</span>
          </button>

          {/* Book 30-min Demo (Primary CTA) */}
          <a
            href={CONFIG.BOOK_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-slate-800 transition-all shadow-2xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Demo</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleNavClick("/platform")}
              className="p-2.5 text-left rounded-lg bg-slate-50 text-slate-800"
            >
              Platform Overview
            </button>
            <button
              onClick={() => handleNavClick("/frameworks")}
              className="p-2.5 text-left rounded-lg bg-slate-50 text-slate-800"
            >
              Frameworks (6)
            </button>
            <button
              onClick={() => handleNavClick("/integrations")}
              className="p-2.5 text-left rounded-lg bg-slate-50 text-slate-800"
            >
              Integrations (8)
            </button>
            <button
              onClick={() => handleNavClick("/pricing")}
              className="p-2.5 text-left rounded-lg bg-slate-50 text-slate-800"
            >
              Pricing &amp; Plans
            </button>
            <button
              onClick={() => handleNavClick("/security")}
              className="p-2.5 text-left rounded-lg bg-slate-50 text-slate-800"
            >
              Security Architecture
            </button>
            <button
              onClick={() => handleNavClick("/trust")}
              className="p-2.5 text-left rounded-lg bg-slate-50 text-slate-800"
            >
              Public Trust Center
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick(demoUrl)}
              className="w-full text-center py-2 text-xs font-semibold rounded-md border border-slate-200 bg-white text-slate-900"
            >
              Explore Interactive Demo (Synthetic)
            </button>
            <button
              onClick={() => handleNavClick("/auth/signup")}
              className="w-full text-center py-2 text-xs font-semibold uppercase tracking-wider rounded-md bg-slate-900 text-white"
            >
              Create Account / Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
