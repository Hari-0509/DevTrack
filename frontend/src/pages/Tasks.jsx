import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [taskName, setTaskName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("Todo");

  const [projectId, setProjectId] =
    useState("");

  useEffect(() => {
    loadTasks();
    loadProjects();
  }, []);

  const loadTasks = async () => {
    try {
      const response =
        await api.get("/tasks");

      setTasks(
        Array.isArray(
          response.data
        )
          ? response.data
          : []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadProjects = async () => {
    try {
      const response =
        await api.get("/projects");

      setProjects(
        Array.isArray(
          response.data
        )
          ? response.data
          : []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createTask =
    async () => {
      try {
        await api.post(
          "/tasks",
          {
            task_name:
              taskName,
            description,
            status,
            project_id:
              Number(projectId),
          }
        );

        setTaskName("");
        setDescription("");
        setStatus("Todo");
        setProjectId("");
        setShowModal(false);

        loadTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const todo =
    tasks.filter(
      (task) =>
        task.status ===
        "Todo"
    );

  const progress =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    );

  const completed =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    );

  return (
    <MainLayout>
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          marginBottom:
            "40px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize:
                "42px",
              fontWeight:
                "700",
              marginBottom:
                "10px",
            }}
          >
            Tasks
          </h1>

          <p
            style={{
              color:
                "#64748B",
            }}
          >
            Manage your tasks
            efficiently.
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          style={{
            background:
              "#2563EB",
            color: "white",
            border: "none",
            padding:
              "15px 25px",
            borderRadius:
              "16px",
            cursor:
              "pointer",
            fontWeight:
              "600",
            fontSize:
              "15px",
          }}
        >
          + New Task
        </button>
      </div>

      {/* KANBAN */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "25px",
        }}
      >
        <TaskColumn
          title={`Todo (${todo.length})`}
          tasks={todo}
        />

        <TaskColumn
          title={`In Progress (${progress.length})`}
          tasks={progress}
        />

        <TaskColumn
          title={`Completed (${completed.length})`}
          tasks={completed}
        />
      </div>

      {/* MODAL */}

      {showModal && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "550px",
              background:
                "white",
              padding:
                "40px",
              borderRadius:
                "30px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              style={{
                marginBottom:
                  "30px",
              }}
            >
              Create New Task
            </h2>

            <input
              placeholder="Task Name"
              value={taskName}
              onChange={(e) =>
                setTaskName(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Description"
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              style={{
                ...inputStyle,
                height:
                  "120px",
              }}
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              style={inputStyle}
            >
              <option>
                Todo
              </option>

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>
            </select>

            <select
              value={projectId}
              onChange={(e) =>
                setProjectId(
                  e.target.value
                )
              }
              style={inputStyle}
            >
              <option value="">
                Select Project
              </option>

              {projects.map(
                (project) => (
                  <option
                    key={
                      project.id
                    }
                    value={
                      project.id
                    }
                  >
                    {
                      project.title
                    }
                  </option>
                )
              )}
            </select>

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap: "15px",
                marginTop:
                  "30px",
              }}
            >
              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                style={{
                  padding:
                    "15px 25px",
                  background:
                    "white",
                  border:
                    "1px solid #CBD5E1",
                  borderRadius:
                    "14px",
                  cursor:
                    "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={
                  createTask
                }
                style={{
                  padding:
                    "15px 25px",
                  background:
                    "#2563EB",
                  color:
                    "white",
                  border:
                    "none",
                  borderRadius:
                    "14px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",
                }}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

/* COLUMN */

function TaskColumn({
  title,
  tasks,
}) {
  return (
    <div
      style={{
        background:
          "#F8FAFC",
        border:
          "1px solid #E2E8F0",
        borderRadius:
          "24px",
        padding:
          "25px",
        minHeight:
          "500px",
      }}
    >
      <h2
        style={{
          marginBottom:
            "25px",
          fontSize:
            "24px",
        }}
      >
        {title}
      </h2>

      {tasks.length === 0 ? (
        <div
          style={{
            background:
              "white",
            border:
              "2px dashed #CBD5E1",
            padding:
              "40px",
            borderRadius:
              "20px",
            textAlign:
              "center",
            color:
              "#94A3B8",
          }}
        >
          No tasks yet
        </div>
      ) : (
        tasks.map(
          (task) => (
            <div
              key={task.id}
              style={{
                background:
                  "white",
                padding:
                  "20px",
                borderRadius:
                  "20px",
                marginBottom:
                  "20px",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  marginBottom:
                    "10px",
                }}
              >
                {
                  task.task_name
                }
              </h3>

              <p
                style={{
                  color:
                    "#64748B",
                  lineHeight:
                    "1.6",
                }}
              >
                {
                  task.description
                }
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  border:
    "1px solid #E2E8F0",
  borderRadius:
    "16px",
  fontSize: "15px",
  outline: "none",
};

export default Tasks;