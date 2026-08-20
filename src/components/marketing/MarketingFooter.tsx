import React from "react";
import { resolveDemoUrl, CONFIG } from "../../lib/config";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

interface MarketingFooterProps {
  onNavigate: (path: string) => void;
}

export const MarketingFooter: React.FC<MarketingFooterProps> = ({ onNavigate }) => {
  const demoUrl = resolveDemoUrl();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand & Positioning Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19V5L11.5 14.5L19 5V19" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11.5" cy="14.5" r="2" fill="#10B981" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-white">NORMORA</span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Normora is an AI-native assurance platform that turns regulations, systems, and evidence into continuously operating controls.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigate(demoUrl)}
                className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase text-emerald-400 hover:text-emerald-300"
              >
                <span>Interactive Demo</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
              <span className="text-slate-600">•</span>
              <a
                href={CONFIG.BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold uppercase text-slate-300 hover:text-white"
              >
                <span>Book a Demo</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Product Suite */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">
              Product Suite
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate("/platform/context")} className="hover:text-white transition-colors">
                  Normora Context
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/platform/controls")} className="hover:text-white transition-colors">
                  Normora Controls
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/platform/connect")} className="hover:text-white transition-colors">
                  Normora Connect
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/platform/evidence")} className="hover:text-white transition-colors">
                  Normora Evidence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/platform/agents")} className="hover:text-white transition-colors">
                  Normora Agents
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/platform/risk")} className="hover:text-white transition-colors">
                  Normora Risk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/platform/audit")} className="hover:text-white transition-colors">
                  Normora Audit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/platform/trust")} className="hover:text-white transition-colors">
                  Normora Trust
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Frameworks */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">
              Solutions &amp; Standards
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate("/solutions/ai-companies")} className="hover:text-white transition-colors">
                  AI Companies (ISO 42001)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/solutions/healthcare-saas")} className="hover:text-white transition-colors">
                  Healthcare SaaS (HIPAA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/solutions/b2b-saas")} className="hover:text-white transition-colors">
                  B2B SaaS (SOC 2 &amp; ISO)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/solutions/consultants")} className="hover:text-white transition-colors">
                  Advisors &amp; vCISOs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/frameworks/soc-2")} className="hover:text-white transition-colors">
                  SOC 2 Type II
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/frameworks/iso-27001")} className="hover:text-white transition-colors">
                  ISO/IEC 27001:2022
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/frameworks/iso-42001")} className="hover:text-white transition-colors">
                  ISO 42001 &amp; EU AI Act
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">
              Trust &amp; Governance
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate("/security")} className="hover:text-white transition-colors">
                  Security Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/trust")} className="hover:text-white transition-colors">
                  Public Trust Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/pricing")} className="hover:text-white transition-colors">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/resources")} className="hover:text-white transition-colors">
                  Knowledge &amp; Articles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/contact")} className="hover:text-white transition-colors">
                  Contact Specialist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/auth/login")} className="hover:text-white transition-colors">
                  Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/auth/signup")} className="hover:text-white transition-colors">
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Normora provides continuous control monitoring and readiness automation. Normora does not issue certifications or provide legal advice.
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>© 2026 Normora Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
