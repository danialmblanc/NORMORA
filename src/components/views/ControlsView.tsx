import React, { useState } from "react";
import {
  CheckSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck2,
  Activity,
  Layers,
  ChevronRight,
  X,
  ExternalLink,
  Plus,
} from "lucide-react";
import { UniversalControl, Framework } from "../../types/grc";

interface ControlsViewProps {
  controls: UniversalControl[];
  frameworks?: Framework[];
  onAddControl?: (ctrl: UniversalControl) => void;
  onUpdateControl?: (ctrl: UniversalControl) => void;
}

export const ControlsView: React.FC<ControlsViewProps> = ({
  controls,
  frameworks,
  onAddControl,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedControl, setSelectedControl] = useState<UniversalControl | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New control form state
  const [newCode, setNewCode] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<UniversalControl["category"]>("Access Control");
  const [newDescription, setNewDescription] = useState("");
  const [newOwner, setNewOwner] = useState("SecOps Team");

  const categories = [
    "All",
    "Access Control",
    "Cryptography",
    "Operations & Monitoring",
    "Human Resources",
    "Vendor & Third-Party",
    "AI Safety & Governance",
  ];

  const filteredControls = controls.filter((ctrl) => {
    const matchesSearch =
      ctrl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ctrl.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ctrl.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ctrl.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || ctrl.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateControl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newTitle) return;

    const created: UniversalControl = {
      id: `CTRL-${newCode.replace(/\s+/g, "-").toUpperCase()}`,
      code: newCode.toUpperCase(),
      title: newTitle,
      category: newCategory,
      description: newDescription || "Universal control drafted in Normora Assurance Engine.",
      owner: newOwner,
      reviewer: "Compliance Lead",
      frequency: "Continuous",
      status: "Effective",
      frameworkMappings: [
        {
          frameworkId: "soc2",
          requirementCode: "CC6.1",
          requirementTitle: "Access Security Baseline",
          rationale: "Ensures compliance with company access management directives.",
        },
      ],
      evidenceIds: ["EV-001"],
    };

    if (onAddControl) onAddControl(created);
    setShowAddModal(false);
    setNewCode("");
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Controls
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-700">
              Universal Control Library ({controls.length})
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Single universal controls mapped across multiple standard frameworks (SOC 2, ISO 27001, HIPAA, GDPR, ISO 42001). Implement once, comply everywhere.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-2xs hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Custom Control</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search controls by code, title, or requirement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-md border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Effective">Effective</option>
              <option value="Testing Pending">Testing Pending</option>
              <option value="Evidence Pending">Evidence Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Controls Table */}
      <div className="rounded-xl border border-slate-100 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-4 py-3">Code & Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Framework Mappings</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredControls.map((ctrl) => (
                <tr
                  key={ctrl.id}
                  onClick={() => setSelectedControl(ctrl)}
                  className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="font-mono text-[11px] font-bold text-slate-900">
                      {ctrl.code}
                    </div>
                    <div className="text-xs font-medium text-slate-800 line-clamp-1">
                      {ctrl.title}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-slate-600">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 font-mono">
                      {ctrl.category}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {ctrl.frameworkMappings.map((m, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-700"
                        >
                          {m.frameworkId.toUpperCase()}: {m.requirementCode}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-slate-600 font-mono text-[11px]">
                    {ctrl.owner}
                  </td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                        ctrl.status === "Effective"
                          ? "bg-emerald-50 text-emerald-700"
                          : ctrl.status === "Testing Pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {ctrl.status === "Effective" && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                      {ctrl.status === "Testing Pending" && <Clock className="h-3 w-3 text-amber-600" />}
                      {ctrl.status}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button className="text-slate-400 hover:text-slate-700">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Control Detail Drawer Modal */}
      {selectedControl && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/30 backdrop-blur-xs p-4">
          <div className="flex h-full w-full max-w-xl flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {selectedControl.code} • Universal Control
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  {selectedControl.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedControl(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-5 text-xs">
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-1">Control Description</h3>
                <p className="text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  {selectedControl.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">Multi-Framework Cross-Mappings</h3>
                <div className="space-y-2">
                  {selectedControl.frameworkMappings.map((m, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50/40 p-3 space-y-1">
                      <div className="flex items-center justify-between font-semibold text-slate-900">
                        <span className="font-mono text-[11px]">{m.frameworkId.toUpperCase()} Req: {m.requirementCode}</span>
                        <span className="text-[10px] font-mono text-slate-500">{m.requirementTitle}</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">{m.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Responsible Owner</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedControl.owner}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Executive Reviewer</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedControl.reviewer}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Test Cadence</span>
                  <div className="font-semibold text-slate-800 mt-0.5 font-mono">{selectedControl.frequency}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Last Verified</span>
                  <div className="font-semibold text-slate-800 mt-0.5 font-mono">{selectedControl.lastTested || "Recent Sync"}</div>
                </div>
              </div>

              {selectedControl.automatedTestId && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <Activity className="h-4 w-4 text-slate-700" />
                    <span className="text-[11px] uppercase tracking-wider font-bold">Linked Continuous Automated Test</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-mono">
                    Test ID: {selectedControl.automatedTestId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Control Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4">
          <form onSubmit={handleCreateControl} className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Author Universal Control
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-1">Control Identifier Code</label>
                <input
                  type="text"
                  placeholder="e.g. SEC-12"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-1">Control Title</label>
                <input
                  type="text"
                  placeholder="e.g. Automated Key Rotation on Production Secret Stores"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                >
                  <option value="Access Control">Access Control</option>
                  <option value="Cryptography">Cryptography</option>
                  <option value="Operations & Monitoring">Operations & Monitoring</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Vendor & Third-Party">Vendor & Third-Party</option>
                  <option value="AI Safety & Governance">AI Safety & Governance</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-1">Implementation Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the operational mandate and verification method..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-md border border-slate-200 p-3 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-slate-800 cursor-pointer"
              >
                Save Control
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

