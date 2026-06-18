import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import TaskColumn from "../components/tasks/TaskColumn";

function Tasks() {
  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks =
    async () => {
      try {
        const response =
          await api.get(
            "/tasks"
          );

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

  const todo =
    tasks.filter(
      (t) =>
        t.status ===
        "Todo"
    );

  const progress =
    tasks.filter(
      (t) =>
        t.status ===
        "In Progress"
    );

  const completed =
    tasks.filter(
      (t) =>
        t.status ===
        "Completed"
    );

  return (
    <MainLayout>
      <h1
        style={{
          fontSize:
            "40px",
          marginBottom:
            "40px",
        }}
      >
        Tasks
      </h1>

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "1fr 1fr 1fr",
          gap: "25px",
        }}
      >
        <TaskColumn
          title="Todo"
          tasks={todo}
        />

        <TaskColumn
          title="In Progress"
          tasks={
            progress
          }
        />

        <TaskColumn
          title="Completed"
          tasks={
            completed
          }
        />
      </div>
    </MainLayout>
  );
}

export default Tasks;