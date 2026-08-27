import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  FileCheck,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Users,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { TrainingCourse, PolicyItem } from "../../types/grc";

interface TrainingViewProps {
  courses: TrainingCourse[];
  policies: PolicyItem[];
  userRole?: string;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  courses,
  policies,
  userRole = "Compliance Admin",
}) => {
  const [activeTab, setActiveTab] = useState<"courses" | "policies" | "interactive_quiz">("courses");
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(courses[0] || null);
  
  // Interactive quiz simulation state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Policy acknowledgment state
  const [acknowledgedPolicies, setAcknowledgedPolicies] = useState<{ [id: string]: boolean }>({
    "POL-SEC-01": true,
    "POL-AI-04": true,
  });

  const quizQuestions = [
    {
      q: "Under Normora's Access Control Policy, when is Multi-Factor Authentication (MFA) strictly required?",
      options: [
        "Only when accessing physical office facilities after hours.",
        "On all employee, contractor, and administrative logins to IdPs, cloud consoles, and source code repositories.",
        "Only for senior executive and VP-level accounts.",
        "Optional if using a complex alphanumeric password with 16+ characters.",
      ],
      correct: 1,
      rationale: "Control AC-01 mandates universal FIDO2/TOTP MFA across all production and cloud boundaries.",
    },
    {
      q: "When processing Protected Health Information (PHI) under HIPAA, which safeguard is mandatory?",
      options: [
        "Exporting PHI to unencrypted local developer workstations for speed of debugging.",
        "Disabling audit trails to minimize cloud storage cost.",
        "Executing Business Associate Agreements (BAAs) and enforcing AES-256 encryption at rest and in transit.",
        "Sharing shared database credentials via team messaging channels.",
      ],
      correct: 2,
      rationale: "HIPAA Security Rule 45 CFR § 164.312 mandates cryptographic safeguards and vendor BAAs.",
    },
    {
      q: "Under ISO 42001 AI Governance, what is the required protocol before deploying a new generative AI pipeline to production?",
      options: [
        "Deploy immediately and wait for user feedback.",
        "Complete Model Risk Assessment, prompt injection guardrail verification, and human-in-the-loop review sign-off.",
        "Run an unverified web scraper for training data without license auditing.",
        "Bypass vulnerability checks if latency is under 100ms.",
      ],
      correct: 1,
      rationale: "ISO/IEC 42001 Clause 6 & 8 enforces AI risk assessments and continuous output verification.",
    },
  ];

  const handleAnswerSelect = (optionIdx: number) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentQuestion] = optionIdx;
    setSelectedAnswers(nextAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      selectedAnswers.forEach((ans, idx) => {
        if (ans === quizQuestions[idx].correct) correctCount++;
      });
      const scorePct = Math.round((correctCount / quizQuestions.length) * 100);
      setQuizScore(scorePct);
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setQuizScore(null);
  };

  const toggleAcknowledge = (policyId: string) => {
    setAcknowledgedPolicies((prev) => ({
      ...prev,
      [policyId]: !prev[policyId],
    }));
  };

  const totalAssigned = courses.reduce((acc, c) => acc + c.assignedCount, 0);
  const totalCompleted = courses.reduce((acc, c) => acc + c.completedCount, 0);
  const overallCompletionRate = Math.round((totalCompleted / totalAssigned) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
              Workflow K • Continuous Assurance
            </span>
            <span className="text-xs text-slate-500 font-mono">SOC 2 CC2.2 &amp; ISO 27001 A.7.2</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Workforce Compliance &amp; Policy Training Portal
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Automated workforce compliance training campaigns, deterministic quiz scoring, and immutable policy acknowledgment logs with audit-ready cryptographic evidence.
          </p>
        </div>

        {/* Global Progress Metrics */}
        <div className="flex items-center gap-6 bg-slate-50 border border-slate-200/80 rounded-md px-5 py-3 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Overall Completion</span>
            <span className="text-2xl font-black text-slate-900 font-mono">{overallCompletionRate}%</span>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Active Campaigns</span>
            <span className="text-2xl font-black text-emerald-600 font-mono">{courses.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("courses")}
          className={`pb-3 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === "courses"
              ? "border-b-2 border-slate-900 text-slate-900"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Assigned Training Campaigns ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("policies")}
          className={`pb-3 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === "policies"
              ? "border-b-2 border-slate-900 text-slate-900"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Policy Hub &amp; Attestations ({policies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("interactive_quiz")}
          className={`pb-3 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === "interactive_quiz"
              ? "border-b-2 border-slate-900 text-slate-900"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Simulate Interactive Employee Quiz</span>
        </button>
      </div>

      {/* Tab 1: Courses */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {courses.map((course) => {
              const compRate = Math.round((course.completedCount / course.assignedCount) * 100);
              const isSelected = selectedCourse?.id === course.id;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`bg-white rounded-lg border transition-all p-5 cursor-pointer ${
                    isSelected
                      ? "border-slate-900 shadow-sm ring-1 ring-slate-900"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                          {course.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{course.version}</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {course.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{course.title}</h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-900">{compRate}%</span>
                      <span className="text-[10px] text-slate-500 block">
                        {course.completedCount}/{course.assignedCount} completed
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 my-3 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${compRate}%` }}
                    ></div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 pt-1 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {course.durationMinutes} mins
                      </span>
                      <span>•</span>
                      <span>Pass Threshold: {course.passScorePct}%</span>
                    </div>
                    <span className="text-slate-500">{course.duePeriod}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Course Details Sidebar */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 h-fit">
            {selectedCourse ? (
              <>
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Campaign Details</span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{selectedCourse.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">ID: {selectedCourse.id}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium block">Audience Targeting:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {selectedCourse.mandatoryFor.map((aud, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-700 font-mono">
                          {aud}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedCourse.durationMinutes} Minutes</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Passing Score Required:</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedCourse.passScorePct}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Evidence Generated:</span>
                    <span className="font-mono font-semibold text-emerald-600">EV-TRN-{selectedCourse.id.replace("TRN-", "")}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab("interactive_quiz");
                    setQuizStarted(true);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Launch Employee Test Simulation</span>
                </button>
              </>
            ) : (
              <p className="text-xs text-slate-500 italic">Select a course to view campaign parameters.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Policy Hub */}
      {activeTab === "policies" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Mandatory Governance Policies &amp; Annual Sign-Offs
              </h3>
              <p className="text-[11px] text-slate-500">
                All personnel must review and cryptographically acknowledge policy revisions.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Audit Scoped: 100% Policy Version Traceability
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {policies.map((policy) => {
              const isAcked = acknowledgedPolicies[policy.id] || false;

              return (
                <div key={policy.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-slate-900">{policy.code}</span>
                      <span className="text-xs font-semibold text-slate-800">{policy.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {policy.version}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xl">{policy.summary}</p>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
                      <span>Owner: {policy.owner}</span>
                      <span>•</span>
                      <span>Org Acknowledgment: {policy.acknowledgementRate}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => toggleAcknowledge(policy.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isAcked
                          ? "bg-emerald-50 border border-emerald-300 text-emerald-700"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isAcked ? "text-emerald-600" : "text-slate-400"}`} />
                      <span>{isAcked ? "Acknowledged (Signed)" : "Sign Acknowledgment"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Quiz Simulation */}
      {activeTab === "interactive_quiz" && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 max-w-3xl mx-auto space-y-6">
          {!quizStarted && !quizCompleted && (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Annual Information Security &amp; Compliance Exam (2026)
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                This interactive test verifies understanding of SOC 2, HIPAA, ISO 27001, and ISO 42001 standards. Minimum passing score is 80%.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setQuizStarted(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span>Start 3-Question Assessment</span>
                </button>
              </div>
            </div>
          )}

          {quizStarted && !quizCompleted && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-xs font-mono text-emerald-600 font-semibold">
                  Passing Threshold: 80%
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {quizQuestions[currentQuestion].q}
              </h4>

              <div className="space-y-2.5">
                {quizQuestions[currentQuestion].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQuestion] === oIdx;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerSelect(oIdx)}
                      className={`w-full text-left p-3.5 rounded-md text-xs transition-all border flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "border-slate-900 bg-slate-50 font-medium text-slate-900 ring-1 ring-slate-900"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                          isSelected ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  onClick={handleNextQuestion}
                  className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs px-5 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentQuestion === quizQuestions.length - 1 ? "Submit & Grade" : "Next Question"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {quizCompleted && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Training Assessment Result</h3>
              <div className="text-3xl font-black font-mono text-emerald-600">{quizScore}% Score</div>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                {quizScore && quizScore >= 80
                  ? "Congratulations! You have passed the annual compliance test. An immutable training completion record with cryptographic hash has been logged in the Normora Evidence Vault."
                  : "Score below 80% passing threshold. Please review the guidance and retake the assessment."}
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-mono text-slate-600 max-w-md mx-auto text-left">
                <p className="font-bold text-slate-800 mb-1">Evidence Artifact Generated:</p>
                <p>Hash: 7f8a92b3c4d5e6f1a2b3c4d5e6f7a8b9...</p>
                <p>Verified Timestamp: {new Date().toISOString()}</p>
                <p>Status: Verified &amp; Fresh (Valid 365 Days)</p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
