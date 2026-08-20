import React, { useState } from "react";
import { Lock, ArrowRight, CheckCircle2, Shield, Eye, EyeOff, Sparkles, Layers } from "lucide-react";
import { CONFIG, resolveDemoUrl } from "../../lib/config";

interface AuthViewProps {
  mode: "login" | "signup";
  onNavigate: (path: string) => void;
  onSuccessAuth: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ mode, onNavigate, onSuccessAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const demoUrl = resolveDemoUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Simulate authenticating/creating workspace
    setTimeout(() => {
      setIsLoading(false);
      onSuccessAuth();
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Mark */}
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19V5L11.5 14.5L19 5V19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="11.5" cy="14.5" r="2" fill="#34D399" />
            </svg>
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-slate-900">
          {mode === "login" ? "Sign in to Normora Assurance OS" : "Start your Normora Assurance Workspace"}
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-500 font-sans">
          {mode === "login"
            ? "Access your organization's continuous control graph and live evidence."
            : "Deploy continuous compliance automation across your infrastructure."}
        </p>

        {/* Demo banner link prompt right on the auth page */}
        <div className="mt-4 p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 flex items-center justify-between text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Evaluating? Explore our <strong>read-only interactive demo</strong> first.</span>
          </div>
          <button
            onClick={() => onNavigate(demoUrl)}
            className="font-semibold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer text-[11px]"
          >
            Open Demo →
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-8 border border-slate-100 shadow-xl rounded-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Health AI, Inc."
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                {mode === "login" && (
                  <span className="text-[11px] text-slate-400 hover:text-slate-700 cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded bg-red-50 text-red-700 text-xs border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating Workspace...</span>
                ) : (
                  <>
                    <span>{mode === "login" ? "Sign in to Portal" : "Create Workspace"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick SSO options */}
          <div className="relative border-t border-slate-100 pt-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-[10px] uppercase font-mono text-slate-400">
                Or continue with enterprise SSO
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onSuccessAuth}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Google Workspace</span>
            </button>
            <button
              type="button"
              onClick={onSuccessAuth}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Microsoft Entra ID</span>
            </button>
          </div>

          {/* Switch mode */}
          <div className="text-center pt-2 text-xs text-slate-500">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => onNavigate("/auth/signup")}
                  className="font-bold text-slate-900 hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => onNavigate("/auth/login")}
                  className="font-bold text-slate-900 hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Security boundary footnote */}
        <p className="mt-4 text-center text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>Tenant-isolated workspace • TLS 1.3 encrypted • Zero customer data AI training</span>
        </p>
      </div>
    </div>
  );
};
