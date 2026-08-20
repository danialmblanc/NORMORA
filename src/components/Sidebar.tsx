import React from "react";
import {
  LayoutDashboard,
  Building2,
  CheckSquare,
  Link2,
  FileCheck2,
  Bot,
  AlertTriangle,
  FileBadge2,
  Globe2,
  BookOpen,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { ProductModule } from "../types/grc";

interface SidebarProps {
  activeModule: ProductModule;
  onSelectModule: (mod: ProductModule) => void;
  pendingReviewsCount: number;
  onQuickAudit?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  pendingReviewsCount,
  onQuickAudit,
}) => {
  const navItems = [
    {
      id: "overview" as ProductModule,
      name: "Overview",
      shortLabel: "Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "context" as ProductModule,
      name: "Context",
      shortLabel: "Context",
      icon: Building2,
      badge: "v3.4",
    },
    {
      id: "controls" as ProductModule,
      name: "Controls",
      shortLabel: "Controls",
      icon: CheckSquare,
      badge: "124",
    },
    {
      id: "connect" as ProductModule,
      name: "Connect",
      shortLabel: "Connect",
      icon: Link2,
      badge: "Live",
      badgeType: "success",
    },
    {
      id: "evidence" as ProductModule,
      name: "Evidence",
      shortLabel: "Evidence",
      icon: FileCheck2,
      badge: "Automated",
    },
    {
      id: "agents" as ProductModule,
      name: "Agents",
      shortLabel: "Agents",
      icon: Bot,
      badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} Review` : "AI",
      badgeType: "indigo",
      isAi: true,
    },
    {
      id: "risk" as ProductModule,
      name: "Risk",
      shortLabel: "Risk",
      icon: AlertTriangle,
      badge: "Mitigated",
    },
    {
      id: "audit" as ProductModule,
      name: "Audit",
      shortLabel: "Audit",
      icon: FileBadge2,
      badge: "Active",
    },
    {
      id: "trust" as ProductModule,
      name: "Trust",
      shortLabel: "Trust",
      icon: Globe2,
      badge: "Public",
    },
    {
      id: "policies" as ProductModule,
      name: "Policies",
      shortLabel: "Policies",
      icon: BookOpen,
      badge: "4 Active",
    },
    {
      id: "operations" as ProductModule,
      name: "Operations",
      shortLabel: "Operations",
      icon: Activity,
      badge: "100% Pass",
      badgeType: "success",
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-100 flex flex-col h-full bg-slate-50/50 shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100/80">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-5 h-5 bg-slate-900 rounded-xs flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase text-slate-900">
            Normora
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
          Compliance Orchestration
        </p>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectModule(item.id)}
              className={`group flex w-full items-center justify-between p-2 rounded-md transition-colors cursor-pointer text-left ${
                isActive
                  ? "bg-slate-200/60 text-slate-900 font-semibold italic"
                  : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span className="text-sm truncate">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      item.badgeType === "success"
                        ? "bg-green-100 text-green-700 font-semibold"
                        : item.badgeType === "indigo"
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : isActive
                        ? "bg-slate-300/60 text-slate-800"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full shrink-0"></div>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Action / Guarantee Footer */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <button
          id="btn-sidebar-new-audit"
          onClick={onQuickAudit}
          className="w-full bg-slate-900 text-white p-2.5 rounded-lg text-center cursor-pointer uppercase tracking-widest text-[11px] font-bold hover:bg-slate-800 transition-colors shadow-2xs"
        >
          New Audit Scope
        </button>

        <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400 font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="truncate">Deterministic Assurance</span>
        </div>
      </div>
    </aside>
  );
};

