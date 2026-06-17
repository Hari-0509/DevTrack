function DashboardCard({
  title,
  value,
  color
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "30px",
        border: "1px solid #E2E8F0",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          color: "#64748B",
          marginBottom: "20px",
        }}
      >
        {title}
      </p>

      <h1
        style={{
          fontSize: "42px",
          color,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;