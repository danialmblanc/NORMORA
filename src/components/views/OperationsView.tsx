import React, { useState } from "react";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Play,
  Clock,
  Shield,
  FileCheck2,
  Calendar,
  AlertCircle,
  RefreshCw,
  Plus,
  X,
} from "lucide-react";
import { AutomatedTest } from "../../types/grc";

interface OperationsViewProps {
  tests: AutomatedTest[];
  onTriggerTest: (testId: string) => void;
}

export const OperationsView: React.FC<OperationsViewProps> = ({
  tests,
  onTriggerTest,
}) => {
  const [runningId, setRunningId] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<AutomatedTest | null>(null);
  const [activeTab, setActiveTab] = useState<"continuous_tests" | "exceptions" | "remediation">("continuous_tests");
  const [showExceptionModal, setShowExceptionModal] = useState(false);

  const exceptions = [
    {
      id: "EXC-01",
      control: "AC-01 (Mandatory MFA on Cloud Workloads)",
      reason: "Automated ETL service account svc-legacy-etl uses certificate key authentication instead of interactive TOTP.",
      compensatingControl: "IP-restricted VPC endpoint and 30-day TLS key rotation.",
      approver: "CISO (Chief Information Security Officer)",
      expiresOn: "2026-12-31 (133 days remaining)",
      status: "Active Approved Waiver",
    },
  ];

  const remediations = [
    {
      id: "TASK-401",
      title: "Enable AWS GuardDuty Detective Finding Export in ap-southeast-1 region",
      source: "Gap Agent Finding GAP-203",
      assignee: "Cloud DevOps Team",
      priority: "Medium",
      slaDue: "2026-09-02 (13 days remaining)",
      status: "In Progress (Terraform PR #182)",
    },
    {
      id: "TASK-402",
      title: "Upload Q3 External Vulnerability Scan Report from Qualys",
      source: "Gap Agent Finding GAP-202",
      assignee: "Security Operations",
      priority: "High",
      slaDue: "2026-08-27 (7 days remaining)",
      status: "Awaiting Scan Completion",
    },
  ];

  const handleRun = (id: string) => {
    setRunningId(id);
    onTriggerTest(id);
    setTimeout(() => {
      setRunningId(null);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Operations & Continuous Testing
            </h1>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-600/20">
              100% Deterministic Verification
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Objective configuration checks and continuous test execution. AI does not invent pass/fail states; every result stems from transparent deterministic rules and connector queries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExceptionModal(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <Shield className="h-3.5 w-3.5 text-slate-500" />
            <span>File Exception Waiver</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-xl">
        <button
          onClick={() => setActiveTab("continuous_tests")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
            activeTab === "continuous_tests"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Automated Tests ({tests.length})
        </button>
        <button
          onClick={() => setActiveTab("exceptions")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
            activeTab === "exceptions"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Active Exceptions & Waivers ({exceptions.length})
        </button>
        <button
          onClick={() => setActiveTab("remediation")}
          className={`border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
            activeTab === "remediation"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Remediation Tasks ({remediations.length})
        </button>
      </div>

      {/* Tab 1: Continuous Tests */}
      {activeTab === "continuous_tests" && (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="divide-y divide-slate-200">
            {tests.map((t) => {
              const isRunning = runningId === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTest(t)}
                  className="p-4 hover:bg-slate-50/80 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                        {t.code}
                      </span>
                      <span className="text-[11px] text-slate-400">• Cadence: {t.frequency}</span>
                      <span className="text-[11px] text-slate-400">• Last Executed: {t.lastRun}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {t.title}
                    </h3>
                    <p className="font-mono text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-200 max-w-xl truncate">
                      {t.evaluationRule}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Observed: {t.observedValue}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {t.result}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRun(t.id);
                      }}
                      disabled={isRunning}
                      className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 disabled:opacity-50"
                    >
                      <RefreshCw className={`h-3 w-3 ${isRunning ? "animate-spin text-slate-900" : "text-slate-500"}`} />
                      <span>{isRunning ? "Running..." : "Evaluate"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Exceptions */}
      {activeTab === "exceptions" && (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Approved Control Exceptions & Waivers
            </h2>
            <p className="text-xs text-slate-500">
              Time-bounded waivers authorized by security leadership with mandatory compensating controls and automatic expiry.
            </p>
          </div>

          <div className="space-y-3">
            {exceptions.map((exc) => (
              <div key={exc.id} className="rounded-lg border border-amber-200 bg-amber-50/40 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-900">{exc.id}</span>
                    <span className="font-semibold text-slate-900">{exc.control}</span>
                  </div>
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                    {exc.status}
                  </span>
                </div>

                <p className="text-slate-700"><strong className="text-slate-900">Business Justification:</strong> {exc.reason}</p>
                <p className="text-slate-700"><strong className="text-slate-900">Compensating Safeguard:</strong> {exc.compensatingControl}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-amber-200/60">
                  <span>Authorized By: <strong className="text-slate-800 font-medium">{exc.approver}</strong></span>
                  <span className="text-amber-800 font-semibold">{exc.expiresOn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Remediation Tasks */}
      {activeTab === "remediation" && (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Operational Remediation Queue
            </h2>
            <p className="text-xs text-slate-500">
              Prioritized corrective actions linked to failed continuous tests, gap agent findings, and audit observations.
            </p>
          </div>

          <div className="space-y-3">
            {remediations.map((rem) => (
              <div key={rem.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{rem.id}</span>
                    <span className="font-semibold text-slate-900">{rem.title}</span>
                  </div>
                  <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    Priority: {rem.priority}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>Source: <strong className="text-slate-800">{rem.source}</strong></div>
                  <div>Assignee: <strong className="text-slate-800">{rem.assignee}</strong></div>
                  <div>SLA Deadline: <strong className="text-rose-700">{rem.slaDue}</strong></div>
                  <div>Status: <strong className="text-indigo-700">{rem.status}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Exception Modal */}
      {showExceptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                File Control Exception / Temporary Waiver
              </h2>
              <button
                onClick={() => setShowExceptionModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Universal Control</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none">
                  <option value="AC-01">AC-01 - Mandatory MFA on Cloud Workloads</option>
                  <option value="CRYPT-02">CRYPT-02 - KMS-CMK Encryption at Rest</option>
                  <option value="OPS-03">OPS-03 - Centralized Audit Log Ingestion</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Business & Technical Justification</label>
                <textarea
                  rows={2}
                  placeholder="Explain why standard control enforcement is technically infeasible..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Compensating Control Measure</label>
                <textarea
                  rows={2}
                  placeholder="Describe alternative safeguards deployed to mitigate residual risk..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Waiver Expiry Date (Max 180 Days)</label>
                <input
                  type="date"
                  defaultValue="2026-12-31"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setShowExceptionModal(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Exception submitted to CISO review queue.");
                  setShowExceptionModal(false);
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Submit for Executive Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
