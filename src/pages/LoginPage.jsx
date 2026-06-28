import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

 function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute -top-20 -left-20 w-100 h-100 rounded-full bg-brand-500/20 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-75 h-75 rounded-full bg-pink-500/20 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-full bg-orange-500/10 blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <Logo />
          <span className="text-white font-display font-bold text-2xl tracking-tight">
            Expense Tracker
          </span>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Floating stat cards */}
          <div className="space-y-4 max-w-sm">
            <StatCard
              icon="💸"
              label="This month"
              value="N2,450.00"
              sub="+12% from last month"
              color="from-brand-500/30 to-brand-700/20"
            />
            <StatCard
              icon="📊"
              label="Top category"
              value="Food & Dining"
              sub="N380 across 14 entries"
              color="from-orange-500/30 to-orange-700/20"
            />
            <StatCard
              icon="✅"
              label="Under budget"
              value="You're on track"
              sub="N550 left for the month"
              color="from-emerald-500/30 to-emerald-700/20"
            />
          </div>

          <div>
            <h1 className="text-4xl font-display font-bold text-white leading-tight">
              Every naira has
              <br />
              <span className="text-gradient">a story to tell.</span>
            </h1>
            <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-sm">
              Track spending, understand your habits, and take control of your
              financial future — all in one beautiful dashboard.
            </p>
          </div>
        </div>

        <p className="relative z-10 text-slate-600 text-xs">
          © {new Date().getFullYear()} Expense · Your data, your control.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md fade-up">
          <div className="glass rounded-3xl p-8 space-y-6">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-2">
              <Logo />
              <span className="text-white font-display font-bold text-xl">
                Expense Tracker
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                Welcome back
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Sign in to continue to your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                label="Email address"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
              />
              <Field
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                autoComplete="current-password"
              />

              <div className="flex justify-end -mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs text-slate-500 hover:text-brand-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all duration-200 glow-indigo disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-brand-400 font-semibold hover:text-brand-300 transition-colors"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, id, ...props }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        {...props}
        required
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
      />
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className={`glass rounded-2xl p-4 bg-linear-to-br ${color}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-xs text-slate-400 font-medium">{label}</p>
          <p className="text-white font-semibold mt-0.5">{value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
        </div>
      </div>
    </div>
  );
}


export default LoginPage;

function Logo() {
  return (
    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-400 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
      <span className="text-white font-display font-black text-base">N</span>
    </div>
  );
}
