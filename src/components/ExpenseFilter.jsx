
//props
function ExpenseFilter({
  filters,
  onChange,
  categories,
  onExport,
  exporting,
}) {
  const set = (k, v) => onChange({ ...filters, [k]: v });

  return (
    <div className="glass rounded-2xl p-4 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="flex-1 min-w-44">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
          Search
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
            🔍
          </span>
          <input
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            placeholder="Search expenses…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div className="min-w-44">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => set("category", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all appearance-none cursor-pointer"
        >
          <option value="All" className="bg-surface-2">
            All categories
          </option>
          {categories.map((c) => (
            <option key={c} value={c} className="bg-surface-2">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Date from */}
      <div className="min-w-36">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
          From
        </label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => set("startDate", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all"
        />
      </div>

      {/* Date to */}
      <div className="min-w-36">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
          To
        </label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => set("endDate", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() =>
            onChange({
              search: "",
              category: "All",
              startDate: "",
              endDate: "",
            })
          }
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
        >
          Clear
        </button>
        <button
          onClick={onExport}
          disabled={exporting}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          {exporting ? "⏳ Preparing…" : "⬇ Export CSV"}
        </button>
      </div>
    </div>
  );
}



export default ExpenseFilter;
