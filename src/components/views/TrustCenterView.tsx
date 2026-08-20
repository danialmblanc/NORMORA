import React, { useState } from "react";
import {
  Globe2,
  ShieldCheck,
  Lock,
  Download,
  CheckCircle2,
  ExternalLink,
  FileText,
  Building,
  Mail,
  Send,
  Sparkles,
  AlertCircle,
  FileCode,
  X,
} from "lucide-react";
import { Framework, VendorItem } from "../../types/grc";

interface TrustCenterViewProps {
  frameworks: Framework[];
  vendors: VendorItem[];
}

export const TrustCenterView: React.FC<TrustCenterViewProps> = ({
  frameworks,
  vendors,
}) => {
  const [selectedGatedDoc, setSelectedGatedDoc] = useState<string | null>(null);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [ndaEmail, setNdaEmail] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const gatedResources = [
    {
      id: "DOC-PEN-2026",
      title: "2026 Comprehensive External Network & Web Application Penetration Test (Full Report)",
      format: "PDF (Signed by Bishop Fox / Cobalt)",
      gated: true,
      size: "4.2 MB",
      badge: "Gated (NDA Required)",
    },
    {
      id: "DOC-SOC2-REPORT",
      title: "SOC 2 Type II Full Audit Report (Security & Confidentiality, Period Ending Oct 2026)",
      format: "PDF (Schellman & Co. Certified)",
      gated: true,
      size: "8.6 MB",
      badge: "Gated (NDA Required)",
    },
    {
      id: "DOC-AI-WHITEPAPER",
      title: "Normora ISO 42001 AI Safety, Model Isolation & Data Residency Architecture Whitepaper",
      format: "PDF Technical Whitepaper",
      gated: false,
      size: "1.8 MB",
      badge: "Public Access",
    },
    {
      id: "DOC-DPA-STANDARD",
      title: "Standard Customer Data Processing Addendum (DPA) with EU Standard Contractual Clauses",
      format: "PDF Legal Addendum",
      gated: false,
      size: "850 KB",
      badge: "Public Access",
    },
  ];

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaEmail || !ndaAccepted) return;

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setSelectedGatedDoc(null);
      setNdaEmail("");
      setNdaAccepted(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Trust Center
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
              Real-time Public & Gated Assurance
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Customer-facing security trust portal. Demonstrates live compliance certifications, continuous monitoring posture, public DPAs, and NDA-gated penetration test reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#public-preview"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
            <span>trust.normora.ai</span>
          </a>
        </div>
      </div>

      {/* Live Posture Hero Card */}
      <div className="rounded-xl border border-slate-900 bg-slate-900 p-6 text-white shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                All Enterprise Security Systems Operational & Certified
              </h2>
              <p className="text-xs text-slate-300">
                Continuous control monitoring refreshed every hour across AWS, GCP, and GitHub workloads.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Control Checks Passing
            </span>
          </div>
        </div>

        {/* Framework Badges Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2 border-t border-slate-800">
          {frameworks.slice(0, 4).map((fw) => (
            <div key={fw.id} className="rounded-lg bg-slate-850 p-3 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {fw.code} Certified
              </span>
              <div className="text-xs font-semibold text-slate-100">{fw.name.split("(")[0]}</div>
              <div className="text-[10px] text-slate-400">{fw.version}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Assurance Resources (Public & Gated) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Compliance Artifacts & Assurance Documents
          </h2>
          <p className="text-xs text-slate-500">
            Download public security whitepapers or request verified NDA-gated access to third-party auditor reports.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {gatedResources.map((res) => (
            <div
              key={res.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-900">{res.title}</span>
                </div>
                <p className="text-[11px] text-slate-500">{res.format} • {res.size}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                    res.gated
                      ? "bg-amber-50 text-amber-800 ring-1 ring-amber-300"
                      : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                  }`}
                >
                  {res.badge}
                </span>

                <button
                  onClick={() => {
                    if (res.gated) {
                      setSelectedGatedDoc(res.title);
                    } else {
                      alert(`Downloading public document: ${res.title}`);
                    }
                  }}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  <span>{res.gated ? "Request Access" : "Download"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subprocessor Transparency Directory */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Public Subprocessor Registry (GDPR Article 28)
          </h2>
          <p className="text-xs text-slate-500">
            Current list of approved infrastructure and application subprocessors processing corporate or customer data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {vendors.map((v) => (
            <div key={v.id} className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 space-y-1 text-xs">
              <div className="font-semibold text-slate-900">{v.name}</div>
              <div className="text-[11px] text-slate-500">{v.category}</div>
              <div className="text-[10px] text-emerald-700 font-medium">DPA Active & Bound</div>
            </div>
          ))}
        </div>
      </div>

      {/* NDA Gate Request Modal */}
      {selectedGatedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-amber-600" />
                <h2 className="text-base font-bold text-slate-900">
                  NDA Gate & Access Verification
                </h2>
              </div>
              <button
                onClick={() => setSelectedGatedDoc(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {downloadSuccess ? (
              <div className="rounded-lg bg-emerald-50 p-4 text-center space-y-2 text-emerald-800">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                <p className="font-semibold text-xs">Access Granted via Instant Verification</p>
                <p className="text-[11px] text-emerald-700">
                  A secure, single-use, time-bounded download link for <strong>{selectedGatedDoc}</strong> has been generated and dispatched.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestAccess} className="space-y-4 text-xs">
                <p className="text-slate-600">
                  You are requesting access to confidential audit documentation:
                  <br />
                  <strong className="text-slate-900 block mt-1">{selectedGatedDoc}</strong>
                </p>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Corporate Business Email</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={ndaEmail}
                    onChange={(e) => setNdaEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 border border-slate-200">
                  <input
                    type="checkbox"
                    id="nda-checkbox"
                    checked={ndaAccepted}
                    onChange={(e) => setNdaAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-slate-900"
                    required
                  />
                  <label htmlFor="nda-checkbox" className="text-[11px] text-slate-600">
                    I acknowledge and agree that this document contains proprietary, confidential security controls of Normora Technologies, Inc. and is subject to our Mutual Non-Disclosure Agreement.
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSelectedGatedDoc(null)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!ndaAccepted || !ndaEmail}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                  >
                    Accept NDA & Request Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
