import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import TaskColumn from "../components/tasks/TaskColumn";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";


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
  
  const [priority,
  setPriority] =
  useState("Medium");

  const [dueDate,
  setDueDate] =
  useState("");

  const [search,
  setSearch] =
  useState("");

  const [
  members,
  setMembers
  ] = useState([]);

  const [
  assignedTo,
  setAssignedTo
  ] = useState("");

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

  const loadMembers =
  async (projectId) => {
    try {
      const response =
        await api.get(
          `/projects/${projectId}/members`
        );

      setMembers(
        Array.isArray(
          response.data
        )
          ? response.data
          : []
      );
    } catch (error) {
      console.log(error);
      setMembers([]);
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

    priority,

    due_date:
      dueDate,

    project_id:
      Number(projectId),

    assigned_to:
      assignedTo
        ? Number(
            assignedTo
          )
        : null
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

          priority,

          due_date:
            dueDate,

          assigned_to:
            assignedTo
              ? Number(
                  assignedTo
                )
              : null
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

    setPriority(
      task.priority ||
        "Medium"
    );

    setDueDate(
      task.due_date || ""
    );

    setProjectId(
      task.project_id
    );

    setAssignedTo(
      task.assigned_to || ""
    );

    loadMembers(
      task.project_id
    );

    setShowModal(true);
  };

  const clearForm = () => {
    setTaskName("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setProjectId("");
    setAssignedTo("");
    setMembers([]);
    setEditingTask(null);
    setShowModal(false);
  };

  const filteredTasks =
  tasks.filter(
    (task) =>
      task.task_name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  const todo =
    filteredTasks.filter(
      (task) =>
        task.status ===
        "Todo"
    );

  const progress =
    filteredTasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    );

  const completed =
    filteredTasks.filter(
      (task) =>
        task.status ===
        "Completed"
      );

  const moveTask = async (
    taskId,
    newStatus
  ) => {
    try {
      await api.put(
        `/tasks/${taskId}`,
        {
          status: newStatus,
        }
      );

      loadTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd =
  async (result) => {

    if (
      !result.destination
    ) {
      return;
    }

    const source =
      result.source
        .droppableId;

    const destination =
      result.destination
        .droppableId;

    if (
      source ===
      destination
    ) {
      return;
    }

    try {

      await api.put(
        `/tasks/${result.draggableId}`,
        {
          status:
            destination,
        }
      );

      loadTasks();

    } catch (error) {
      console.log(
        error
      );
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}

      <input
  placeholder="🔍 Search Tasks"
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
  style={{
    width: "100%",
    padding: "18px",
    border:
      "1px solid #E2E8F0",
    borderRadius:
      "18px",
    marginBottom:
      "35px",
    fontSize: "15px",
  }}
/>

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

      <DragDropContext
  onDragEnd={
    onDragEnd
  }
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(3,1fr)",
      gap: "25px",
    }}
  >
    <TaskColumn
      title="Todo"
      tasks={todo}
      droppableId="Todo"
      onEdit={editTask}
      onDelete={deleteTask}
      onMove={moveTask}
    />

    <TaskColumn
      title="In Progress"
      tasks={progress}
      droppableId="In Progress"
      onEdit={editTask}
      onDelete={deleteTask}
      onMove={moveTask}
    />

    <TaskColumn
      title="Completed"
      tasks={
        completed
      }
      droppableId="Completed"
      onEdit={editTask}
      onDelete={deleteTask}
      onMove={moveTask}
    />
  </div>
</DragDropContext>

{/* MODAL */}

{showModal && (
  <div style={overlay}>
    <div style={modal}>
      <h2
        style={{
          marginBottom: "30px",
        }}
      >
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
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        style={{
          ...inputStyle,
          height: "120px",
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
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value
          )
        }
        style={inputStyle}
      >
        <option>
          High
        </option>

        <option>
          Medium
        </option>

        <option>
          Low
        </option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(
            e.target.value
          )
        }
        style={inputStyle}
      />

      {!editingTask && (
        <select
          value={projectId}
          onChange={(e) => {
  setProjectId(
    e.target.value
  );

  loadMembers(
    e.target.value
  );
}}
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
      )}

      <select
  value={assignedTo}
  onChange={(e) =>
    setAssignedTo(
      e.target.value
    )
  }
  style={{
    ...inputStyle,
    color:
      "#0F172A",
    background:
      "#FFFFFF"
  }}
>
  <option value="">
    Select Member
  </option>

  {members.map(
    (member) => (
      <option
        key={member.id}
        value={member.id}
      >
        {member.username}
        {" ("}
        {member.role}
        {")"}
      </option>
    )
  )}
  
</select>
      <div
        style={{
          display: "flex",
          justifyContent:
            "flex-end",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={
            clearForm
          }
          style={{
            padding:
              "15px 25px",
            border:
              "1px solid #E2E8F0",
            background:
              "white",
            borderRadius:
              "14px",
            cursor:
              "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={() =>
            editingTask
              ? updateTask()
              : createTask()
          }
          style={buttonStyle}
        >
          {editingTask
            ? "Update Task"
            : "Create Task"}
        </button>
      </div>
    </div>
  </div>
)}
    </MainLayout>
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

const moveButton = {
  background: "#DCFCE7",
  color: "#16A34A",
  border: "none",
  padding: "10px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Tasks;