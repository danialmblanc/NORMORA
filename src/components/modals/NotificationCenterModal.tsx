import React, { useState } from "react";
import {
  Bell,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldAlert,
  Send,
  Sparkles,
  Inbox,
  Filter,
} from "lucide-react";
import { NotificationEvent, ProductModule } from "../../types/grc";

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationEvent[];
  onNavigateToModule: (module: ProductModule) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onNavigateToModule,
}) => {
  const [selectedNotif, setSelectedNotif] = useState<NotificationEvent | null>(notifications[0] || null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [emailSandboxOpen, setEmailSandboxOpen] = useState(true);

  if (!isOpen) return null;

  const filtered = notifications.filter(
    (n) => filterCategory === "all" || n.category.toLowerCase() === filterCategory.toLowerCase()
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-4xl w-full h-[85vh] max-h-[720px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center">
              <Bell className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span>Notification &amp; Email Delivery Center</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold uppercase">
                  Workflow N
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Real-time GRC domain events, automated alerts, email sandboxing &amp; escalation tracking
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

        {/* Body 2 columns */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Event List */}
          <div className="w-1/2 border-r border-slate-100 flex flex-col bg-slate-50/40">
            {/* Filter */}
            <div className="p-3 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 uppercase font-mono text-[10px]">
                Domain Events ({filtered.length})
              </span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded px-2 py-1 focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="evidence">Evidence</option>
                <option value="policy">Policy</option>
                <option value="monitoring">Monitoring</option>
                <option value="audit">Audit</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filtered.map((item) => {
                const isSelected = selectedNotif?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNotif(item)}
                    className={`p-3.5 transition-colors cursor-pointer text-left ${
                      isSelected
                        ? "bg-white border-l-3 border-slate-900 shadow-xs"
                        : "hover:bg-slate-100/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 font-semibold text-slate-700">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{item.timestamp}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.message}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                      <span
                        className={`font-semibold ${
                          item.urgency === "High" || item.urgency === "Critical"
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {item.urgency} Urgency
                      </span>
                      <span className="text-slate-400">{item.deliveryStatus}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Email Preview Sandbox */}
          <div className="w-1/2 flex flex-col bg-white overflow-y-auto p-5 space-y-4">
            {selectedNotif ? (
              <>
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      Email Delivery Sandbox Preview
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      DKIM &amp; SPF Verified
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1 font-mono">
                    <p><span className="text-slate-400">From:</span> notifications@normora.com</p>
                    <p><span className="text-slate-400">To:</span> compliance-team@northstarhealth.ai</p>
                    <p><span className="text-slate-400">Subject:</span> [Normora Assurance] {selectedNotif.title}</p>
                    <p><span className="text-slate-400">Status:</span> {selectedNotif.deliveryStatus}</p>
                  </div>
                </div>

                {/* Email Body */}
                <div className="border border-slate-200 rounded-lg p-5 space-y-3 text-xs text-slate-800 bg-white shadow-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-4 h-4 bg-slate-900 rounded-xs flex items-center justify-center">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                    </div>
                    <span className="font-bold tracking-tight text-slate-900 font-mono text-[11px]">
                      NORMORA AUTOMATED ALERT
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{selectedNotif.title}</h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedNotif.message}
                  </p>

                  <div className="bg-slate-50 p-3 rounded border border-slate-100 text-[11px] font-mono space-y-1">
                    <p><strong>Tenant:</strong> Northstar Health AI (Production)</p>
                    <p><strong>Event ID:</strong> {selectedNotif.id}</p>
                    <p><strong>Trigger Time:</strong> {selectedNotif.timestamp}</p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onNavigateToModule(selectedNotif.deepLinkModule);
                        onClose();
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Open in {selectedNotif.deepLinkModule.toUpperCase()} Module</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-3 rounded border border-slate-200">
                  <p className="font-bold text-slate-700 mb-0.5">Privacy &amp; Security Guarantee:</p>
                  <p>No raw sensitive PII or unencrypted telemetry is ever transmitted via email. All actions require secure cryptographic authentication.</p>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs italic">
                Select an alert to view its rendered delivery payload.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
