import React from "react";
import {
  Sparkles,
  Lock,
  ExternalLink,
  UserCheck,
} from "lucide-react";
import { ProductModule } from "../types/grc";

interface HeaderProps {
  activeModule?: ProductModule;
  currentRole: string;
  onRoleChange: (role: string) => void;
  onOpenTrustCenter: () => void;
  onOpenAIQuickRun: () => void;
  isAuditorMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule = "overview",
  currentRole,
  onRoleChange,
  onOpenTrustCenter,
  onOpenAIQuickRun,
  isAuditorMode,
}) => {
  const getModuleTitle = () => {
    switch (activeModule) {
      case "overview":
        return "Operational Dashboard";
      case "context":
        return "Company & Compliance Context";
      case "controls":
        return "Universal Control Library";
      case "connect":
        return "Connectors & Integration Pipeline";
      case "evidence":
        return "Cryptographic Evidence Vault";
      case "agents":
        return "AI Compliance Agents Studio";
      case "risk":
        return "Enterprise & Vendor Risk Register";
      case "audit":
        return "Audit Workspace & Evidence Sampling";
      case "trust":
        return "Public & Gated Security Trust Center";
      case "policies":
        return "Governance Policy Library";
      case "operations":
        return "Continuous Automated Tests & Exceptions";
      default:
        return "Assurance Orchestrator";
    }
  };

  return (
    <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 bg-white z-30 shrink-0">
      <div className="flex items-center gap-6 lg:gap-8">
        <h1 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-sans">
          {getModuleTitle()}
        </h1>

        <div className="hidden sm:flex gap-4 text-[11px] font-mono">
          <span className="text-green-600 uppercase tracking-tight flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            System Status: Syncing
          </span>
          <span className="text-slate-400 uppercase tracking-tight hidden md:inline">
            Tenant: Normora (US-East)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Auditor Mode Banner if active */}
        {isAuditorMode && (
          <div className="flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-mono font-medium text-amber-800 border border-amber-200 uppercase tracking-tighter">
            <Lock className="h-3 w-3" />
            <span>Auditor Scoped</span>
          </div>
        )}

        {/* Quick Launch AI Agent */}
        <button
          id="btn-quick-ai-agent"
          onClick={onOpenAIQuickRun}
          className="flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span>Launch Agent</span>
        </button>

        {/* Public Trust Center Quick Link */}
        <button
          id="btn-header-trust-center"
          onClick={onOpenTrustCenter}
          className="hidden sm:flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ExternalLink className="h-3 w-3 text-slate-400" />
          <span>Trust Center</span>
        </button>

        {/* Role Selector */}
        <div className="relative flex items-center">
          <label htmlFor="role-select" className="sr-only">Switch Role</label>
          <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/70 px-2.5 py-1.5 text-xs text-slate-700 hover:border-slate-300 transition-colors">
            <UserCheck className="h-3 w-3 text-slate-400" />
            <select
              id="role-select"
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer pr-1 text-xs"
            >
              <option value="Compliance Admin">Compliance Admin</option>
              <option value="Auditor (Read-Only)">Auditor (Read-Only)</option>
              <option value="Control Owner">Control Owner</option>
              <option value="Executive Reviewer">Executive Reviewer</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

