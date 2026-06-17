import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProductivityChart() {
  const data = [
    {
      day: "Mon",
      tasks: 2,
    },
    {
      day: "Tue",
      tasks: 4,
    },
    {
      day: "Wed",
      tasks: 6,
    },
    {
      day: "Thu",
      tasks: 8,
    },
    {
      day: "Fri",
      tasks: 5,
    },
    {
      day: "Sat",
      tasks: 9,
    },
  ];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "30px",
        border: "1px solid #E2E8F0",
        height: "400px",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
        }}
      >
        Productivity
      </h2>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <LineChart
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductivityChart;