import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import {
  Doughnut,
  Pie,
  Line,
} from "react-chartjs-2";

import {
  FolderKanban,
  CheckSquare,
  CheckCircle,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

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

  const statusData = {
    labels: [
      "Todo",
      "In Progress",
      "Completed",
    ],
    datasets: [
      {
        data: [
          analytics.todo,
          analytics.progress,
          analytics.completed,
        ],
        backgroundColor: [
          "#EF4444",
          "#F59E0B",
          "#10B981",
        ],
        borderWidth: 0,
      },
    ],
  };

  const priorityData = {
    labels: [
      "High",
      "Medium",
      "Low",
    ],
    datasets: [
      {
        data: [
          analytics.high,
          analytics.medium,
          analytics.low,
        ],
        backgroundColor: [
          "#DC2626",
          "#F59E0B",
          "#16A34A",
        ],
        borderWidth: 0,
      },
    ],
  };

  const trendData = {
    labels: [
      "Todo",
      "Progress",
      "Completed",
    ],
    datasets: [
      {
        label: "Tasks",
        data: [
          analytics.todo,
          analytics.progress,
          analytics.completed,
        ],
        borderColor:
          "#2563EB",
        backgroundColor:
          "#2563EB",
        tension: 0.4,
      },
    ],
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

      {/* KPI */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          marginBottom: "40px",
        }}
      >
        <StatCard
          icon={
            <FolderKanban
              size={30}
            />
          }
          title="Projects"
          value={
            analytics.projects
          }
          subtitle="Active Projects"
        />

        <StatCard
          icon={
            <CheckSquare
              size={30}
            />
          }
          title="Tasks"
          value={
            analytics.tasks
          }
          subtitle="Total Tasks"
        />

        <StatCard
          icon={
            <CheckCircle
              size={30}
            />
          }
          title="Completed"
          value={
            analytics.completed
          }
          subtitle="Finished Tasks"
        />

        <StatCard
          icon={
            <TrendingUp
              size={30}
            />
          }
          title="Productivity"
          value={`${analytics.productivity}%`}
          subtitle="Efficiency"
        />
      </div>

      {/* CHARTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(450px,1fr))",
          gap: "30px",
          marginBottom: "40px",
        }}
      >
        <Card title="Task Status">
          <div
            style={{
              width: "280px",
              height: "280px",
              margin: "0 auto",
            }}
          >
            <Doughnut
              data={
                statusData
              }
              options={{
                maintainAspectRatio:
                  false,
              }}
            />
          </div>
        </Card>

        <Card title="Priority Distribution">
          <div
            style={{
              width: "280px",
              height: "280px",
              margin: "0 auto",
            }}
          >
            <Pie
              data={
                priorityData
              }
              options={{
                maintainAspectRatio:
                  false,
              }}
            />
          </div>
        </Card>
      </div>

      {/* PRODUCTIVITY */}

      <Card title="Task Flow">
        <div
          style={{
            height: "320px",
          }}
        >
          <Line
            data={trendData}
            options={{
              maintainAspectRatio:
                false,
            }}
          />
        </div>
      </Card>

      <br />

      {/* PRODUCTIVITY BAR */}

      <Card title="Overall Productivity">
        <div
          style={{
            background:
              "#E2E8F0",
            height: "20px",
            borderRadius:
              "30px",
            overflow:
              "hidden",
            marginTop:
              "20px",
          }}
        >
          <div
            style={{
              width:
                `${analytics.productivity}%`,
              height:
                "100%",
              background:
                "#2563EB",
              borderRadius:
                "30px",
            }}
          />
        </div>

        <h2
          style={{
            marginTop:
              "20px",
          }}
        >
          {
            analytics.productivity
          }
          %
          Completed
        </h2>
      </Card>

      <br />

      {/* UPCOMING */}

      <Card title="Upcoming Deadlines">
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
                  borderRadius:
                    "18px",
                  padding:
                    "20px",
                  marginBottom:
                    "15px",
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                }}
              >
                <div>
                  <h3>
                    {
                      task.task_name
                    }
                  </h3>

                  <p
                    style={{
                      color:
                        "#64748B",
                    }}
                  >
                    {
                      task.description
                    }
                  </p>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "8px",
                    color:
                      "#2563EB",
                  }}
                >
                  <Calendar
                    size={18}
                  />
                  {
                    task.due_date
                  }
                </div>
              </div>
            )
          )
        )}
      </Card>

      <br />

      {/* RECENT ACTIVITY */}

      <Card title="Recent Activity">
        <Activity
          icon="📁"
          text={`${analytics.projects} active projects`}
        />

        <Activity
          icon="📝"
          text={`${analytics.tasks} total tasks`}
        />

        <Activity
          icon="⏳"
          text={`${analytics.progress} tasks in progress`}
        />

        <Activity
          icon="✅"
          text={`${analytics.completed} tasks completed`}
        />
      </Card>
    </MainLayout>
  );
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div
      style={{
        background:
          "white",
        borderRadius:
          "24px",
        padding:
          "35px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          color:
            "#2563EB",
        }}
      >
        {icon}
      </div>

      <h1
        style={{
          fontSize:
            "45px",
          margin:
            "20px 0 5px",
        }}
      >
        {value}
      </h1>

      <h3>{title}</h3>

      <p
        style={{
          color:
            "#64748B",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function Card({
  title,
  children,
}) {
  return (
    <div
      style={{
        background:
          "white",
        borderRadius:
          "24px",
        padding:
          "35px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <h2
        style={{
          marginBottom:
            "30px",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

function Activity({
  icon,
  text,
}) {
  return (
    <div
      style={{
        display:
          "flex",
        gap: "15px",
        alignItems:
          "center",
        marginBottom:
          "20px",
      }}
    >
      <Clock size={18} />

      <span>
        {icon}
        {" "}
        {text}
      </span>
    </div>
  );
}

export default Analytics;