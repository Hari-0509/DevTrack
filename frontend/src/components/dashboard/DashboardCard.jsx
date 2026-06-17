import Card from "../ui/Card";

function DashboardCard({
  title,
  value
}) {
  return (
    <Card>
      <h3
        style={{
          color: "#94a3b8",
          marginBottom: "10px"
        }}
      >
        {title}
      </h3>

      <h1>{value}</h1>
    </Card>
  );
}

export default DashboardCard;