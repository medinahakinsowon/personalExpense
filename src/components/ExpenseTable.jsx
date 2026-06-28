import { formatCurrency, formatDate, getCategoryMeta } from "../utils/helpers";

 function ExpenseTable({
  expenses,
  currency,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
  loading,
}) {
  if (loading) return <LoadingSkeleton />;

  if (!expenses.length) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="text-5xl mb-4">🧾</div>
        <h3 className="text-white font-display font-bold text-xl mb-2">
          No expenses found
        </h3>
        <p className="text-slate-400 text-sm">
          Try adjusting your filters or add a new expense.
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-170">
          <thead>
            <tr className="border-b border-white/5">
              {["Date", "Title", "Category", "Payment", "Amount", ""].map(
                (h) => (
                  <th
                    key={h}
                    className={`px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500 ${h === "Amount" ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {expenses.map((exp, i) => {
              const meta = getCategoryMeta(exp.category);
              return (
                <tr
                  key={exp._id}
                  className="group hover:bg-white/3 transition-colors duration-100"
                >
                  {/* Date */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-500 font-mono whitespace-nowrap">
                      {formatDate(exp.date)}
                    </span>
                  </td>

                  {/* Title + Notes */}
                  <td className="px-5 py-4 max-w-55">
                    <p className="text-sm font-semibold text-white truncate">
                      {exp.title}
                    </p>
                    {exp.notes && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {exp.notes}
                      </p>
                    )}
                  </td>

                  {/* Category pill */}
                  <td className="px-5 py-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      <span>{meta.emoji}</span>
                      {exp.category}
                    </span>
                  </td>

                  {/* Payment method */}
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-400 font-medium">
                      {exp.paymentMethod}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-bold text-white font-mono">
                      {formatCurrency(exp.amount, currency)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(exp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 transition-all text-xs font-semibold"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDelete(exp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-xs font-semibold"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/5">
          <p className="text-xs text-slate-500">
            Page{" "}
            <span className="text-slate-300 font-semibold">
              {pagination.page}
            </span>{" "}
            of {pagination.pages} · {pagination.total} total entries
          </p>
          <div className="flex gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            <button
              disabled={pagination.page >= pagination.pages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-white/5 flex gap-8">
        {[80, 180, 120, 80, 80].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-white/5 animate-pulse"
            style={{ width: w }}
          />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-8 px-5 py-4 border-b border-white/5"
        >
          <div className="h-3 w-20 rounded-full bg-white/5 animate-pulse" />
          <div className="h-3 w-44 rounded-full bg-white/5 animate-pulse" />
          <div className="h-5 w-28 rounded-full bg-white/5 animate-pulse" />
          <div className="h-3 w-16 rounded-full bg-white/5 animate-pulse" />
          <div className="h-3 w-20 rounded-full bg-white/5 animate-pulse ml-auto" />
        </div>
      ))}
    </div>
  );
}



export default ExpenseTable;
