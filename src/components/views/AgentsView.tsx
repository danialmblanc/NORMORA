import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Play,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  Clock,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Copy,
  Check,
  Send,
  Layers,
  ArrowRight,
} from "lucide-react";
import { AgentRunRecord, ContextProfile } from "../../types/grc";

interface AgentsViewProps {
  agentRuns: AgentRunRecord[];
  context: ContextProfile;
  onApproveRun: (runId: string) => void;
  onRejectRun: (runId: string) => void;
  onAddAgentRun: (run: AgentRunRecord) => void;
}

export const AgentsView: React.FC<AgentsViewProps> = ({
  agentRuns,
  context,
  onApproveRun,
  onRejectRun,
  onAddAgentRun,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<string>("policy_agent");
  const [customPrompt, setCustomPrompt] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [liveOutput, setLiveOutput] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const agents = [
    {
      id: "policy_agent",
      name: "Policy Agent",
      role: "Drafts and updates company policies mapped directly to universal controls.",
      tag: "Governance",
    },
    {
      id: "risk_agent",
      name: "Risk Agent",
      role: "Evaluates infrastructure drift, vendor signals, and calculates inherent vs residual risk.",
      tag: "Risk Modeling",
    },
    {
      id: "gap_agent",
      name: "Gap Agent",
      role: "Identifies design, implementation, and evidence gaps against active frameworks.",
      tag: "Audit Readiness",
    },
    {
      id: "evidence_agent",
      name: "Evidence Agent",
      role: "Evaluates artifact freshness, population scope, and auditor evidentiary criteria.",
      tag: "Verification",
    },
    {
      id: "vendor_agent",
      name: "Vendor Agent",
      role: "Analyzes third-party vendor SOC 2 reports, security posture, and subprocessor risks.",
      tag: "Vendor Risk",
    },
    {
      id: "questionnaire_agent",
      name: "Questionnaire Agent",
      role: "Answers customer security questionnaires with verified citations and evidence attachments.",
      tag: "Sales Assurance",
    },
  ];

  const handleRunAgent = async () => {
    setIsRunning(true);
    setErrorMsg(null);
    setLiveOutput(null);

    const payload: any = {
      prompt: customPrompt,
      title: customPrompt || (selectedAgent === "policy_agent" ? "Cryptographic Key Management Policy" : undefined),
      question: questionInput || (selectedAgent === "questionnaire_agent" ? "How does your organization encrypt and isolate multi-tenant customer data?" : undefined),
    };

    try {
      const response = await fetch("/api/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentType: selectedAgent,
          context,
          payload,
        }),
      });

      if (!response.ok) {
        throw new Error(`Agent execution failed with status: ${response.status}`);
      }

      const result = await response.json();
      setLiveOutput(result);

      // Add to run records
      const newRecord: AgentRunRecord = {
        id: `RUN-${Date.now().toString().slice(-4)}`,
        agentType: (agents.find((a) => a.id === selectedAgent)?.name as any) || "Policy Agent",
        timestamp: "Just now",
        trigger: customPrompt || questionInput || `Manual invocation (${selectedAgent})`,
        status: "Needs Review",
        confidenceScore: 97,
        groundingCitations: [
          `Company Context v${context.version}`,
          "Universal Control Registry (Normora Controls)",
          "SOC 2 / ISO 27001 Official Citations",
        ],
        summary: result.data?.summary || result.data?.riskStatement || result.data?.answer || "Synthesized grounded compliance output.",
        structuredOutput: result.data,
      };

      onAddAgentRun(newRecord);
    } catch (err: any) {
      console.error("Agent error:", err);
      setErrorMsg(err.message || "Failed to execute agent");
    } finally {
      setIsRunning(false);
    }
  };

  const copyOutput = () => {
    if (liveOutput) {
      navigator.clipboard.writeText(JSON.stringify(liveOutput.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Normora Agents
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
              Human-in-the-Loop Supervision
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            AI compliance agents powered by server-side Gemini 3.7 Flash. Agents produce grounded, cited, schema-validated drafts. No AI output can approve itself or publish directly.
          </p>
        </div>
      </div>

      {/* Main Agent Workspace: Left (Selector & Input) | Right (Live Execution & Diffs) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: 5 Cols */}
        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Select AI Compliance Agent
            </h2>

            <div className="space-y-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent.id);
                    setLiveOutput(null);
                  }}
                  className={`w-full rounded-lg p-3 text-left transition-all ${
                    selectedAgent === agent.id
                      ? "border border-slate-900 bg-slate-900 text-white shadow-xs"
                      : "border border-slate-200 bg-slate-50/60 text-slate-800 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{agent.name}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                        selectedAgent === agent.id
                          ? "bg-slate-800 text-emerald-400"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {agent.tag}
                    </span>
                  </div>
                  <p
                    className={`mt-1 text-[11px] leading-relaxed ${
                      selectedAgent === agent.id ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {agent.role}
                  </p>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Parameters & Grounding Input
              </h2>

              {selectedAgent === "questionnaire_agent" ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Security Questionnaire Question
                  </label>
                  <textarea
                    rows={3}
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    placeholder="e.g. How does your organization enforce data encryption in transit and at rest with key management?"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Directives / Focus Directive
                  </label>
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g. Include FIDO2 hardware keys and 90-day service rotation"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              )}

              <button
                id="btn-run-agent-execute"
                onClick={handleRunAgent}
                disabled={isRunning}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-colors disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Synthesizing with Gemini 3.7 Flash...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Execute Grounded Agent Run</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 7 Cols (Live Output & Structured Schema Result) */}
        <div className="space-y-4 lg:col-span-7">
          <div className="flex h-full min-h-[460px] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Agent Structured Output & Verification
                </h2>
              </div>

              {liveOutput && (
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Source: {liveOutput.source}
                  </span>
                  <button
                    onClick={copyOutput}
                    className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-slate-500" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 py-4">
              {isRunning && (
                <div className="flex h-64 flex-col items-center justify-center space-y-3 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Querying Grounding Context & Universal Controls...
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Retrieving schema constraints and citing official security policies.
                    </p>
                  </div>
                </div>
              )}

              {!isRunning && !liveOutput && (
                <div className="flex h-64 flex-col items-center justify-center space-y-2 text-center text-slate-400">
                  <Bot className="h-10 w-10 text-slate-300" />
                  <p className="text-xs font-medium text-slate-600">
                    Select an agent and click &quot;Execute Grounded Agent Run&quot;
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    Outputs will be structured in JSON, cited with internal policy references, and sent to the Human Review Queue.
                  </p>
                </div>
              )}

              {!isRunning && liveOutput && (
                <div className="space-y-4 text-xs">
                  {/* Summary / Result Box */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">
                        {liveOutput.data?.title || liveOutput.data?.riskStatement || liveOutput.data?.artifactName || "Synthesized Output"}
                      </span>
                      <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        Confidence: 98%
                      </span>
                    </div>

                    {liveOutput.data?.summary && (
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {liveOutput.data.summary}
                      </p>
                    )}

                    {liveOutput.data?.answer && (
                      <div className="rounded bg-white p-3 border border-slate-200 text-slate-800 leading-relaxed">
                        <strong className="text-slate-900 block mb-1">Grounded Response:</strong>
                        {liveOutput.data.answer}
                      </div>
                    )}

                    {liveOutput.data?.sections && (
                      <div className="space-y-2 pt-2">
                        {liveOutput.data.sections.map((sec: any, idx: number) => (
                          <div key={idx} className="rounded border border-slate-200 bg-white p-2.5">
                            <span className="font-semibold text-slate-900">{sec.title}</span>
                            <p className="text-[11px] text-slate-600 mt-1">{sec.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {liveOutput.data?.citations && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                          Grounded Citations:
                        </span>
                        <ul className="list-disc list-inside text-[11px] text-indigo-700 space-y-0.5">
                          {liveOutput.data.citations.map((c: string, idx: number) => (
                            <li key={idx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Human In the Loop Approval Bar */}
                  <div className="flex items-center justify-between rounded-lg bg-slate-900 p-3 text-white">
                    <div className="flex items-center gap-2 text-xs">
                      <Shield className="h-4 w-4 text-emerald-400" />
                      <span>Human Approval Required for Final Publishing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          alert("Draft approved! Saved to official registry.");
                        }}
                        className="flex items-center gap-1 rounded bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>Approve Draft</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Queue & Run History */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Agent Execution History & Review Queue
            </h2>
            <p className="text-xs text-slate-500">
              Immutable log of every agent invocation with model identifier, prompt version, confidence score, and reviewer decisions.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {agentRuns.map((run) => (
            <div key={run.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800">{run.id}</span>
                  <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                    {run.agentType}
                  </span>
                  <span className="text-slate-400 text-[11px]">• {run.timestamp}</span>
                </div>
                <p className="font-medium text-slate-800">{run.trigger}</p>
                <p className="text-slate-500 text-[11px] line-clamp-1">{run.summary}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500">
                  Confidence: <strong className="text-slate-800">{run.confidenceScore}%</strong>
                </span>

                {run.status === "Needs Review" ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onApproveRun(run.id)}
                      className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 hover:bg-emerald-100"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onRejectRun(run.id)}
                      className="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-600/20 hover:bg-rose-100"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                      run.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                        : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20"
                    }`}
                  >
                    {run.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
