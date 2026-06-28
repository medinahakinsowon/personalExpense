import { Doughnut } from "react-chartjs-2";
import "../utils/helpers";
import { formatCurrency, getCategoryMeta } from "../utils/helpers";

 function CategoryBreakdownChart({ data, currency }) {
  if (!data?.length) return <Empty />;

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.total),
        backgroundColor: data.map(
          (d, i) => getCategoryMeta(d.category, i).color,
        ),
        borderColor: "#1a2340",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 12,
          color: "#94a3b8",
          font: { size: 11.5 },
        },
      },
      tooltip: {
        backgroundColor: "#1a2340",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 12,
        bodyColor: "#f1f5f9",
        callbacks: {
          label: (ctx) =>
            ` ${ctx.label}: ${formatCurrency(ctx.parsed, currency)}`,
        },
      },
    },
  };

  return (
    <div className="h-56">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

function Empty() {
  return (
    <div className="h-56 flex flex-col items-center justify-center text-slate-500 text-sm gap-2">
      <span className="text-3xl">🍩</span>
      No category data for this filter
    </div>
  );
}



export default CategoryBreakdownChart;
