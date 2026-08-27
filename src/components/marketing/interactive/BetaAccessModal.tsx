import React, { useState } from "react";
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Building2,
  Mail,
  User,
  Key,
} from "lucide-react";
import { resolveDemoUrl } from "../../../lib/config";

interface BetaAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const BetaAccessModal: React.FC<BetaAccessModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [framework, setFramework] = useState<string>("SOC 2 Type II + HIPAA");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tokenGenerated, setTokenGenerated] = useState<string>("");

  if (!isOpen) return null;

  const demoUrl = resolveDemoUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTokenGenerated(`NORMORA-BETA-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 700);
  };

  const handleLaunchDemo = () => {
    onClose();
    onNavigate(demoUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full rounded-2xl bg-[#0d121d] border border-slate-700 text-white p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Normora Enterprise Beta Access</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Request Full Beta Access
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Join forward-thinking security leaders and compliance architects testing AI-native continuous assurance with isolated tenant workspaces.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-600 focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[11px] mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-600 focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-mono text-[11px] mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Health"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-600 focus:outline-hidden focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[11px] mb-1">
                    Primary Framework
                  </label>
                  <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
                  >
                    <option>SOC 2 Type II + HIPAA</option>
                    <option>ISO 27001:2022</option>
                    <option>ISO 42001 (AI Governance)</option>
                    <option>Multi-Tenant MSP / Advisory</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Provisioning Beta Invite..." : "Submit Beta Access Request"}</span>
                </button>
              </div>

              <p className="text-[10px] font-mono text-slate-500 text-center">
                Instant access provided for verified enterprise domains • Zero credit card required
              </p>
            </form>
          </>
        ) : (
          <div className="space-y-5 text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                Beta Access Token Issued!
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Welcome to Normora Beta, <strong className="text-white">{name || "Security Leader"}</strong>. Your dedicated tenant sandbox has been initialized with the <strong className="text-emerald-400">{framework}</strong> baseline.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Issued Access Token:</span>
                <span className="text-emerald-400 font-bold">{tokenGenerated}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tenant Isolation ID:</span>
                <span className="text-white">TENANT-{company.toUpperCase().replace(/\s+/g, "-") || "DEMO"}-01</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>KMS Key Envelope:</span>
                <span className="text-slate-300">AES-256 (Cloud HSM)</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleLaunchDemo}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Launch Interactive Demo Sandbox Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
