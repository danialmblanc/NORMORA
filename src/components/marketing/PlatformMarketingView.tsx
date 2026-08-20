import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Shield, Layers, Bot, Link2, FileCheck2, AlertTriangle, FileCode2, Sparkles, CheckCircle2 } from "lucide-react";
import { platformModulesData } from "../../data/marketingData";
import { resolveDemoUrl } from "../../lib/config";

interface PlatformMarketingViewProps {
  currentModuleId?: string;
  onNavigate: (path: string) => void;
}

export const PlatformMarketingView: React.FC<PlatformMarketingViewProps> = ({
  currentModuleId,
  onNavigate,
}) => {
  const [selectedModule, setSelectedModule] = useState(
    currentModuleId || "context"
  );
  const demoUrl = resolveDemoUrl();

  const currentMod = platformModulesData.find((m) => m.id === (currentModuleId || selectedModule)) || platformModulesData[0];

  return (
    <div className="w-full bg-white text-slate-900 font-sans pb-24">
      {/* Header */}
      <section className="pt-12 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <button
              onClick={() => onNavigate("/")}
              className="inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              The Normora Assurance Platform
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Eight unified modules sharing a single truth model: Context, Universal Controls, Read-Only Connectors, Provenance Evidence, Reviewed AI Agents, Quantitative Risk, Collaborative Audit, and Public Trust.
            </p>
          </div>
        </div>
      </section>

      {/* Module Selector & Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Bar */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 px-2">
              Capabilities Architecture
            </p>
            {platformModulesData.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModule(mod.id);
                  onNavigate(`/platform/${mod.id}`);
                }}
                className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                  (currentModuleId || selectedModule) === mod.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div>
                  <p className="text-xs font-bold">{mod.name}</p>
                  <p className={`text-[11px] truncate max-w-[200px] ${
                    (currentModuleId || selectedModule) === mod.id ? "text-slate-300" : "text-slate-400"
                  }`}>
                    {mod.tagline}
                  </p>
                </div>
                <ChevronIcon isSelected={(currentModuleId || selectedModule) === mod.id} />
              </button>
            ))}

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3 mt-6">
              <p className="text-xs font-bold text-slate-900">Try it with sample data</p>
              <p className="text-[11px] text-slate-500">
                Explore how these 8 modules interact inside our synthetic Northstar Health AI demo environment.
              </p>
              <button
                onClick={() => onNavigate(demoUrl)}
                className="w-full py-2 px-3 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Open Interactive Demo →
              </button>
            </div>
          </div>

          {/* Right Detail Pane */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  MODULE SPECIFICATION • {currentMod.id.toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {currentMod.name}
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  {currentMod.tagline}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed pt-2">
                  {currentMod.description}
                </p>
              </div>

              {/* Core Capabilities Checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <p className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400">
                  Core Capabilities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentMod.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50/70 border border-slate-100 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role-Specific Benefits */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <p className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400">
                  Role-Specific Value
                </p>
                <div className="space-y-2">
                  {currentMod.roleBenefits.map((rb, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1 text-xs">
                      <span className="font-bold text-slate-900 font-mono text-[11px]">{rb.role}</span>
                      <p className="text-slate-600">{rb.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Accountability Notes */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-[11px] uppercase tracking-wider font-bold">
                    Security &amp; Assurance Boundary
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {currentMod.securityNotes}
                </p>
              </div>

              {/* Connected Modules */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Interconnected with:</span>
                {currentMod.connections.map((c, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-semibold text-slate-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function ChevronIcon({ isSelected }: { isSelected: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isSelected ? "text-white" : "text-slate-400"}>
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
