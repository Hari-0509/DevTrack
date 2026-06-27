import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";

function Dashboard() {
  const navigate =
    useNavigate();

  const [
    stats,
    setStats,
  ] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    pending: 0,
  });

  const [
    charts,
    setCharts,
  ] = useState({
    todo: 0,
    progress: 0,
    completed: 0,
  });

  const [
    projects,
    setProjects,
  ] = useState([]);

  const [
    tasks,
    setTasks,
  ] = useState([]);

  const [activities, setActivities] =
  useState([]);

  useEffect(() => {
  loadDashboard();
  loadActivities();

  window.addEventListener(
    "focus",
    loadDashboard
  );

  return () =>
    window.removeEventListener(
      "focus",
      loadDashboard
    );
}, []);

  const loadDashboard =
  async () => {
    try {
      const dashboardRes =
        await api.get(
          "/dashboard"
        );

      const projectRes =
        await api.get(
          "/projects"
        );

      const taskRes =
        await api.get(
          "/tasks"
        );

      const data =
        dashboardRes.data;

      setStats({
        projects:
          data.projects,
        tasks:
          data.tasks,
        completed:
          data.completed,
        pending:
          data.todo +
          data.progress,
      });

      setCharts({
        todo:
          data.todo,
        progress:
          data.progress,
        completed:
          data.completed,
      });

      setProjects(
        projectRes.data
      );

      setTasks(
        taskRes.data
      );
    } catch (error) {
      console.log(
        error
      );
    }
  };

  const loadActivities =
  async () => {
    try {
      const response =
        await api.get(
          "/activities"
        );

      setActivities(
        response.data
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !==
        "Completed"
    );

  return (
    <MainLayout>
      {/* Header */}

      <div
        style={{
          marginBottom:
            "40px",
        }}
      >
        <h1
          style={{
            fontSize:
              "48px",
            marginBottom:
              "10px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            color:
              "#64748B",
          }}
        >
          Track projects,
          tasks and
          productivity.
        </p>
      </div>

      {/* Stats */}

      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px",
    marginBottom: "40px",
  }}
>
  <div
    onClick={() =>
      navigate("/projects")
    }
  >
    <StatsCard
      title="Projects"
      value={stats.projects}
      color="#2563EB"
      icon="📁"
    />
  </div>

  <div
    onClick={() =>
      navigate("/tasks")
    }
  >
    <StatsCard
      title="Tasks"
      value={stats.tasks}
      color="#7C3AED"
      icon="✅"
    />
  </div>

  <StatsCard
    title="Completed"
    value={stats.completed}
    color="#16A34A"
    icon="🎯"
  />

  <StatsCard
    title="Pending"
    value={stats.pending}
    color="#F59E0B"
    icon="⏳"
  />
</div>



      {/* Analytics */}

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "25px",
          marginBottom:
            "35px",
        }}
      >
        <ChartCard
          data={charts}
        />

        <div
          style={{
            background:
              "white",
            borderRadius:
              "24px",
            padding:
              "35px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.06)",
            border:
              "1px solid #E2E8F0",
          }}
        >
          <h2
            style={{
              marginBottom:
                "30px",
            }}
          >
            Pending Tasks
          </h2>

          {pendingTasks
            .length ===
          0 ? (
            <p
              style={{
                color:
                  "#64748B",
              }}
            >
              No pending
              tasks 🎉
            </p>
          ) : (
            pendingTasks
              .slice(
                0,
                5
              )
              .map(
                (
                  task
                ) => (
                  <div
                    key={
                      task.id
                    }
                    style={{
                      padding:
                        "15px",
                      background:
                        "#F8FAFC",
                      borderRadius:
                        "16px",
                      marginBottom:
                        "15px",
                    }}
                  >
                    <h4>
                      {
                        task.task_name
                      }
                    </h4>

                    <p
                      style={{
                        color:
                          "#64748B",
                      }}
                    >
                      {
                        task.status
                      }
                    </p>
                  </div>
                )
              )
          )}
        </div>
      </div>
    {/* Recent Activity */}

<div
  style={{
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "35px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)",
    border:
      "1px solid #E2E8F0",
    marginBottom:
      "35px",
  }}
>
  <h2
    style={{
      marginTop: 0,
      marginBottom:
        "30px",
      color:
        "#0F172A",
    }}
  >
    Recent Activity
  </h2>

  {activities.length ===
  0 ? (
    <p
      style={{
        color:
          "#64748B",
      }}
    >
      No activities yet 🎉
    </p>
  ) : (
    activities.map(
      (item) => (
        <div
          key={item.id}
          style={{
            padding:
              "16px 0",
            borderBottom:
              "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              fontWeight:
                "600",
              color:
                "#0F172A",
            }}
          >
            {item.action.includes(
              "Completed"
            )
              ? "✅"
              : item.action.includes(
                  "Created"
                )
              ? "🆕"
              : item.action.includes(
                  "Deleted"
                )
              ? "🗑️"
              : "📌"}

            {" "}
            {item.action}
          </div>

          <small
            style={{
              color:
                "#64748B",
            }}
          >
            {new Date(
              item.created_at
            ).toLocaleString()}
          </small>
        </div>
      )
    )
  )}
</div>
      {/* Projects */}

      <div
        style={{
          background:
            "white",
          borderRadius:
            "24px",
          padding:
            "35px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
          border:
            "1px solid #E2E8F0",
        }}
      >
        <h2
          style={{
            marginBottom:
              "30px",
          }}
        >
          Projects
        </h2>

        {projects
          .length ===
        0 ? (
          <p
            style={{
              color:
                "#64748B",
            }}
          >
            No projects
            found.
          </p>
        ) : (
          projects.map(
            (
              project
            ) => (
              <div
                key={
                  project.id
                }
                onClick={() =>
                  navigate(
                    "/projects"
                  )
                }
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "20px",
                  padding:
                    "18px",
                  background:
                    "#F8FAFC",
                  borderRadius:
                    "16px",
                  marginBottom:
                    "15px",
                  cursor:
                    "pointer",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "30px",
                  }}
                >
                  📁
                </div>

                <div>
                  <h3>
                    {
                      project.title
                    }
                  </h3>

                  <p
                    style={{
                      color:
                        "#64748B",
                    }}
                  >
                    {
                      project.status
                    }
                  </p>
                </div>
              </div>
            )
          )
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;