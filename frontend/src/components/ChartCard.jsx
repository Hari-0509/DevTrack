import {
  Doughnut,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ChartCard({
  data,
}) {
  const chartData = {
    labels: [
      "Todo",
      "In Progress",
      "Completed",
    ],

    datasets: [
      {
        data: [
          data.todo,
          data.progress,
          data.completed,
        ],

        backgroundColor: [
          "#F59E0B",
          "#2563EB",
          "#16A34A",
        ],

        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "35px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.06)",
        border:
          "1px solid #E2E8F0",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
        }}
      >
        Task Analytics
      </h2>

      <div
        style={{
          width: "280px",
          margin: "0 auto",
        }}
      >
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
            },
            maintainAspectRatio:
              true,
          }}
        />
      </div>
    </div>
  );
}

export default ChartCard;