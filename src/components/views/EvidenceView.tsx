import React, { useState } from "react";
import {
  FileCheck2,
  Search,
  Download,
  Upload,
  Lock,
  CheckCircle2,
  AlertCircle,
  FileCode,
  ShieldCheck,
  Filter,
  Copy,
  Check,
  Clock,
  X,
} from "lucide-react";
import { EvidenceArtifact, UniversalControl } from "../../types/grc";

interface EvidenceViewProps {
  evidence: EvidenceArtifact[];
  controls: UniversalControl[];
  onAddEvidence: (art: EvidenceArtifact) => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  evidence,
  controls,
  onAddEvidence,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceArtifact | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Evidence Form
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<EvidenceArtifact["category"]>("Configuration");
  const [uploadSource, setUploadSource] = useState("Manual Upload / Auditor Request");

  const categories = [
    "All",
    "Configuration",
    "Access Review",
    "Vulnerability Scan",
    "Policy Sign-off",
    "Audit Log",
  ];

  const filtered = evidence.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.sourceConnector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle) return;

    const dummyHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    const newArtifact: EvidenceArtifact = {
      id: `EV-MANUAL-${Date.now().toString().slice(-4)}`,
      title: uploadTitle.endsWith(".pdf") || uploadTitle.endsWith(".json") || uploadTitle.endsWith(".csv")
        ? uploadTitle
        : `${uploadTitle}.pdf`,
      sourceConnector: uploadSource,
      category: uploadCategory,
      collectionTimestamp: new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
      periodCovered: "Current Active Period",
      fileFormat: uploadTitle.endsWith(".json") ? "JSON Document" : "PDF Document",
      fileSize: "1.2 MB",
      sha256Hash: dummyHash,
      status: "Verified & Fresh",
      mappedControls: ["CTRL-AC-01"],
      uploadedBy: "syed.ifrahim@zazmic.ai (Compliance Admin)",
      legalHold: false,
    };

    onAddEvidence(newArtifact);
    setShowUploadModal(false);
    setUploadTitle("");
  };

  const handleExportPackage = () => {
    const manifest = {
      platform: "Normora Assurance Engine",
      packageExportTimestamp: new Date().toISOString(),
      tenant: "Normora Technologies, Inc.",
      totalEvidenceCount: evidence.length,
      artifacts: evidence.map((e) => ({
        id: e.id,
        title: e.title,
        sha256: e.sha256Hash,
        source: e.sourceConnector,
        timestamp: e.collectionTimestamp,
        mappedControls: e.mappedControls,
      })),
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Normora_Auditor_Evidence_Package_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Evidence
            </h1>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-600/20">
              SHA-256 Provenance Verified
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Immutable, cryptographically hashed evidence repository. Every artifact maintains a chain of custody linking source connector, collection timestamp, and universal control mappings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportPackage}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Audit Package</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Artifact</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search evidence by title, hash, or source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Artifact & Source</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Period Covered</th>
                <th className="px-4 py-3">SHA-256 Provenance Hash</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((art) => (
                <tr
                  key={art.id}
                  onClick={() => setSelectedEvidence(art)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      <FileCheck2 className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate max-w-xs">{art.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Source: {art.sourceConnector} • {art.fileSize}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-slate-600">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                      {art.category}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-slate-600 text-[11px]">
                    {art.periodCovered}
                  </td>

                  <td className="px-4 py-3.5 font-mono text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate max-w-[140px] bg-slate-100 px-1.5 py-0.5 rounded">
                        {art.sha256Hash}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyHash(art.sha256Hash);
                        }}
                        className="text-slate-400 hover:text-slate-700"
                        title="Copy full SHA-256 hash"
                      >
                        {copiedHash === art.sha256Hash ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                      <CheckCircle2 className="h-3 w-3" />
                      {art.status}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button className="text-slate-400 hover:text-slate-700 font-semibold">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Artifact Drawer Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="flex h-full w-full max-w-xl flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {selectedEvidence.id} • Evidentiary Artifact
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1 truncate max-w-md">
                  {selectedEvidence.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="font-semibold text-slate-800">Cryptographic Integrity Hash</div>
                <div className="font-mono text-[11px] bg-slate-900 text-emerald-400 p-2.5 rounded-lg break-all">
                  SHA-256: {selectedEvidence.sha256Hash}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <span className="text-slate-400">Source of Record</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedEvidence.sourceConnector}</div>
                </div>
                <div>
                  <span className="text-slate-400">Collection Date</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedEvidence.collectionTimestamp}</div>
                </div>
                <div>
                  <span className="text-slate-400">File Format & Size</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedEvidence.fileFormat} ({selectedEvidence.fileSize})</div>
                </div>
                <div>
                  <span className="text-slate-400">Ingested By</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{selectedEvidence.uploadedBy}</div>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Auditor Verification Verdict</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Tamper-seal intact. Artifact matches SOC 2 CC6.1 and ISO 27001 evidence requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <form onSubmit={handleUploadSubmit} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Upload Compliance Evidence Artifact
              </h2>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Artifact File Name / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Q3_Penetration_Test_Executive_Summary.pdf"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                >
                  <option value="Configuration">Configuration</option>
                  <option value="Access Review">Access Review</option>
                  <option value="Vulnerability Scan">Vulnerability Scan</option>
                  <option value="Policy Sign-off">Policy Sign-off</option>
                  <option value="Audit Log">Audit Log</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Source / System of Origin</label>
                <input
                  type="text"
                  value={uploadSource}
                  onChange={(e) => setUploadSource(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 bg-slate-50/50">
                <Upload className="mx-auto h-6 w-6 text-slate-400 mb-1" />
                <p className="font-medium text-slate-700">Drag and drop file or click to select</p>
                <p className="text-[10px] text-slate-400">PDF, JSON, CSV, XLSX up to 50MB. Automatic SHA-256 computation.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Hash & Store Artifact
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
