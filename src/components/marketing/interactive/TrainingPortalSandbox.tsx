import React, { useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
  FileCheck2,
  Lock,
  Sparkles,
  Shield,
  FileText,
  Key,
  RotateCcw,
  Check,
  ArrowRight,
} from "lucide-react";

interface Question {
  id: number;
  prompt: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
}

const hipaaQuizQuestions: Question[] = [
  {
    id: 1,
    prompt: "When transmitting electronic Protected Health Information (ePHI) to an external subprocessor, what is mandatory under HIPAA §164.312?",
    options: [
      { key: "A", text: "TLS 1.3 encryption in transit with AES-256 + an executed Business Associate Agreement (BAA)" },
      { key: "B", text: "Standard unencrypted email as long as a legal confidentiality disclaimer is in the footer" },
      { key: "C", text: "Password-protected zip archive with password transmitted over SMS text" },
    ],
    correctAnswer: "A",
  },
  {
    id: 2,
    prompt: "Under the HIPAA 'Minimum Necessary' Standard, which data should engineers access during production debugging?",
    options: [
      { key: "A", text: "Full unredacted production database snapshots containing SSNs and medical IDs" },
      { key: "B", text: "Pseudonymized / de-identified telemetry logs strictly required for the specific ticket" },
      { key: "C", text: "Direct read/write access to all clinical records upon verbal team agreement" },
    ],
    correctAnswer: "B",
  },
  {
    id: 3,
    prompt: "If an encrypted laptop is stolen with no offline key exposure, why is it not classified as a HIPAA breach?",
    options: [
      { key: "A", text: "HHS HIPAA Breach Safe Harbor applies when data is secured using NIST-approved encryption (AES-256)" },
      { key: "B", text: "Because hardware loss is exclusively considered an IT asset issue, never compliance" },
      { key: "C", text: "It is only excused if the employee files a local police report within 6 hours" },
    ],
    correctAnswer: "A",
  },
];

const campaigns = [
  { id: "hipaa", name: "HIPAA Privacy & PHI Handling", badge: "Mandatory • 2026", status: "Active Quiz" },
  { id: "infosec", name: "Annual Info Sec 2026", badge: "Universal • SOC 2 & ISO", status: "98% Completed" },
  { id: "ai_ethics", name: "ISO 42001 AI Ethics & Safety", badge: "AI Workloads", status: "New Campaign" },
  { id: "owasp", name: "OWASP SSDLC & Code Security", badge: "Engineering", status: "Quarterly" },
];

export const TrainingPortalSandbox: React.FC = () => {
  const [activeCampaign, setActiveCampaign] = useState<string>("hipaa");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    1: "A",
    2: "B",
    3: "A",
  });
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  // Policy Hub Signature state
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [isPolicySigned, setIsPolicySigned] = useState<boolean>(false);
  const [signProgress, setSignProgress] = useState<number>(0);

  const handleSelectOption = (qId: number, optionKey: string) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    hipaaQuizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / hipaaQuizQuestions.length) * 100);
    setScore(calculatedScore);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setScore(null);
  };

  const handleSignPolicy = () => {
    if (isPolicySigned) return;
    setIsSigning(true);
    setSignProgress(20);
    const interval = setInterval(() => {
      setSignProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsSigning(false);
          setIsPolicySigned(true);
          return 100;
        }
        return p + 25;
      });
    }, 150);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121d] text-white p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Workforce Training &amp; Attestations (Workflow K)
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Interactive Exam Simulation
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Automated Workforce Readiness &amp; Cryptographic Evidence
            </h4>
          </div>
        </div>

        {/* Campaign Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {campaigns.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCampaign(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCampaign === c.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {c.name.split(" ")[0]} {c.name.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Quiz Interactive on Left, Policy Hub Attestation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Mini-Demo Quiz (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Active Assessment: HIPAA Privacy &amp; PHI Handling
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                3 Questions
              </span>
            </div>
            {quizSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Quiz</span>
              </button>
            )}
          </div>

          {/* Questions Container */}
          <div className="space-y-3">
            {hipaaQuizQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5"
              >
                <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                  <span className="font-mono text-indigo-400 mr-1.5 font-bold">0{idx + 1}.</span>
                  {q.prompt}
                </p>
                <div className="space-y-1.5">
                  {q.options.map((opt) => {
                    const isSelected = selectedAnswers[q.id] === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 cursor-pointer border ${
                          isSelected
                            ? "bg-indigo-950/70 border-indigo-500/80 text-white"
                            : "bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60"
                        } disabled:cursor-default`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5 border ${
                            isSelected
                              ? "bg-indigo-500 border-indigo-400 text-white"
                              : "border-slate-700 text-slate-400"
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-[11px] leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Action & Success State */}
          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < 3}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Assessment &amp; Generate Evidence Artifact</span>
            </button>
          ) : (
            <div className={`p-4 rounded-xl border animate-in fade-in duration-300 ${
              score === 100
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : "bg-amber-950/40 border-amber-500/40 text-amber-300"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="font-bold text-sm text-white">
                      Score: {score}% — {score === 100 ? "Passed (100% Compliant)" : "Review Required"}
                    </p>
                    <p className="text-[11px] font-mono text-slate-300 mt-0.5">
                      Evidence Artifact Generated: <span className="text-emerald-400 font-bold">EV-TRN-8291</span>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30">
                  SHA-256 SIGNED
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-2 truncate">
                Hash: sha256:d8f3a88291c34ef5990a88b79e432c... Linked to SOC 2 CC2.2 &amp; HIPAA 164.530
              </p>
            </div>
          )}
        </div>

        {/* Right: Policy Hub Attestation Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase font-mono">
                  Policy Hub Attestation
                </span>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                v2.4 (2026)
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
              <p className="font-bold text-slate-200">
                POL-04: Acceptable AI &amp; Cryptographic Key Management
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mandates zero unapproved LLM data ingestion, TLS 1.3 transit encryption, KMS-CMK envelope keys, and immediate reporting of security anomalies.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-slate-500">
                <span>Owner: Chief Information Security Officer</span>
                <span>•</span>
                <span>Review Cycle: Annual</span>
              </div>
            </div>

            {/* Cryptographic Signature Box */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-indigo-400" />
                  Attestation Signature
                </span>
                <span className={isPolicySigned ? "text-emerald-400 font-bold" : "text-slate-500"}>
                  {isPolicySigned ? "VERIFIED (NON-REPUDIABLE)" : "PENDING ACKNOWLEDGMENT"}
                </span>
              </div>

              {isSigning && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-indigo-300">
                    <span>Generating SHA-256 Attestation Token...</span>
                    <span>{signProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-150"
                      style={{ width: `${signProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {isPolicySigned ? (
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Cryptographic Signature Applied
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    Sig Token: SIG-2026-X992-KMS • Timestamp: {new Date().toISOString().slice(0, 19)}Z
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleSignPolicy}
                  disabled={isSigning}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Acknowledge &amp; Sign Policy</span>
                </button>
              )}
            </div>
          </div>

          <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800 flex items-center justify-between">
            <span>Automated Proof Sync to Trust Center</span>
            <span className="text-emerald-400">✓ Real-Time</span>
          </div>
        </div>
      </div>
    </div>
  );
};
