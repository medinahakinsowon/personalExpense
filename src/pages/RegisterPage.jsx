import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const passwordsMatch = form.password && form.password === form.confirm;
  const passwordLongEnough = form.password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!passwordLongEnough)
      return setError("Password must be at least 8 characters.");
    if (!passwordsMatch) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard", { replace: true });
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

        <Link
          to="/"
          className="relative z-10 flex items-center gap-3 w-fit hover:opacity-80 transition-opacity"
        >
          <Logo />
          <span className="text-white font-display font-bold text-2xl">
            Personal Expense
          </span>
        </Link>

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
          © {new Date().getFullYear()} Ledger · Your data, your control.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md fade-up">
          <div className="glass rounded-3xl p-8 space-y-6">
            <Link
              to="/"
              className="lg:hidden flex items-center gap-3 w-fit hover:opacity-80 transition-opacity"
            >
              <Logo />
              <span className="text-white font-display font-bold text-xl">
                Personal Expense
              </span>
            </Link>

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

              <PasswordField
                label="Password"
                id="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={set("password")}
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
                autoComplete="new-password"
              />

              <PasswordField
                label="Confirm password"
                id="confirm"
                placeholder="Re-enter your password"
                value={form.confirm}
                onChange={set("confirm")}
                show={showConfirm}
                onToggle={() => setShowConfirm((v) => !v)}
                autoComplete="new-password"
              />

              {/* Live password hints */}
              {(form.password || form.confirm) && (
                <ul className="space-y-1 -mt-1">
                  <Hint ok={passwordLongEnough} label="At least 8 characters" />
                  <Hint ok={passwordsMatch} label="Passwords match" />
                </ul>
              )}

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

function PasswordField({
  label,
  id,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
  autoComplete,
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-white/10"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function Hint({ ok, label }) {
  return (
    <li
      className={`flex items-center gap-2 text-xs transition-colors ${ok ? "text-emerald-400" : "text-slate-500"}`}
    >
      <span>{ok ? "✓" : "○"}</span>
      {label}
    </li>
  );
}

function Logo() {
  return (
    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-400 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
      <span className="text-white font-display font-black text-base">₦</span>
    </div>
  );
}
