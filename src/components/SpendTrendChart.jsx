import { Line } from "react-chartjs-2";
import "../utils/helpers";
import { formatCurrency } from "../utils/helpers";

 function SpendingTrendChart({ data, currency }) {
  if (!data?.length) return <Empty text="No trend data for this filter" />;

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Spending",
        data: data.map((d) => d.total),
        borderColor: "#818cf8",
        backgroundColor: (ctx) => {
          const canvas = ctx.chart.ctx;
          const grad = canvas.createLinearGradient(0, 0, 0, 200);
          grad.addColorStop(0, "rgba(129,140,248,0.35)");
          grad.addColorStop(1, "rgba(129,140,248,0.0)");
          return grad;
        },
        pointBackgroundColor: "#ec4899",
        pointBorderColor: "#1a2340",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
        borderWidth: 2.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a2340",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 12,
        titleColor: "#94a3b8",
        bodyColor: "#f1f5f9",
        callbacks: {
          label: (ctx) => ` ${formatCurrency(ctx.parsed.y, currency)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { color: "#475569", font: { size: 11 } },
        border: { color: "transparent" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: {
          color: "#475569",
          font: { size: 11 },
          callback: (v) => formatCurrency(v, currency).replace(/\.00$/, ""),
        },
        border: { color: "transparent" },
      },
    },
  };

  return (
    <div className="h-56">
      <Line data={chartData} options={options} />
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="h-56 flex flex-col items-center justify-center text-slate-500 text-sm gap-2">
      <span className="text-3xl">📉</span>
      {text}
    </div>
  );
}






export default SpendingTrendChart;
