import Card from "../ui/Card";

function DashboardCard({
  title,
  value,
  icon
}) {
  return (
    <Card>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between"
        }}
      >
        <div>

          <h3
            style={{
              color: "#94a3b8"
            }}
          >
            {title}
          </h3>

          <h1
            style={{
              marginTop: "15px",
              fontSize: "40px"
            }}
          >
            {value}
          </h1>

        </div>

        <div
          style={{
            fontSize: "45px"
          }}
        >
          {icon}
        </div>

      </div>

    </Card>
  );
}

export default DashboardCard;