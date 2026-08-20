import React, { useState } from "react";
import {
  CheckCircle2,
  Sparkles,
  Shield,
  FileCode,
  Save,
  Copy,
  Check,
} from "lucide-react";
import { ContextProfile, Framework } from "../../types/grc";

interface ContextViewProps {
  context?: ContextProfile;
  profile?: ContextProfile;
  frameworks?: Framework[];
  onSaveContext?: (updated: ContextProfile) => void;
  onUpdateProfile?: (updated: ContextProfile) => void;
}

export const ContextView: React.FC<ContextViewProps> = ({
  context,
  profile,
  frameworks,
  onSaveContext,
  onUpdateProfile,
}) => {
  const initialData = context || profile!;
  const [formData, setFormData] = useState<ContextProfile>(initialData);
  const [activeTab, setActiveTab] = useState<"organization" | "infrastructure" | "data_ai" | "export">("organization");
  const [copied, setCopied] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = () => {
    if (onSaveContext) onSaveContext(formData);
    if (onUpdateProfile) onUpdateProfile(formData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Context
            </h1>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-700">
              Version {formData.version} (Active)
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            The structured organization and compliance context that grounds all AI agent drafts, policy authoring, universal controls, and risk models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-context-save"
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-2xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save & Approve</span>
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Context profile version updated successfully. AI Agent grounding cache refreshed.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-2 rounded-t-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab("organization")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "organization"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          1. Company & Entity Profile
        </button>
        <button
          onClick={() => setActiveTab("infrastructure")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "infrastructure"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          2. Systems, Cloud & Hosting
        </button>
        <button
          onClick={() => setActiveTab("data_ai")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "data_ai"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          3. Data & AI Governance
        </button>
        <button
          onClick={() => setActiveTab("export")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === "export"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          4. AI Grounding JSON
        </button>
      </div>

      {/* Tab 1: Organization & Entity Profile */}
      {activeTab === "organization" && (
        <div className="rounded-b-xl border border-t-0 border-slate-100 bg-white p-6 shadow-2xs space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Official Legal Entity Name
              </label>
              <input
                type="text"
                value={formData.legalEntity}
                onChange={(e) => setFormData({ ...formData, legalEntity: e.target.value })}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-400">Used in official policy declarations and auditor NDAs.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Trading / Brand Name
              </label>
              <input
                type="text"
                value={formData.tradingName}
                onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-400">Displayed across Trust Center and customer communications.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Headquarters Location
              </label>
              <input
                type="text"
                value={formData.headquarters}
                onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Workforce Size & Operations Model
              </label>
              <input
                type="text"
                value={formData.workforceSize}
                onChange={(e) => setFormData({ ...formData, workforceSize: e.target.value })}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Operating Jurisdictions (Regulatory Scope)
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.operatingJurisdictions.map((jur, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1.5 text-xs font-mono font-medium text-slate-700"
                >
                  <Shield className="h-3 w-3 text-slate-500" />
                  {jur}
                </span>
              ))}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">Triggers GDPR, CCPA, and UK-GDPR control scoping.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Business Model & Customer Type Description
            </label>
            <textarea
              rows={3}
              value={formData.businessModel}
              onChange={(e) => setFormData({ ...formData, businessModel: e.target.value })}
              className="w-full rounded-md border border-slate-200 p-3 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Infrastructure & Hosting */}
      {activeTab === "infrastructure" && (
        <div className="rounded-b-xl border border-t-0 border-slate-100 bg-white p-6 shadow-2xs space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Primary Cloud Providers
            </label>
            <input
              type="text"
              value={formData.primaryCloud}
              onChange={(e) => setFormData({ ...formData, primaryCloud: e.target.value })}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Active Hosting Regions & Data Centers
            </label>
            <div className="space-y-2">
              {formData.hostingRegions.map((region, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-md border border-slate-100 bg-slate-50/60 p-2.5 text-xs text-slate-800 font-mono">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{region}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Data & AI Governance */}
      {activeTab === "data_ai" && (
        <div className="rounded-b-xl border border-t-0 border-slate-100 bg-white p-6 shadow-2xs space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Data Classification Levels
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {formData.dataClassificationLevels.map((lvl, idx) => (
                <div key={idx} className="rounded-md border border-slate-100 bg-slate-50/60 p-3 text-xs">
                  <span className="font-semibold text-slate-800 font-mono">{lvl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-slate-900" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                ISO 42001 AI Governance Profile
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Normora maintains an active registry of artificial intelligence systems to enforce traceability, prompt-injection defense, and non-disclosure boundaries.
            </p>

            <div className="space-y-2">
              {formData.aiUseCases.map((uc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 rounded-md bg-white p-3 text-xs text-slate-800 shadow-2xs border border-slate-100">
                  <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-slate-900 text-[10px] font-bold text-white font-mono">
                    {idx + 1}
                  </span>
                  <span>{uc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Structured JSON Projection */}
      {activeTab === "export" && (
        <div className="rounded-b-xl border border-t-0 border-slate-100 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-slate-600" />
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Agent Grounding Projection (JSON Schema v3.4.0)
              </span>
            </div>
            <button
              onClick={copyJson}
              className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
              <span>{copied ? "Copied!" : "Copy JSON"}</span>
            </button>
          </div>

          <pre className="max-h-96 overflow-y-auto rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

