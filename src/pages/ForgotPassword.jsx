import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/axiosClient";

 function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devLink, setDevLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/forgot-password", { email });
      setSubmitted(true);
      // DEV MODE — backend returns the reset URL directly
      if (res.data.devResetUrl) setDevLink(res.data.devResetUrl);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-6">
      {/* Orbs */}
      <div className="absolute -top-25 -left-25 w-100 h-100 rounded-full bg-brand-500/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-75 h-75 rounded-full bg-pink-500/15 blur-[80px] pointer-events-none" />

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
              Personal Expense
            </span>
          </div>

          {!submitted ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-white">
                  Forgot password?
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Enter your email and we'll generate a reset link for you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  />
                </div>

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
                  {loading ? "Generating link…" : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500/30 to-teal-500/20 flex items-center justify-center text-3xl mx-auto">
                ✅
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-white">
                  Link generated!
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  In production, this would be sent to{" "}
                  <span className="text-white font-semibold">{email}</span>.
                </p>
              </div>

              {/* DEV MODE — show the link directly in the UI */}
              {devLink && (
                <div className="text-left bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                      ⚠ Dev Mode
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    This link is only shown here because email is not configured
                    yet. Click it to reset your password:
                  </p>
                  <a
                    href={devLink}
                    className="block text-xs text-brand-400 break-all hover:text-brand-300 underline underline-offset-2 transition-colors"
                  >
                    {devLink}
                  </a>
                </div>
              )}
            </div>
          )}

          <p className="text-center text-slate-500 text-sm mt-6">
            Remember your password?{" "}
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
  );
}



export default ForgotPassword;
