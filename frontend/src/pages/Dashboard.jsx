import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/dashboard/DashboardCard";
import {
  FaFolder,
  FaTasks,
  FaClock,
  FaChartLine
} from "react-icons/fa";

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
          icon={<FaFolder />}
        />

        <DashboardCard
          title="Tasks"
          value="48"
        icon={<FaTasks />}
        />

        <DashboardCard
          title="Pending"
          value="9"
          icon={<FaClock />}
        />

        <DashboardCard
          title="Progress"
          value="78%"
          icon={<FaChartLine />}
        />
      </div>


    </MainLayout>
  );
}

export default Dashboard;