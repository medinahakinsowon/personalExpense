import { formatCurrency } from "../utils/helpers";
import { getCategoryMeta } from "../utils/helpers";

 function SummaryCards({ totals, topCategory, currency }) {
  const cards = [
    {
      label: "Total Spent",
      value: formatCurrency(totals?.total || 0, currency),
      sub: `${totals?.count || 0} expense${totals?.count !== 1 ? "s" : ""} recorded`,
      gradient: "from-brand-500 to-indigo-600",
      glow: "rgba(99,102,241,0.4)",
      icon: "💸",
      iconBg: "from-brand-400/30 to-indigo-500/20",
    },
    {
      label: "Average Expense",
      value: formatCurrency(totals?.avg || 0, currency),
      sub: "per entry in current filter",
      gradient: "from-pink-500 to-rose-600",
      glow: "rgba(236,72,153,0.4)",
      icon: "📈",
      iconBg: "from-pink-400/30 to-rose-500/20",
    },
    {
      label: "Top Category",
      value: topCategory ? topCategory.category : "No data yet",
      sub: topCategory
        ? `${formatCurrency(topCategory.total, currency)} · ${topCategory.count} entries`
        : "Add some expenses to get started",
      gradient: "from-orange-500 to-amber-500",
      glow: "rgba(249,115,22,0.4)",
      icon: topCategory ? getCategoryMeta(topCategory.category).emoji : "🏷️",
      iconBg: "from-orange-400/30 to-amber-500/20",
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="relative glass rounded-2xl p-5 overflow-hidden group hover:scale-[1.02] transition-transform duration-200"
          style={{ boxShadow: `0 8px 30px ${c.glow}22` }}
        >
          {/* Background gradient blob */}
          <div
            className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-linear-to-br ${c.iconBg} blur-2xl pointer-events-none`}
          />

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{c.icon}</span>
              <div
                className={`h-1 w-12 rounded-full bg-linear-to-r ${c.gradient} opacity-80`}
              />
            </div>

            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {c.label}
            </p>
            <p
              className={`mt-1 font-bold text-white ${c.isText ? "text-xl" : "text-2xl font-mono"} leading-tight`}
            >
              {c.value}
            </p>
            <p className="mt-1.5 text-xs text-slate-500">{c.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}





export default SummaryCards;