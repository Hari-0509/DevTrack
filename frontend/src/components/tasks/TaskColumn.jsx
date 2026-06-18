import TaskCard from "./TaskCard";

function TaskColumn({
  title,
  tasks,
}) {
  return (
    <div
      style={{
        background:
          "#F8FAFC",
        padding: "20px",
        borderRadius:
          "24px",
        minHeight:
          "600px",
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
          <TaskCard
            key={task.id}
            task={task}
          />
        )
      )}
    </div>
  );
}

export default TaskColumn;