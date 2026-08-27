import React, { useState } from "react";
import {
  Building2,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ContextProfile } from "../../types/grc";

interface ContextDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ContextProfile;
  onSaveProfile: (profile: ContextProfile) => void;
}

export const ContextDiscoveryModal: React.FC<ContextDiscoveryModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [step, setStep] = useState<"source" | "scanning" | "review" | "frameworks" | "completed">("source");
  const [companyUrl, setCompanyUrl] = useState("https://northstarhealth.ai");
  const [scanProgress, setScanProgress] = useState(0);

  // Inferred context facts with confidence and grounding
  const [inferredFacts, setInferredFacts] = useState([
    {
      field: "Legal Entity",
      val: "Northstar Health Technologies Delaware Corp.",
      source: "https://northstarhealth.ai/terms",
      evidence: "Operated by Northstar Health Technologies Inc., registered in Delaware.",
      confidence: 98,
      status: "verified",
    },
    {
      field: "Primary Cloud & Regions",
      val: "AWS us-east-1 (N. Virginia) & GCP us-central1",
      source: "https://northstarhealth.ai/security",
      evidence: "Hosted in SOC 2 Type II compliant AWS and Google Cloud data centers in North America.",
      confidence: 95,
      status: "verified",
    },
    {
      field: "Data Classifications & ePHI",
      val: "Protected Health Information (ePHI), Telemetry & PII",
      source: "https://northstarhealth.ai/privacy",
      evidence: "Processes HIPAA-regulated clinical diagnostics and electronic patient records.",
      confidence: 94,
      status: "verified",
    },
    {
      field: "Production AI Systems",
      val: "Active (Diagnostic Summarization & Clinical Copilots)",
      source: "https://northstarhealth.ai/product",
      evidence: "Utilizes proprietary LLM pipelines and clinical inference architectures.",
      confidence: 96,
      status: "verified",
    },
    {
      field: "Target Assurance Programs",
      val: "SOC 2 Type II, ISO 27001, HIPAA, ISO 42001 (AI)",
      source: "https://northstarhealth.ai/trust",
      evidence: "Committed to AICPA Trust Criteria, ISO 27001 ISMS, and ISO 42001 AI governance.",
      confidence: 99,
      status: "verified",
    },
  ]);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setStep("scanning");
    setScanProgress(20);
    setTimeout(() => setScanProgress(55), 400);
    setTimeout(() => setScanProgress(85), 800);
    setTimeout(() => {
      setScanProgress(100);
      setStep("review");
    }, 1200);
  };

  const handleApproveContext = () => {
    setStep("frameworks");
  };

  const handleGenerateProgram = () => {
    const updated: ContextProfile = {
      ...currentProfile,
      updatedAt: new Date().toISOString().split("T")[0],
      completionScore: 98,
      version: "3.5.0",
    };
    onSaveProfile(updated);
    setStep("completed");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span>Normora Context Discovery &amp; Program Generator</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold uppercase">
                  Workflow B
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Stage: Introduction → Base Context → Program Baseline → Live Workspace
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-mono text-sm px-2 py-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Step 1: Input source */}
          {step === "source" && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  Step 1: Automated Company Context Discovery
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your company domain or security portal URL. Normora's Context Discovery Agent will securely extract corporate jurisdiction, cloud infrastructure boundaries, data processing scopes, and regulatory obligations with complete citation grounding.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                  Company URL or Security Trust Portal
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="url"
                      value={companyUrl}
                      onChange={(e) => setCompanyUrl(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-slate-900 font-mono"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                  <button
                    onClick={handleStartScan}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2 rounded transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Run Discovery Scan</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="p-3 border border-slate-100 bg-slate-50/60 rounded">
                  <strong className="block text-slate-800 mb-0.5">1. Multi-Cloud Topology</strong>
                  <span>Detects AWS, GCP, Azure, and IdP environments.</span>
                </div>
                <div className="p-3 border border-slate-100 bg-slate-50/60 rounded">
                  <strong className="block text-slate-800 mb-0.5">2. Data Classifications</strong>
                  <span>Identifies PHI, PII, and customer telemetry.</span>
                </div>
                <div className="p-3 border border-slate-100 bg-slate-50/60 rounded">
                  <strong className="block text-slate-800 mb-0.5">3. AI System Footprint</strong>
                  <span>Catalogs generative models and inference pipelines.</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Scanning */}
          {step === "scanning" && (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-slate-900 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-spin">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-mono">
                Context Agent: Analyzing {companyUrl}...
              </h4>
              <div className="w-64 bg-slate-100 rounded-full h-2 mx-auto overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Synthesizing entity registrations, cloud architectures, and ISO/SOC 2 mappings...
              </p>
            </div>
          )}

          {/* Step 3: Review Inferred Facts */}
          {step === "review" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Step 2: Review Inferred Context &amp; Grounding Evidence
                  </h4>
                  <p className="text-xs text-slate-500">
                    Verify all extracted attributes. Every item is linked to an authorized source citation.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-mono font-bold rounded border border-emerald-200">
                  5/5 Facts Verified
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
                {inferredFacts.map((fact, idx) => (
                  <div key={idx} className="p-3.5 text-xs space-y-1 bg-white hover:bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 font-mono text-[11px]">{fact.field}</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {fact.confidence}% Confidence
                      </span>
                    </div>
                    <p className="font-medium text-slate-800">{fact.val}</p>
                    <p className="text-[11px] text-slate-500 italic bg-slate-50 p-1.5 rounded border border-slate-100">
                      "{fact.evidence}" — <span className="font-mono text-slate-400">{fact.source}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleApproveContext}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-6 py-2.5 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Approve Base Context Profile</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Framework Selection */}
          {step === "frameworks" && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Step 3: Framework Selection &amp; Program Generation
                </h4>
                <p className="text-xs text-slate-500">
                  Selected compliance baselines will automatically generate universal controls, automated tests, and policy requirements.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { name: "SOC 2 Type II", desc: "Trust Services Criteria (Security, Confidentiality, Availability)", count: "58 Controls" },
                  { name: "ISO/IEC 27001:2022", desc: "Information Security Management System (ISMS) Requirements", count: "84 Controls" },
                  { name: "HIPAA Security & Privacy Rule", desc: "ePHI Safeguards, BAA Tracking & Transmission Security", count: "36 Controls" },
                  { name: "ISO/IEC 42001:2023 (AI Governance)", desc: "AIMS Model Safety, Risk Assessment & Transparency Controls", count: "32 Controls" },
                ].map((fw, i) => (
                  <div key={i} className="p-3.5 border border-slate-200 rounded-lg flex items-center justify-between bg-white shadow-2xs">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded text-slate-900 w-4 h-4 cursor-pointer" />
                      <div>
                        <strong className="text-xs text-slate-900 block">{fw.name}</strong>
                        <span className="text-[11px] text-slate-500">{fw.desc}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {fw.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleGenerateProgram}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-2.5 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Multi-Framework Program</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Completed */}
          {step === "completed" && (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Compliance Program Generated Successfully!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Version 3.5.0 of Northstar Health AI's Base Context is now locked and active. All universal controls, policies, risk items, and automated tests are synchronized.
              </p>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-6 py-2 rounded-md transition-colors cursor-pointer"
                >
                  Close &amp; Return to Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
