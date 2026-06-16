function DashboardCard({
  title,
  value
}) {

  return (

    <div
      style={{
        background: "#1e293b",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "250px"
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>

  );
}

export default DashboardCard;