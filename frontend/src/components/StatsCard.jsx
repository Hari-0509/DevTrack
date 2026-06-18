function StatsCard({
  title,
  value,
  color = "#2563EB",
  icon = "📊",
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)",
        border: "1px solid #E2E8F0",
        borderRadius: "28px",
        padding: "28px",
        boxShadow:
          "0 10px 30px rgba(15,23,42,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "160px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(15,23,42,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(15,23,42,0.06)";
      }}
    >
      <div>
        <p
          style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "#64748B",
            marginBottom: "20px",
          }}
        >
          {title}
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "48px",
            fontWeight: "700",
            color: color,
          }}
        >
          {value}
        </h1>
      </div>

      <div
        style={{
          width: "75px",
          height: "75px",
          borderRadius: "24px",
          background: `${color}15`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "36px",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatsCard;