import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

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

        clearForm();
        loadTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const updateTask =
    async () => {
      try {
        await api.put(
          `/tasks/${editingTask.id}`,
          {
            task_name:
              taskName,
            description,
            status,
          }
        );

        clearForm();
        loadTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const deleteTask =
    async (id) => {
      try {
        await api.delete(
          `/tasks/${id}`
        );

        loadTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const editTask = (
    task
  ) => {
    setEditingTask(task);

    setTaskName(
      task.task_name
    );

    setDescription(
      task.description
    );

    setStatus(
      task.status
    );

    setProjectId(
      task.project_id
    );

    setShowModal(true);
  };

  const clearForm = () => {
    setTaskName("");
    setDescription("");
    setStatus("Todo");
    setProjectId("");
    setEditingTask(null);
    setShowModal(false);
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
                "40px",
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
            Manage your
            tasks efficiently
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          style={buttonStyle}
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
          onEdit={editTask}
          onDelete={
            deleteTask
          }
        />

        <TaskColumn
          title={`In Progress (${progress.length})`}
          tasks={progress}
          onEdit={editTask}
          onDelete={
            deleteTask
          }
        />

        <TaskColumn
          title={`Completed (${completed.length})`}
          tasks={completed}
          onEdit={editTask}
          onDelete={
            deleteTask
          }
        />
      </div>

      {/* MODAL */}

      {showModal && (
        <div
          style={overlay}
        >
          <div
            style={modal}
          >
            <h2>
              {editingTask
                ? "Update Task"
                : "Create Task"}
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

            {!editingTask && (
              <select
                value={
                  projectId
                }
                onChange={(e) =>
                  setProjectId(
                    e.target
                      .value
                  )
                }
                style={
                  inputStyle
                }
              >
                <option value="">
                  Select
                  Project
                </option>

                {projects.map(
                  (
                    project
                  ) => (
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
            )}

            <button
              onClick={() =>
                editingTask
                  ? updateTask()
                  : createTask()
              }
              style={
                buttonStyle
              }
            >
              {editingTask
                ? "Update Task"
                : "Create Task"}
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

function TaskColumn({
  title,
  tasks,
  onEdit,
  onDelete,
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
        }}
      >
        {title}
      </h2>

      {tasks.map(
        (task) => (
          <div
            key={
              task.id
            }
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
            <h3>
              {
                task.task_name
              }
            </h3>

            <p
              style={{
                color:
                  "#64748B",
                marginTop:
                  "10px",
              }}
            >
              {
                task.description
              }
            </p>

            <div
              style={{
                display:
                  "flex",
                gap: "10px",
                marginTop:
                  "20px",
              }}
            >
              <button
                onClick={() =>
                  onEdit(
                    task
                  )
                }
                style={
                  editButton
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(
                    task.id
                  )
                }
                style={
                  deleteButton
                }
              >
                Delete
              </button>
            </div>
          </div>
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
};

const buttonStyle = {
  background:
    "#2563EB",
  color: "white",
  border: "none",
  padding:
    "15px 25px",
  borderRadius:
    "16px",
  cursor: "pointer",
  fontWeight:
    "600",
};

const editButton = {
  background:
    "#EFF6FF",
  color:
    "#2563EB",
  border: "none",
  padding:
    "10px 16px",
  borderRadius:
    "12px",
  cursor:
    "pointer",
};

const deleteButton = {
  background:
    "#FEF2F2",
  color:
    "#DC2626",
  border: "none",
  padding:
    "10px 16px",
  borderRadius:
    "12px",
  cursor:
    "pointer",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background:
    "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent:
    "center",
  alignItems:
    "center",
};

const modal = {
  width: "550px",
  background: "white",
  padding: "40px",
  borderRadius: "30px",
};

export default Tasks;