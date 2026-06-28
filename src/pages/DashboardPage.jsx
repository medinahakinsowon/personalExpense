import { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import ExpenseFilters from "../components/ExpenseFilter";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseForm from "../components/ExpenseForm";
import SpendingTrendChart from "../components/SpendTrendChart";
import CategoryBreakdownChart from "../components/CategoryBreakdownChart";
import apiClient from "../utils/axiosClient";
import { useAuth } from "../utils/AuthContext";
import { exportExpensesToCSV } from "../utils/helpers";

const emptyFilters = {
  search: "",
  category: "All",
  startDate: "",
  endDate: "",
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

 function DashboardPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);

  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 10,
  });
  const [summary, setSummary] = useState({
    byCategory: [],
    byMonth: [],
    totals: {},
  });

  const [loadingList, setLoadingList] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load categories once
  useEffect(() => {
    apiClient
      .get("/expenses/meta/categories")
      .then((r) => setCategories(r.data.categories))
      .catch(() => {});
  }, []);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const buildParams = useCallback(
    (extra = {}) => {
      const p = { page, limit: 10, ...extra };
      if (filters.category !== "All") p.category = filters.category;
      if (filters.startDate) p.startDate = filters.startDate;
      if (filters.endDate) p.endDate = filters.endDate;
      if (filters.search) p.search = filters.search;
      return p;
    },
    [filters, page],
  );

  const loadExpenses = useCallback(async () => {
    setLoadingList(true);
    try {
      const r = await apiClient.get("/expenses", { params: buildParams() });
      setExpenses(r.data.expenses);
      setPagination(r.data.pagination);
    } catch {
      showToast("Couldn't load expenses.", "error");
    } finally {
      setLoadingList(false);
    }
  }, [buildParams]);

  const loadSummary = useCallback(async () => {
    try {
      const r = await apiClient.get("/expenses/summary", {
        params: buildParams({ page: undefined, limit: undefined }),
      });
      setSummary(r.data);
    } catch {}
  }, [buildParams]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);
  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  const handleSave = async (data) => {
    if (editingExpense) {
      await apiClient.put(`/expenses/${editingExpense._id}`, data);
      showToast("Expense updated ✓");
    } else {
      await apiClient.post("/expenses", data);
      showToast("Expense added ✓");
    }
    setEditingExpense(null);
    loadExpenses();
    loadSummary();
  };

  const handleDelete = async (exp) => {
    if (!window.confirm(`Delete "${exp.title}"?`)) return;
    try {
      await apiClient.delete(`/expenses/${exp._id}`);
      showToast("Expense deleted.");
      loadExpenses();
      loadSummary();
    } catch {
      showToast("Couldn't delete.", "error");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportExpensesToCSV(filters);
      showToast("CSV downloaded ✓");
    } catch {
      showToast("Export failed.", "error");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden">
        {/* Top header bar */}
        <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-pink-400 uppercase tracking-widest">
              {greeting()}, {user?.name?.split(" ")[0]}
            </p>
            <h1 className="text-2xl font-display font-bold text-white mt-0.5">
              Dashboard
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingExpense(null);
              setFormOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-brand-500 to-pink-500 hover:from-brand-400 hover:to-pink-400 transition-all glow-indigo shadow-lg"
          >
            <span className="text-lg leading-none">+</span> Add Expense
          </button>
        </header>

        <div className="px-6 py-6 space-y-6">
          {/* Summary cards */}
          <SummaryCards
            totals={summary.totals}
            topCategory={summary.byCategory?.[0]}
            currency={user?.currency}
          />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="glass rounded-2xl p-5">
              <ChartHeader
                icon="📈"
                title="Spending Over Time"
                sub="Monthly totals"
              />
              <SpendingTrendChart
                data={summary.byMonth}
                currency={user?.currency}
              />
            </div>
            <div className="glass rounded-2xl p-5">
              <ChartHeader
                icon="🍩"
                title="By Category"
                sub="Breakdown of all spending"
              />
              <CategoryBreakdownChart
                data={summary.byCategory}
                currency={user?.currency}
              />
            </div>
          </div>

          {/* Filters */}
          <ExpenseFilters
            filters={filters}
            onChange={setFilters}
            categories={categories}
            onExport={handleExport}
            exporting={exporting}
          />

          {/* Table */}
          <ExpenseTable
            expenses={expenses}
            currency={user?.currency}
            pagination={pagination}
            onPageChange={setPage}
            loading={loadingList}
            onEdit={(exp) => {
              setEditingExpense(exp);
              setFormOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {/* Add/Edit modal */}
      <ExpenseForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingExpense(null);
        }}
        onSubmit={handleSave}
        categories={categories}
        initialData={editingExpense}
      />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white shadow-xl fade-up flex items-center gap-2 ${
            toast.type === "error"
              ? "bg-red-500/90 border border-red-400/30"
              : "bg-linear-to-r from-brand-500 to-pink-500"
          }`}
        >
          {toast.type === "error" ? "⚠️" : "✓"} {toast.text}
        </div>
      )}
    </div>
  );
}

function ChartHeader({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-base">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-slate-500">{sub}</p>
      </div>
    </div>
  );
}





export default DashboardPage;