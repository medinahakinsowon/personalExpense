import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: "🔒",
    title: "Secure Authentication",
    desc: "JWT-based auth with hashed passwords, rate limiting, and password reset built in.",
  },
  {
    icon: "🏷️",
    title: "Smart Categorization",
    desc: "11 built-in categories from Food & Dining to Savings — color-coded for instant recognition.",
  },
  {
    icon: "📊",
    title: "Live Visualizations",
    desc: "Spending trend lines and category breakdowns that update instantly as you filter.",
  },
  {
    icon: "🔍",
    title: "Powerful Filters",
    desc: "Search, filter by category, or narrow into any date range in seconds.",
  },
  {
    icon: "⬇",
    title: "CSV Export",
    desc: "Download your filtered expense data anytime for your records or accountant.",
  },
  {
    icon: "📱",
    title: "Fully Responsive",
    desc: "A clean experience whether you're on your laptop or checking spend on your phone.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create your account",
    desc: "Sign up free in under a minute — no credit card required.",
  },
  {
    n: "02",
    title: "Log your expenses",
    desc: "Add what you spend, tag it with a category, and move on with your day.",
  },
  {
    n: "03",
    title: "See where it goes",
    desc: "Watch trends and category breakdowns update live on your dashboard.",
  },
];

 function OpenPage() {
  return (
    <div className="min-h-screen animated-gradient text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-display font-bold text-xl">Personal Expense</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all glow-indigo"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="absolute top-0 left-1/4 w-125 h-125 rounded-full bg-brand-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-100 h-100 rounded-full bg-pink-500/15 blur-[120px] pointer-events-none" />

        <div className="relative fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-slate-300 mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }}
            />
            Free to use · No credit card
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto">
            Every Naira has
            <br />
            <span className="text-gradient">a story to tell.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Track spending, categorize purchases, and visualize where your money
            really goes — all in one beautifully simple dashboard.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-xl font-bold text-white bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all glow-indigo shadow-xl"
            >
              Start tracking free →
            </Link>
            <Link
              to="/login"
              className="px-7 py-3.5 rounded-xl font-bold text-slate-200 border border-white/10 hover:bg-white/5 transition-all"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Floating preview cards */}
        <div
          className="relative mt-20 max-w-3xl mx-auto fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <PreviewCard
                icon="💸"
                label="Total Spent"
                value="₦487,250"
                sub="62 expenses"
                gradient="from-brand-500/20 to-indigo-600/10"
              />
              <PreviewCard
                icon="📈"
                label="Average"
                value="₦7,858"
                sub="per entry"
                gradient="from-pink-500/20 to-rose-600/10"
              />
              <PreviewCard
                icon="🍔"
                label="Top Category"
                value="Food & Dining"
                sub="₦125,400"
                gradient="from-orange-500/20 to-amber-500/10"
              />
            </div>
            <div className="h-32 rounded-2xl bg-white/3 border border-white/5 flex items-end gap-2 p-4">
              {[40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-linear-to-t from-brand-500 to-pink-400 opacity-80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">
            Features
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            Everything you need, nothing you don't
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-white mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">
            How it works
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            Three steps to clarity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="text-5xl font-display font-black text-gradient mb-3">
                {s.n}
              </div>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="glass rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">
              Ready to take control?
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Join now and get a clear picture of your spending in minutes —
              completely free.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 rounded-xl font-bold text-white bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all glow-indigo shadow-xl"
            >
              Create your free account →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-display font-bold text-sm">Ledger</span>
        </div>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Ledger. Your data, your control.
        </p>
      </footer>
    </div>
  );
}

function PreviewCard({ icon, label, value, sub, gradient }) {
  return (
    <div
      className={`rounded-xl p-4 bg-linear-to-br ${gradient} border border-white/5 text-left`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{icon}</span>
      </div>
      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-base font-bold text-white font-mono mt-0.5">{value}</p>
      <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
    </div>
  );
}



export default OpenPage;

function Logo() {
  return (
    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-400 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
      <span className="text-white font-display font-black text-base">N</span>
    </div>
  );
}
