function TaskCard({
  task
}) {
  return (
    <div
      style={{
        background:
          "white",
        padding: "20px",
        borderRadius:
          "18px",
        border:
          "1px solid #E2E8F0",
        marginBottom:
          "15px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h3>
        {task.task_name}
      </h3>

      <p
        style={{
          color:
            "#64748B",
          marginTop:
            "10px",
        }}
      >
        {task.description}
      </p>
    </div>
  );
}

export default TaskCard;