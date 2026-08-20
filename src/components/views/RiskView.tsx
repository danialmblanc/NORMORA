import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Building,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Layers,
  X,
} from "lucide-react";
import { RiskItem, VendorItem } from "../../types/grc";

interface RiskViewProps {
  risks: RiskItem[];
  vendors: VendorItem[];
  onAddRisk: (risk: RiskItem) => void;
  onAddVendor: (vendor: VendorItem) => void;
}

export const RiskView: React.FC<RiskViewProps> = ({
  risks,
  vendors,
  onAddRisk,
  onAddVendor,
}) => {
  const [activeTab, setActiveTab] = useState<"enterprise_risks" | "vendor_risks" | "heatmap">("enterprise_risks");
  const [showAddRiskModal, setShowAddRiskModal] = useState(false);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);

  // New Risk Form
  const [riskTitle, setRiskTitle] = useState("");
  const [threatActor, setThreatActor] = useState("");
  const [category, setCategory] = useState<RiskItem["category"]>("Security");
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(4);

  // New Vendor Form
  const [vendorName, setVendorName] = useState("");
  const [vendorCat, setVendorCat] = useState<VendorItem["category"]>("Cloud Hosting");
  const [vendorCrit, setVendorCrit] = useState<VendorItem["criticality"]>("Tier 1 - Critical");

  const handleCreateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskTitle) return;

    const newRisk: RiskItem = {
      id: `RISK-${Date.now().toString().slice(-3)}`,
      title: riskTitle,
      threatActor: threatActor || "External Threat Actor",
      category,
      inherentLikelihood: likelihood,
      inherentImpact: impact,
      inherentScore: likelihood * impact,
      mitigatingControls: ["CTRL-AC-01", "CTRL-CRYPT-02"],
      treatment: "Mitigate",
      residualLikelihood: Math.max(1, likelihood - 2),
      residualImpact: Math.max(1, impact - 1),
      residualScore: Math.max(1, likelihood - 2) * Math.max(1, impact - 1),
      owner: "Security Lead",
      status: "Mitigated",
      reviewCadence: "Quarterly",
      nextReviewDate: "2026-11-30",
    };

    onAddRisk(newRisk);
    setShowAddRiskModal(false);
    setRiskTitle("");
    setThreatActor("");
  };

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName) return;

    const newVendor: VendorItem = {
      id: `VEND-${Date.now().toString().slice(-3)}`,
      name: vendorName,
      category: vendorCat,
      criticality: vendorCrit,
      dataAccessLevel: "Internal Metadata",
      certifications: ["SOC 2 Type II", "ISO 27001"],
      dpaStatus: "Executed & Active",
      soc2Expiry: "2027-01-15",
      inherentRisk: "Medium",
      status: "Approved",
      lastReviewed: "2026-08-15",
    };

    onAddVendor(newVendor);
    setShowAddVendorModal(false);
    setVendorName("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Risk
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              Inherent vs Residual Scored
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Enterprise and third-party vendor risk register. Deterministic mathematical formulas link mitigating universal controls to residual risk reduction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "enterprise_risks" || activeTab === "heatmap" ? (
            <button
              onClick={() => setShowAddRiskModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Log Enterprise Risk</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddVendorModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Subprocessor / Vendor</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-xl">
        <button
          onClick={() => setActiveTab("enterprise_risks")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
            activeTab === "enterprise_risks"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Enterprise Risk Register ({risks.length})
        </button>
        <button
          onClick={() => setActiveTab("heatmap")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
            activeTab === "heatmap"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          5x5 Likelihood x Impact Heatmap
        </button>
        <button
          onClick={() => setActiveTab("vendor_risks")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
            activeTab === "vendor_risks"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Vendor & Subprocessor Inventory ({vendors.length})
        </button>
      </div>

      {/* Tab 1: Enterprise Risks */}
      {activeTab === "enterprise_risks" && (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Risk & Threat Actor</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Inherent Score</th>
                  <th className="px-4 py-3">Mitigating Controls</th>
                  <th className="px-4 py-3">Residual Score</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {risks.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900">{r.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Threat: {r.threatActor} • Owner: {r.owner}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                        {r.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                        {r.inherentScore} (L{r.inherentLikelihood} × I{r.inherentImpact})
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {r.mitigatingControls.map((c, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-mono font-medium text-indigo-700"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px] w-fit">
                        <TrendingDown className="h-3 w-3" />
                        <span>{r.residualScore} (L{r.residualLikelihood} × I{r.residualImpact})</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 5x5 Heatmap */}
      {activeTab === "heatmap" && (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              5x5 Inherent Likelihood vs Impact Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Visualizes risk concentration prior to continuous automated control mitigation.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-2 max-w-2xl text-center text-xs font-semibold">
            {/* Header row */}
            <div className="p-2 text-slate-400">Impact →</div>
            <div className="p-2 text-slate-600">1 (Negligible)</div>
            <div className="p-2 text-slate-600">2 (Minor)</div>
            <div className="p-2 text-slate-600">3 (Moderate)</div>
            <div className="p-2 text-slate-600">4 (Major)</div>
            <div className="p-2 text-slate-600">5 (Severe)</div>

            {/* Rows for Likelihood 5 down to 1 */}
            {[5, 4, 3, 2, 1].map((lh) => (
              <React.Fragment key={lh}>
                <div className="flex items-center justify-center text-slate-600 font-medium p-2">
                  L{lh}
                </div>
                {[1, 2, 3, 4, 5].map((imp) => {
                  const score = lh * imp;
                  const matchingRisks = risks.filter(
                    (r) => r.inherentLikelihood === lh && r.inherentImpact === imp
                  );
                  const isHigh = score >= 15;
                  const isMed = score >= 8 && score < 15;

                  return (
                    <div
                      key={imp}
                      className={`h-14 rounded-lg flex flex-col items-center justify-center p-1 border transition-all ${
                        isHigh
                          ? "bg-rose-50 border-rose-200 text-rose-800"
                          : isMed
                          ? "bg-amber-50 border-amber-200 text-amber-800"
                          : "bg-emerald-50 border-emerald-200 text-emerald-800"
                      }`}
                    >
                      <span className="text-[10px] text-slate-400">Score {score}</span>
                      {matchingRisks.length > 0 && (
                        <span className="mt-0.5 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                          {matchingRisks.length} Risk{matchingRisks.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Vendor & Subprocessor Inventory */}
      {activeTab === "vendor_risks" && (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Vendor & Category</th>
                  <th className="px-4 py-3">Criticality Tier</th>
                  <th className="px-4 py-3">Data Access Level</th>
                  <th className="px-4 py-3">Certifications Verified</th>
                  <th className="px-4 py-3">DPA Status</th>
                  <th className="px-4 py-3">SOC 2 Expiry</th>
                  <th className="px-4 py-3">Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {vendors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900">{v.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{v.category}</div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-800">
                        {v.criticality}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 text-[11px]">
                      {v.dataAccessLevel}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {v.certifications.map((c, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        {v.dpaStatus}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 text-[11px] font-mono">
                      {v.soc2Expiry}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Risk Modal */}
      {showAddRiskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <form onSubmit={handleCreateRisk} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Log Enterprise Risk Item
              </h2>
              <button
                type="button"
                onClick={() => setShowAddRiskModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Risk Statement</label>
                <input
                  type="text"
                  placeholder="e.g. Accidental unencrypted staging data store exposure"
                  value={riskTitle}
                  onChange={(e) => setRiskTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Threat Actor / Cause</label>
                  <input
                    type="text"
                    placeholder="e.g. Opportunistic External Actor"
                    value={threatActor}
                    onChange={(e) => setThreatActor(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option value="Security">Security</option>
                    <option value="Privacy">Privacy</option>
                    <option value="Operational">Operational</option>
                    <option value="Third-Party">Third-Party</option>
                    <option value="AI & Model Safety">AI & Model Safety</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inherent Likelihood (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={likelihood}
                    onChange={(e) => setLikelihood(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inherent Impact (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={impact}
                    onChange={(e) => setImpact(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddRiskModal(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Save Risk
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddVendorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <form onSubmit={handleCreateVendor} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Register Third-Party Subprocessor
              </h2>
              <button
                type="button"
                onClick={() => setShowAddVendorModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vendor Entity Name</label>
                <input
                  type="text"
                  placeholder="e.g. MongoDB Atlas (Cloud Database)"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Category</label>
                <select
                  value={vendorCat}
                  onChange={(e) => setVendorCat(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                >
                  <option value="Cloud Hosting">Cloud Hosting</option>
                  <option value="Data Pipeline">Data Pipeline</option>
                  <option value="Observability">Observability</option>
                  <option value="CRM & Support">CRM & Support</option>
                  <option value="AI Infrastructure">AI Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Criticality Tier</label>
                <select
                  value={vendorCrit}
                  onChange={(e) => setVendorCrit(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                >
                  <option value="Tier 1 - Critical">Tier 1 - Critical (Stores or processes production PII)</option>
                  <option value="Tier 2 - High">Tier 2 - High (Direct internal systems integration)</option>
                  <option value="Tier 3 - Medium">Tier 3 - Medium (Aggregated telemetry)</option>
                  <option value="Tier 4 - Low">Tier 4 - Low (No customer data access)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddVendorModal(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Save Subprocessor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
