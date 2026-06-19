import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Analytics() {
  const [analytics, setAnalytics] =
    useState({
      projects: 0,
      tasks: 0,
      todo: 0,
      progress: 0,
      completed: 0,
      high: 0,
      medium: 0,
      low: 0,
      productivity: 0,
      upcoming: [],
    });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics =
    async () => {
      try {
        const response =
          await api.get(
            "/dashboard"
          );

        setAnalytics(
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
          fontSize: "40px",
          marginBottom: "40px",
        }}
      >
        Analytics
      </h1>

      {/* KPI CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          marginBottom: "50px",
        }}
      >
        <Card
          title="Projects"
          value={
            analytics.projects
          }
        />

        <Card
          title="Tasks"
          value={
            analytics.tasks
          }
        />

        <Card
          title="Completed"
          value={
            analytics.completed
          }
        />

        <Card
          title="Productivity"
          value={`${analytics.productivity}%`}
        />
      </div>

      {/* STATUS */}

      <div
        style={{
          background:
            "white",
          padding: "35px",
          borderRadius:
            "25px",
          marginBottom:
            "35px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h2>
          Task Status
        </h2>

        <p>
          Todo:
          {" "}
          {
            analytics.todo
          }
        </p>

        <p>
          In Progress:
          {" "}
          {
            analytics.progress
          }
        </p>

        <p>
          Completed:
          {" "}
          {
            analytics.completed
          }
        </p>
      </div>

      {/* PRIORITY */}

      <div
        style={{
          background:
            "white",
          padding: "35px",
          borderRadius:
            "25px",
          marginBottom:
            "35px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h2>
          Priority
        </h2>

        <p>
          🔴 High:
          {" "}
          {
            analytics.high
          }
        </p>

        <p>
          🟡 Medium:
          {" "}
          {
            analytics.medium
          }
        </p>

        <p>
          🟢 Low:
          {" "}
          {
            analytics.low
          }
        </p>
      </div>

      {/* UPCOMING */}

      <div
        style={{
          background:
            "white",
          padding: "35px",
          borderRadius:
            "25px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h2>
          Upcoming Deadlines
        </h2>

        {analytics.upcoming
          .length ===
        0 ? (
          <p>
            No upcoming
            deadlines.
          </p>
        ) : (
          analytics.upcoming.map(
            (task) => (
              <div
                key={
                  task.id
                }
                style={{
                  border:
                    "1px solid #E2E8F0",
                  padding:
                    "20px",
                  borderRadius:
                    "18px",
                  marginTop:
                    "15px",
                }}
              >
                <h3>
                  {
                    task.task_name
                  }
                </h3>

                <p>
                  📅
                  {" "}
                  {
                    task.due_date
                  }
                </p>
              </div>
            )
          )
        )}
      </div>
    </MainLayout>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div
      style={{
        background:
          "white",
        padding: "35px",
        borderRadius:
          "25px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          color:
            "#64748B",
        }}
      >
        {title}
      </p>

      <h1
        style={{
          fontSize:
            "45px",
          marginTop:
            "20px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default Analytics;