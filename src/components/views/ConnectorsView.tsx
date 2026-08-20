import React, { useState } from "react";
import {
  Link2,
  CheckCircle2,
  RefreshCw,
  ShieldAlert,
  Shield,
  Key,
  ExternalLink,
  Search,
  Server,
  Cloud,
  GitBranch,
  Users,
  CheckSquare,
  Layers,
  MessageSquare,
  Clock,
  Eye,
  X,
} from "lucide-react";
import { Connector } from "../../types/grc";

interface ConnectorsViewProps {
  connectors: Connector[];
  onSyncConnector: (id: string) => void;
}

export const ConnectorsView: React.FC<ConnectorsViewProps> = ({
  connectors,
  onSyncConnector,
}) => {
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [filterType, setFilterType] = useState<string>("All");

  const handleSync = (id: string) => {
    setSyncingId(id);
    onSyncConnector(id);
    setTimeout(() => {
      setSyncingId(null);
    }, 1800);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Cloud Infrastructure":
        return Cloud;
      case "Source Control":
        return GitBranch;
      case "Identity & Workspace":
        return Users;
      case "Ticketing & Ops":
        return CheckSquare;
      case "Collaboration":
        return MessageSquare;
      default:
        return Server;
    }
  };

  const filtered = connectors.filter((c) => {
    if (filterType === "All") return true;
    return c.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Connect
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
              Read-Only Least Privilege
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Automated API connectors and data sources. Secrets are protected using KMS envelope encryption. Connectors collect metadata and run deterministic evidence tests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSync("all")}
            disabled={syncingId !== null}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${syncingId ? "animate-spin" : ""}`} />
            <span>Sync All Connectors</span>
          </button>
        </div>
      </div>

      {/* KMS Security Badge */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-emerald-400">
          <Key className="h-4 w-4" />
        </div>
        <div>
          <span className="font-semibold text-slate-900">
            KMS Envelope Encryption Active
          </span>
          <p className="text-slate-500 text-[11px]">
            No long-lived static tokens stored. AWS uses OIDC IAM Role Assumption; GCP uses Workload Identity Federation with data-plane denies.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["All", "Cloud Infrastructure", "Source Control", "Identity & Workspace", "Ticketing & Ops", "Collaboration"].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filterType === t
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((conn) => {
          const Icon = getIcon(conn.type);
          const isSyncing = syncingId === conn.id || syncingId === "all";

          return (
            <div
              key={conn.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {conn.name}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        {conn.type}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      conn.status === "Connected"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                        : conn.status === "Beta"
                        ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {conn.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Connection Method:</span>
                    <span className="font-medium text-slate-800">{conn.connectionMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Assets Discovered:</span>
                    <span className="font-semibold text-slate-900">{conn.assetsDiscovered} resources</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Automated Tests:</span>
                    <span className="font-medium text-indigo-600">{conn.automatedTestsCount} tests live</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Last Synced:</span>
                    <span className="text-slate-600">{conn.lastSync}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedConnector(conn)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="h-3.5 w-3.5 text-slate-400" />
                  <span>Inspect Scopes</span>
                </button>
                <button
                  onClick={() => handleSync(conn.id)}
                  disabled={isSyncing}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-200 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-slate-900" : "text-slate-500"}`} />
                  <span>{isSyncing ? "Syncing..." : "Sync"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scopes & Permissions Inspector Modal */}
      {selectedConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {selectedConnector.name} • Scope Manifest
                </h2>
                <span className="text-xs text-slate-500">{selectedConnector.connectionMethod}</span>
              </div>
              <button
                onClick={() => setSelectedConnector(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-800">Granted Least-Privilege Scopes:</span>
                <ul className="list-disc list-inside text-slate-600 space-y-1 pt-1 font-mono text-[11px]">
                  {selectedConnector.scopes.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-emerald-800 ring-1 ring-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-[11px]">
                  Verified: Data-plane access explicitly denied. Connector cannot read customer data payloads or object contents.
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedConnector(null)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
