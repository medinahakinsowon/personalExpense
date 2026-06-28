import { useEffect, useState } from "react";
import { getCategoryMeta } from "../utils/helpers";

const PAYMENT_METHODS = [
  "Card",
  "Cash",
  "Bank Transfer",
  "Mobile Money",
  "Other",
];

const empty = (categories) => ({
  title: "",
  amount: "",
  category: categories[0] || "Other",
  date: new Date().toISOString().slice(0, 10),
  paymentMethod: "Card",
  notes: "",
});
 function ExpenseForm({
  open,
  onClose,
  onSubmit,
  categories,
  initialData,
}) {
  const [form, setForm] = useState(empty(categories));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!open) return;
    setError("");
    setForm(
      initialData
        ? {
            title: initialData.title,
            amount: String(initialData.amount),
            category: initialData.category,
            date: initialData.date?.slice(0, 10),
            paymentMethod: initialData.paymentMethod,
            notes: initialData.notes || "",
          }
        : empty(categories),
    );
  }, [open, initialData, categories]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const amt = parseFloat(form.amount);
    if (!form.title.trim()) return setError("Title is required.");
    if (!amt || amt <= 0) return setError("Amount must be a positive number.");
    if (!form.date) return setError("Please pick a date.");
    setLoading(true);
    try {
      await onSubmit({ ...form, amount: amt });
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't save. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(9,12,24,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass rounded-3xl w-full max-w-lg fade-up shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h2 className="text-lg font-display font-bold text-white">
              {initialData ? "Edit Expense" : "New Expense"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {initialData
                ? "Update the details below"
                : "Log a new entry in your ledger"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-lg"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <FormField label="Title">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Groceries at the market"
              className={inputCls}
              autoFocus
            />
          </FormField>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Amount">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                  N
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={form.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  placeholder="0.00"
                  className={`${inputCls} pl-7 font-mono`}
                />
              </div>
            </FormField>
            <FormField label="Date">
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className={inputCls}
              />
            </FormField>
          </div>

          {/* Category */}
          <FormField label="Category">
            <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
              {categories.map((c) => {
                const meta = getCategoryMeta(c);
                const active = form.category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("category", c)}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      active
                        ? "border-transparent text-white"
                        : "border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300 bg-white/2"
                    }`}
                    style={
                      active
                        ? {
                            background: meta.color,
                            boxShadow: `0 4px 12px ${meta.color}55`,
                          }
                        : {}
                    }
                  >
                    <span>{meta.emoji}</span>
                    <span className="truncate">
                      {c
                        .replace(" & ", " & ")
                        .replace("Savings & Investments", "Savings")}
                    </span>
                  </button>
                );
              })}
            </div>
          </FormField>

          {/* Payment method */}
          <FormField label="Payment Method">
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => set("paymentMethod", m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    form.paymentMethod === m
                      ? "bg-brand-500/20 border-brand-500/40 text-brand-300"
                      : "border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300 bg-white/2"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </FormField>

          {/* Notes */}
          <FormField label="Notes (optional)">
            <input
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Any extra details…"
              className={inputCls}
            />
          </FormField>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all glow-indigo disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving…"
                : initialData
                  ? "Save Changes"
                  : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all";

function FormField({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}





export default ExpenseForm;