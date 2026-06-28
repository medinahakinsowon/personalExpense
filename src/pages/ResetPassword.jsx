import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../utils/axiosClient";

 function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      await apiClient.post(`/auth/reset-password/${token}`, {
        password: form.password,
      });
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Reset failed. The link may have expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-6">
      {/* Orbs */}
      <div className="absolute -top-20 -right-20 w-87.5 h-87.5 rounded-full bg-brand-500/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-75 h-75 rounded-full bg-pink-500/15 blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-md fade-up">
        <div className="glass rounded-3xl p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-400 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
              <span className="text-white font-display font-black text-base">
                ₤
              </span>
            </div>
            <span className="text-white font-display font-bold text-xl">
              Ledger
            </span>
          </div>

          {!success ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-white">
                  Set new password
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Choose a strong password you haven't used before.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">
                    New password
                  </label>
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={set("password")}
                    placeholder="Minimum 8 characters"
                    autoFocus
                    autoComplete="new-password"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    required
                    value={form.confirm}
                    onChange={set("confirm")}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>

                {/* Password strength hints */}
                <ul className="space-y-1">
                  {[
                    {
                      label: "At least 8 characters",
                      ok: form.password.length >= 8,
                    },
                    {
                      label: "Passwords match",
                      ok: form.password && form.password === form.confirm,
                    },
                  ].map((hint) => (
                    <li
                      key={hint.label}
                      className={`flex items-center gap-2 text-xs transition-colors ${hint.ok ? "text-emerald-400" : "text-slate-500"}`}
                    >
                      <span>{hint.ok ? "✓" : "○"}</span>
                      {hint.label}
                    </li>
                  ))}
                </ul>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all glow-indigo disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting password…" : "Reset password"}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500/30 to-teal-500/20 flex items-center justify-center text-3xl mx-auto">
                🎉
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-white">
                  Password reset!
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Your password has been updated. Redirecting you to sign in…
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-brand-400"
                      style={{
                        animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-slate-500 text-sm mt-6">
            <Link
              to="/login"
              className="text-brand-400 font-semibold hover:text-brand-300 transition-colors"
            >
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



export default ResetPassword;
