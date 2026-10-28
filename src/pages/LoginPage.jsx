import { useState } from "react";
import { users } from "../data/mockData";
import { HardHat, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email.trim() && u.password === password
    );
    if (user) {
      onLogin(user);
    } else {
      setError("Invalid email or password. Please use the demo accounts below.");
    }
  };

  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="relative hidden w-[42%] flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md">
            SP
          </span>
          <span className="text-lg font-bold tracking-tight">SitePulse Ops</span>
        </div>

        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-200 mb-6">
            <HardHat className="h-3.5 w-3.5" />
            <span>Site & Construction Operations</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight">
            Centralized field operations, daily progress, and material control.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            One platform for project progress, materials tracking, labour attendance,
            evidence capture, and site accountability.
          </p>
          <div className="mt-8 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Multi-project management for administrators & site engineers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Daily attendance, labour notes, and manpower verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Material income/outgoing ledger with receipt traceability</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          © 2026 SitePulse · Construction Management System
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile branding */}
          <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
              SP
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              SitePulse Ops
            </span>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            {/* Tab-style header */}
            <div className="mb-8 border-b border-slate-200">
              <span className="inline-block border-b-2 border-blue-600 pb-2 text-sm font-semibold text-slate-900">
                Sign In
              </span>
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">E-mail address</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-transparent bg-slate-100 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  placeholder="name@site.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border border-transparent bg-slate-100 px-4 py-2.5 pr-11 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 pt-1">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                Remember me on this browser
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
                >
                  Sign in to console
                </button>
              </div>
            </form>

            {/* Quick Demo Credentials */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Demo Profiles
                </span>
                <span className="text-[11px] text-slate-400">Click to autofill</span>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => fillCredentials("admin@site.com", "admin123")}
                  className="w-full flex items-center justify-between rounded-lg border border-slate-200 p-2 text-left text-xs transition-colors hover:bg-slate-50 hover:border-slate-300"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    <div>
                      <span className="font-semibold text-slate-800">Admin User</span>
                      <span className="block text-slate-400 text-[10px]">admin@site.com</span>
                    </div>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">admin123</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials("ravi@site.com", "eng123")}
                  className="w-full flex items-center justify-between rounded-lg border border-slate-200 p-2 text-left text-xs transition-colors hover:bg-slate-50 hover:border-slate-300"
                >
                  <div className="flex items-center gap-2">
                    <HardHat className="h-4 w-4 text-emerald-600" />
                    <div>
                      <span className="font-semibold text-slate-800">Ravi Kumar (Engineer)</span>
                      <span className="block text-slate-400 text-[10px]">Projects 1 & 2</span>
                    </div>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">eng123</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials("suresh@site.com", "eng123")}
                  className="w-full flex items-center justify-between rounded-lg border border-slate-200 p-2 text-left text-xs transition-colors hover:bg-slate-50 hover:border-slate-300"
                >
                  <div className="flex items-center gap-2">
                    <HardHat className="h-4 w-4 text-purple-600" />
                    <div>
                      <span className="font-semibold text-slate-800">Suresh Patel (Engineer)</span>
                      <span className="block text-slate-400 text-[10px]">Project 2 only</span>
                    </div>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">eng123</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
