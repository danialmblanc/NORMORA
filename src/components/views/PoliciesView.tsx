import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Users,
  Search,
  Plus,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";
import { PolicyItem } from "../../types/grc";

interface PoliciesViewProps {
  policies: PolicyItem[];
  onOpenPolicyAgent: (policyTitle: string) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  policies,
  onOpenPolicyAgent,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);

  const filtered = policies.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Policy Library
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              {policies.length} Active Policies
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Version-controlled governance policies mapped to universal controls and distributed to workforce members with automated annual acknowledgement tracking.
          </p>
        </div>

        <button
          onClick={() => onOpenPolicyAgent("New Corporate Security Policy")}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Draft Policy with Policy Agent</span>
        </button>
      </div>

      {/* Policies List */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search policies by code or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {filtered.map((policy) => (
            <div
              key={policy.id}
              onClick={() => setSelectedPolicy(policy)}
              className="p-4 hover:bg-slate-50/80 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">
                    {policy.code}
                  </span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                    Version {policy.version}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Approved: {policy.lastApprovedDate}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {policy.title}
                </h3>
                <p className="text-slate-500 text-[11px] line-clamp-1 max-w-2xl">
                  {policy.summary}
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 font-semibold text-emerald-700">
                    <Users className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{policy.acknowledgementRate}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {policy.totalAssigned}/{policy.totalAssigned} Employees
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Drawer Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="flex h-full w-full max-w-xl flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-600 uppercase">
                  {selectedPolicy.code} • Version {selectedPolicy.version}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  {selectedPolicy.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="font-semibold text-slate-800">Executive Summary</div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {selectedPolicy.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <span className="text-slate-400">Policy Owner</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedPolicy.owner}</div>
                </div>
                <div>
                  <span className="text-slate-400">Approver</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedPolicy.approver}</div>
                </div>
                <div>
                  <span className="text-slate-400">Approved Date</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedPolicy.lastApprovedDate}</div>
                </div>
                <div>
                  <span className="text-slate-400">Workforce Acknowledgement</span>
                  <div className="font-semibold text-emerald-700 mt-0.5">{selectedPolicy.acknowledgementRate}% Compliant</div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    alert(`Exporting ${selectedPolicy.title} as signed PDF.`);
                  }}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  <span>Download Policy Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
