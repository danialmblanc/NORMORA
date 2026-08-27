import React from "react";
import {
  Sparkles,
  Lock,
  ExternalLink,
  UserCheck,
  Bell,
  Building,
} from "lucide-react";
import { ProductModule } from "../types/grc";

interface HeaderProps {
  activeModule?: ProductModule;
  currentRole: string;
  onRoleChange: (role: string) => void;
  onOpenTrustCenter: () => void;
  onOpenAIQuickRun: () => void;
  isAuditorMode: boolean;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  activeTenantName?: string;
  onOpenDiscovery?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule = "overview",
  currentRole,
  onRoleChange,
  onOpenTrustCenter,
  onOpenAIQuickRun,
  isAuditorMode,
  onOpenNotifications,
  unreadNotificationsCount = 2,
  activeTenantName = "Northstar Health AI",
  onOpenDiscovery,
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
      case "training":
        return "Workforce Compliance Training & Policy Portal";
      case "partner":
        return "MSP Multi-Tenant Portfolio Console";
      default:
        return "Assurance Orchestrator";
    }
  };

  return (
    <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 bg-white z-30 shrink-0">
      <div className="flex items-center gap-4 lg:gap-6">
        <h1 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-sans">
          {getModuleTitle()}
        </h1>

        <div className="hidden sm:flex gap-3 text-[11px] font-mono items-center">
          <span className="text-green-600 uppercase tracking-tight flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded border border-green-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Syncing Live
          </span>
          <span className="text-slate-600 uppercase tracking-tight hidden md:flex items-center gap-1 font-semibold">
            <Building className="w-3 h-3 text-slate-400" />
            Tenant: {activeTenantName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Auditor Mode Banner if active */}
        {isAuditorMode && (
          <div className="flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-mono font-medium text-amber-800 border border-amber-200 uppercase tracking-tighter">
            <Lock className="h-3 w-3" />
            <span>Auditor Scoped</span>
          </div>
        )}

        {/* Discovery Scan Trigger */}
        {onOpenDiscovery && (
          <button
            id="btn-context-discovery"
            onClick={onOpenDiscovery}
            className="hidden md:flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Sparkles className="h-3 w-3 text-emerald-500" />
            <span>Context Scan</span>
          </button>
        )}

        {/* Notification Bell */}
        {onOpenNotifications && (
          <button
            id="btn-header-notifications"
            onClick={onOpenNotifications}
            className="relative p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title="Notification & Delivery Center"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
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
              <option value="Employee">Employee Portal</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};


