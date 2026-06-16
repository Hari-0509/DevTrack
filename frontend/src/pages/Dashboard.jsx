import { useEffect } from "react";
import { useState } from "react";

import api from "../services/api";

import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {

  const [data, setData] =
    useState({
      projects: 0,
      completed_tasks: 0,
      pending_tasks: 0
    });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const response =
        await api.get(
          "/dashboard"
        );

      setData(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <MainLayout>

      <h1
        style={{
          color: "white"
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >

        <DashboardCard
          title="Projects"
          value={data.projects}
        />

        <DashboardCard
          title="Completed Tasks"
          value={
            data.completed_tasks
          }
        />

        <DashboardCard
          title="Pending Tasks"
          value={
            data.pending_tasks
          }
        />

      </div>

    </MainLayout>

  );
}

export default Dashboard;