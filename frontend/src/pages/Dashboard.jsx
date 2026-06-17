import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/dashboard/DashboardCard";

function Dashboard() {
  return (
    <MainLayout>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px"
        }}
      >
        <DashboardCard
          title="Projects"
          value="12"
        />

        <DashboardCard
          title="Tasks"
          value="48"
        />

        <DashboardCard
          title="Pending"
          value="9"
        />

        <DashboardCard
          title="Progress"
          value="78%"
        />
      </div>

    </MainLayout>
  );
}

export default Dashboard;