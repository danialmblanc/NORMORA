import React, { useState } from "react";
import {
  FileBadge2,
  Lock,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Calendar,
} from "lucide-react";
import { AuditEngagement, EvidenceArtifact } from "../../types/grc";

interface AuditViewProps {
  audits: AuditEngagement[];
  evidence: EvidenceArtifact[];
  isAuditorMode: boolean;
  onToggleAuditorMode: () => void;
}

export const AuditView: React.FC<AuditViewProps> = ({
  audits,
  evidence,
  isAuditorMode,
  onToggleAuditorMode,
}) => {
  const [selectedAudit, setSelectedAudit] = useState<AuditEngagement>(audits[0]);

  const auditRequests = [
    {
      id: "REQ-01",
      item: "Population of all new hires in Q2 and Q3 with signed I-9 and background check verifications.",
      status: "Accepted by Auditor",
      evidenceLinked: "HR_Q2_Q3_Roster_Background_Checks.csv",
    },
    {
      id: "REQ-02",
      item: "Automated IAM credential report demonstrating 100% MFA enforcement on AWS root and console users.",
      status: "Accepted by Auditor",
      evidenceLinked: "AWS_IAM_MFA_Enforcement_Report_Q3.json",
    },
    {
      id: "REQ-03",
      item: "Annual disaster recovery failover test report with documented RTO/RPO metrics.",
      status: "In Auditor Review",
      evidenceLinked: "DR_Failover_Simulation_Report_2026.pdf",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Audit
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              Auditor Portal & Scope Freeze
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Audit workspace with immutable evidence freezing, time-bounded auditor access, and sampling request tracking. Auditors access only explicitly scoped engagement snapshots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAuditorMode}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold shadow-xs transition-colors ${
              isAuditorMode
                ? "bg-amber-600 text-white hover:bg-amber-500"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>{isAuditorMode ? "Exit Auditor Portal Mode" : "Simulate Auditor Portal View"}</span>
          </button>
        </div>
      </div>

      {/* Engagements Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {audits.map((audit) => {
          const isSelected = selectedAudit.id === audit.id;

          return (
            <div
              key={audit.id}
              onClick={() => setSelectedAudit(audit)}
              className={`rounded-xl p-5 border cursor-pointer transition-all ${
                isSelected
                  ? "border-slate-900 bg-white shadow-xs ring-1 ring-slate-900"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-slate-400">
                    {audit.auditType}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                    {audit.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Auditor Firm: <strong className="text-slate-700 font-medium">{audit.auditorFirm}</strong>
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                  {audit.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Scoped Audit Period:</span>
                  <span className="font-medium text-slate-800">{audit.period}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Scoped Controls:</span>
                  <span className="font-semibold text-slate-900">{audit.scopedControlsCount} controls</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Auditor Access Expiry:</span>
                  <span className="font-medium text-amber-700">{audit.auditorAccessExpiry}</span>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Audit Fieldwork Progress</span>
                    <span className="font-bold text-slate-800">{audit.progressPct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{ width: `${audit.progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Engagement Workspace Details */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {selectedAudit.title} • Auditor Scope Manifest
            </h2>
            <p className="text-xs text-slate-500">
              Auditor: {selectedAudit.auditorFirm} • Scope Snapshot Hash: <code className="text-emerald-700 bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">{selectedAudit.evidencePackageHash.slice(0, 24)}...</code>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
              0 Formal Findings (100% Pass)
            </span>
          </div>
        </div>

        {/* Requests / Sampling List */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Auditor Sampling & Request Tracker ({auditRequests.length})
          </h3>

          <div className="space-y-3">
            {auditRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{req.id}</span>
                    <span className="text-slate-700 font-medium">{req.item}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <FileCheck2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>Linked Evidence: <strong className="text-indigo-700">{req.evidenceLinked}</strong></span>
                  </div>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded px-2.5 py-1 text-[10px] font-semibold ${
                    req.status === "Accepted by Auditor"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                      : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
