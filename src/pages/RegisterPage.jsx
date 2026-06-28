import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

 function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-15 -right-15 w-87.5 h-87.5 rounded-full bg-pink-500/20 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-15 -left-15 w-75 h-75 rounded-full bg-brand-500/20 blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <Logo />
          <span className="text-white font-display font-bold text-2xl">
            Expense Tracker
          </span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {[
              { icon: "🔒", label: "Secure auth" },
              { icon: "📊", label: "Live charts" },
              { icon: "📤", label: "CSV export" },
              { icon: "🏷️", label: "11 categories" },
              { icon: "🔍", label: "Smart filters" },
              { icon: "📱", label: "Responsive" },
            ].map((f) => (
              <div
                key={f.label}
                className="glass rounded-xl px-4 py-3 flex items-center gap-2"
              >
                <span className="text-lg">{f.icon}</span>
                <span className="text-sm text-slate-300 font-medium">
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h1 className="text-4xl font-display font-bold text-white leading-tight">
              Start tracking
              <br />
              <span className="text-gradient">in seconds.</span>
            </h1>
            <p className="mt-4 text-slate-400 text-base max-w-sm leading-relaxed">
              No spreadsheets. No guessing. Just a clean, beautiful view of
              where your money goes every day.
            </p>
          </div>
        </div>

        <p className="relative z-10 text-slate-600 text-xs">
          © {new Date().getFullYear()} Expense · Your data, your control.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md fade-up">
          <div className="glass rounded-3xl p-8 space-y-6">
            <div className="lg:hidden flex items-center gap-3">
              <Logo />
              <span className="text-white font-display font-bold text-xl">
                Expense Tracker
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                Create your account
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Free forever. No credit card required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                label="Full name"
                id="name"
                type="text"
                placeholder="Ada Lovelace"
                value={form.name}
                onChange={set("name")}
                autoComplete="name"
              />
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
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
              />

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all duration-200 glow-indigo disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account…" : "Create account →"}
              </button>
            </form>

            <p className="text-center text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-400 font-semibold hover:text-brand-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default RegisterPage;

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

function Logo() {
  return (
    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-400 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
      <span className="text-white font-display font-black text-base">N</span>
    </div>
  );
}
