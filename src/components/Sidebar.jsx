import { useAuth } from "../utils/AuthContext";

const NAV_ITEMS = [{ icon: "⊞", label: "Dashboard", active: true }];

 function Sidebar() {
  const { user, logout } = useAuth();

  const initials = (user?.name || "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col bg-surface-2 border-r border-white/5 overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="relative flex items-center gap-3 px-5 py-6 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-400 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg shrink-0">
          <span className="text-white font-display font-black text-base">
            N
          </span>
        </div>
        <div>
          <p className="text-white font-display font-bold text-md leading-none">
            Personal Expense
          </p>
          <p className="text-slate-500 text-xs mt-0.5">Personal Finance</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
          Menu
        </p>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Quick stats */}
      <div className="relative px-4 py-3 mx-3 mb-3 rounded-2xl bg-linear-to-br from-brand-500/20 to-pink-500/10 border border-white/5">
        <p className="text-xs text-slate-400 font-medium">Quick tip</p>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Use filters to drill into specific spending periods.
        </p>
      </div>

      {/* User */}
      <div className="relative px-3 py-3 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 text-lg"
          >
            ⇥
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
        active
          ? "bg-linear-to-r from-brand-500/25 to-pink-500/10 border border-brand-500/20 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
      )}
    </div>
  );
}





export default Sidebar;
