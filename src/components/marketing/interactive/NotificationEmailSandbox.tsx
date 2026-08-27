import React, { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Pause,
  Play,
  Layers,
  Sparkles,
  ArrowRight,
  Lock,
  RefreshCw,
  Send,
} from "lucide-react";

interface DomainEvent {
  id: string;
  type: "control" | "evidence" | "vendor" | "audit" | "policy";
  tag: string;
  title: string;
  timestamp: string;
  severity: "high" | "med" | "low" | "info";
  details: string;
}

const initialEvents: DomainEvent[] = [
  {
    id: "EVT-9041",
    type: "control",
    tag: "[Control Alert]",
    title: "TEST-102: GCP Cloud SQL IAM Non-MFA Access Detected",
    timestamp: "Just now",
    severity: "high",
    details: "Hourly telemetry scanner identified 1 database account without enforced OIDC MFA in us-central1.",
  },
  {
    id: "EVT-9040",
    type: "evidence",
    tag: "[Evidence Mapped]",
    title: "AWS S3 Bucket Encryption Artifact EV-AWS-1049 Linked to CC6.6",
    timestamp: "12s ago",
    severity: "info",
    details: "Read-only connector refreshed SHA-256 evidence bundle for 18 S3 buckets across us-east-1.",
  },
  {
    id: "EVT-9039",
    type: "vendor",
    tag: "[Vendor Review]",
    title: "Datadog SOC 2 Type II Report Expiring in 14 Days",
    timestamp: "45s ago",
    severity: "med",
    details: "Automated vendor pipeline requested refreshed SOC 2 Type II report and subprocessor DPA.",
  },
  {
    id: "EVT-9038",
    type: "audit",
    tag: "[Audit Request]",
    title: "Auditor BDO requested Evidence for Key Management §164.312",
    timestamp: "2m ago",
    severity: "info",
    details: "Auditor workspace inquiry routed to Security Officer with 48-hour SLA.",
  },
];

const poolEvents: DomainEvent[] = [
  {
    id: "EVT-9042",
    type: "policy",
    tag: "[Policy Attestation]",
    title: "Workforce Training Rate reached 100% for HIPAA Privacy 2026",
    timestamp: "Just now",
    severity: "info",
    details: "Cryptographic evidence artifact EV-TRN-8291 automatically generated and hashed.",
  },
  {
    id: "EVT-9043",
    type: "control",
    tag: "[Control Alert]",
    title: "GitHub Branch Protection Rule Verification Passed on main branch",
    timestamp: "Just now",
    severity: "info",
    details: "Strict commit signing & 2-approver branch protection verified deterministically.",
  },
  {
    id: "EVT-9044",
    type: "vendor",
    tag: "[Vendor Review]",
    title: "OpenAI Enterprise Subprocessor BAA Signed & Verified",
    timestamp: "Just now",
    severity: "info",
    details: "Zero data retention agreement validated and mapped to ISO 42001 AI governance criteria.",
  },
];

export const NotificationEmailSandbox: React.FC<{ onNavigateToModule?: (mod: string) => void }> = ({
  onNavigateToModule,
}) => {
  const [events, setEvents] = useState<DomainEvent[]>(initialEvents);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<DomainEvent>(initialEvents[0]);
  const [showDeepLinkModal, setShowDeepLinkModal] = useState<boolean>(false);

  // Live event ticker simulation
  useEffect(() => {
    if (!isLiveActive) return;
    const interval = setInterval(() => {
      setEvents((prev) => {
        const nextItem = poolEvents[Math.floor(Math.random() * poolEvents.length)];
        const newEvent: DomainEvent = {
          ...nextItem,
          id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: "Just now",
        };
        return [newEvent, ...prev.slice(0, 5)];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const getTagColor = (type: DomainEvent["type"]) => {
    switch (type) {
      case "control":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "evidence":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "vendor":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "audit":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "policy":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121d] text-white p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Notification &amp; Delivery Engine (Workflow N)
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Live Dual-Pane Sandbox
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Real-Time GRC Domain Events &amp; Enterprise-Grade Email Delivery
            </h4>
          </div>
        </div>

        {/* Live Feed Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {isLiveActive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Feed</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Live Stream</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Split Screen View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Domain Event Center (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-400">
              Live Domain Event Stream
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Event-Driven Architecture
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {events.map((evt) => {
              const isSelected = selectedEvent.id === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-cyan-500/80 shadow-md"
                      : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getTagColor(
                        evt.type
                      )}`}
                    >
                      {evt.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {evt.timestamp}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {evt.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {evt.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Email Delivery Sandbox (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-md">
          {/* Email Preview Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Email Delivery Sandbox (Preview Pane)
              </span>
            </div>
            {/* DKIM / SPF Badges */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                DKIM: PASSED
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                SPF: PASSED
              </span>
            </div>
          </div>

          {/* Email Metadata Envelope */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 text-[11px] font-mono space-y-1 text-slate-400">
            <div className="flex">
              <span className="w-16 text-slate-500">From:</span>
              <span className="text-slate-200">Normora Continuous Assurance &lt;notifications@assurance.normora.ai&gt;</span>
            </div>
            <div className="flex">
              <span className="w-16 text-slate-500">To:</span>
              <span className="text-slate-200">Security Team &lt;security-ops@northstarhealth.ai&gt;</span>
            </div>
            <div className="flex">
              <span className="w-16 text-slate-500">Subject:</span>
              <span className="font-bold text-white">{selectedEvent.title}</span>
            </div>
            <div className="flex">
              <span className="w-16 text-slate-500">Security:</span>
              <span className="text-emerald-400 font-semibold">TLS 1.3 Strict • Zero PII Leakage Policy Applied</span>
            </div>
          </div>

          {/* Email Body Content */}
          <div className="p-5 space-y-4 text-xs">
            <div className="space-y-2">
              <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300">
                Automated Continuous Monitoring Notification
              </div>
              <h5 className="text-sm font-bold text-white">
                Assurance Telemetry Trigger: {selectedEvent.id}
              </h5>
              <p className="text-slate-300 leading-relaxed">
                Normora's automated evidence collector detected an operational event in your tenant environment. A corresponding draft item has been logged to your audit trail with cryptographic timestamps.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Event Scope:</span>
                <span className="text-white">Tenant: Northstar Health AI</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Impacted Control:</span>
                <span className="text-cyan-400">CC6.1 / HIPAA 164.312 (Access Safeguards)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remediation SLA:</span>
                <span className="text-amber-400 font-bold">Within 48 Hours</span>
              </div>
            </div>

            {/* Clickable Deep Link Action */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setShowDeepLinkModal(true)}
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>Deep Link to Assurance Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-mono text-slate-500">
                Tokens expire in 15 minutes • Single-Use
              </span>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-slate-950/60 px-4 py-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
            <span>DMARC: p=reject • DKIM: 2048-bit RSA</span>
            <span className="text-emerald-400">Auditable Dispatch</span>
          </div>
        </div>
      </div>

      {/* Deep Link Simulation Modal */}
      {showDeepLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-700 text-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Direct Deep-Link Resolved</h4>
                <p className="text-xs text-slate-400 font-mono">Target: /operations/automated-tests?id={selectedEvent.id}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In the live Normora platform, this direct token safely routes the authenticated security engineer straight to the specific automated test, policy, or auditor inquiry in one click.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeepLinkModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
