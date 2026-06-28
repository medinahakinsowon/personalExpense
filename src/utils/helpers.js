// ── Category colors ─────────────────────────────────────────────────────────
export const CATEGORY_META = {
  "Food & Dining": {
    color: "#f97316",
    bg: "rgba(249,115,22,0.15)",
    emoji: "🍔",
  },
  Transportation: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.15)",
    emoji: "🚗",
  },
  Housing: { color: "#8b5cf6", bg: "rgba(139,92,246,0.15)", emoji: "🏠" },
  Utilities: { color: "#14b8a6", bg: "rgba(20,184,166,0.15)", emoji: "💡" },
  Healthcare: { color: "#ec4899", bg: "rgba(236,72,153,0.15)", emoji: "🏥" },
  Entertainment: { color: "#a855f7", bg: "rgba(168,85,247,0.15)", emoji: "🎬" },
  Shopping: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", emoji: "🛍️" },
  Education: { color: "#22c55e", bg: "rgba(34,197,94,0.15)", emoji: "📚" },
  Travel: { color: "#eab308", bg: "rgba(234,179,8,0.15)", emoji: "✈️" },
  "Savings & Investments": {
    color: "#10b981",
    bg: "rgba(16,185,129,0.15)",
    emoji: "💰",
  },
  Other: { color: "#64748b", bg: "rgba(100,116,139,0.15)", emoji: "📦" },
};

const FALLBACKS = Object.values(CATEGORY_META);
export function getCategoryMeta(category, index = 0) {
  return CATEGORY_META[category] || FALLBACKS[index % FALLBACKS.length];
}

// ── Currency ─────────────────────────────────────────────────────────────────
export function formatCurrency(amount, currency = "NGN") {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `₦${Number(amount).toFixed(2)}`;
  }
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ── CSV export ───────────────────────────────────────────────────────────────
import apiClient from "../utils/axiosClient";

export async function exportExpensesToCSV(filters = {}) {
  const params = {};
  if (filters.category && filters.category !== "All")
    params.category = filters.category;
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;
  if (filters.search) params.search = filters.search;

  const response = await apiClient.get("/expenses/export", {
    params,
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ── Chart.js setup ───────────────────────────────────────────────────────────
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
);
ChartJS.defaults.font.family = "'Inter', sans-serif";
ChartJS.defaults.color = "#94a3b8";
