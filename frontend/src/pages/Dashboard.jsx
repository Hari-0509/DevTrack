import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/dashboard/DashboardCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import ProductivityChart from "../components/dashboard/ProductivityChart";

function Dashboard() {
  return (
    <MainLayout>
      <div
        style={{
          marginBottom:
            "40px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom:
              "10px",
          }}
        >
          Good Morning 👋
        </h1>

        <p
          style={{
            color:
              "#64748B",
          }}
        >
          Welcome back to
          DevTrack.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "25px",
          marginBottom:
            "30px",
        }}
      >
        <DashboardCard
          title="Projects"
          value="12"
          color="#2563EB"
        />

        <DashboardCard
          title="Tasks"
          value="48"
          color="#7C3AED"
        />

        <DashboardCard
          title="Pending"
          value="9"
          color="#F59E0B"
        />

        <DashboardCard
          title="Productivity"
          value="92%"
          color="#22C55E"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "25px",
        }}
      >
        <ProductivityChart />
        <RecentActivity />
      </div>
    </MainLayout>
  );
}

export default Dashboard;