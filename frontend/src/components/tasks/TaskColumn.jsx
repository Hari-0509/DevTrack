import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function TaskColumn({
  title,
  tasks,
  droppableId,
  onEdit,
  onDelete,
  onMove,
}) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: "24px",
        padding: "25px",
        minHeight: "550px",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
        }}
      >
        {title} ({tasks.length})
      </h2>

      <Droppable
        droppableId={droppableId}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map(
              (
                task,
                index
              ) => (
                <Draggable
                  key={task.id}
                  draggableId={String(
                    task.id
                  )}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={
                        provided.innerRef
                      }
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
                        ...provided
                          .draggableProps
                          .style,
                      }}
                    >
                      {/* TITLE */}

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

                      {/* DESCRIPTION */}

                      <p
                        style={{
                          color:
                            "#64748B",
                          lineHeight:
                            "1.6",
                          marginBottom:
                            "20px",
                        }}
                      >
                        {
                          task.description
                        }
                      </p>

                      {/* BADGES */}

                      <div
                        style={{
                          display:
                            "flex",
                          gap:
                            "10px",
                          flexWrap:
                            "wrap",
                          marginBottom:
                            "20px",
                        }}
                      >
                        <span
                          style={{
                            background:
                              task.priority ===
                              "High"
                                ? "#FEE2E2"
                                : task.priority ===
                                  "Medium"
                                ? "#FEF3C7"
                                : "#DCFCE7",

                            color:
                              task.priority ===
                              "High"
                                ? "#DC2626"
                                : task.priority ===
                                  "Medium"
                                ? "#D97706"
                                : "#16A34A",

                            padding:
                              "6px 14px",

                            borderRadius:
                              "30px",

                            fontSize:
                              "13px",

                            fontWeight:
                              "600",
                          }}
                        >
                          {
                            task.priority
                          }
                        </span>

                        {task.due_date && (
                          <span
                            style={{
                              background:
                                "#EFF6FF",

                              color:
                                "#2563EB",

                              padding:
                                "6px 14px",

                              borderRadius:
                                "30px",

                              fontSize:
                                "13px",

                              fontWeight:
                                "600",
                            }}
                          >
                            📅{" "}
                            {
                              task.due_date
                            }
                          </span>
                        )}
                      </div>
                      {task.assigned_to && (
  <div
    style={{
      marginBottom:
        "20px",
      color:
        "#475569",
      fontWeight:
        "600",
      fontSize:
        "14px",
    }}
  >
    👤 Assigned To:
    {" "}
    {
      task.assigned_to ||
      "Unassigned"
    }
  </div>
)}
                      {/* MOVE BUTTONS */}

                      <div
                        style={{
                          display:
                            "flex",
                          gap:
                            "10px",
                          flexWrap:
                            "wrap",
                          marginBottom:
                            "15px",
                        }}
                      >
                        {task.status ===
                          "Todo" && (
                          <button
                            onClick={() =>
                              onMove(
                                task.id,
                                "In Progress"
                              )
                            }
                            style={
                              moveButton
                            }
                          >
                            Start
                          </button>
                        )}

                        {task.status ===
                          "In Progress" && (
                          <button
                            onClick={() =>
                              onMove(
                                task.id,
                                "Completed"
                              )
                            }
                            style={
                              moveButton
                            }
                          >
                            Complete
                          </button>
                        )}

                        {task.status ===
                          "Completed" && (
                          <button
                            onClick={() =>
                              onMove(
                                task.id,
                                "Todo"
                              )
                            }
                            style={
                              moveButton
                            }
                          >
                            Reopen
                          </button>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}

                      <div
                        style={{
                          display:
                            "flex",
                          gap:
                            "10px",
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
                  )}
                </Draggable>
              )
            )}

            {
              provided.placeholder
            }
          </div>
        )}
      </Droppable>
    </div>
  );
}

const moveButton = {
  background:
    "#DCFCE7",
  color:
    "#16A34A",
  border: "none",
  padding:
    "10px 16px",
  borderRadius:
    "12px",
  cursor:
    "pointer",
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
  fontWeight:
    "600",
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
  fontWeight:
    "600",
};

export default TaskColumn;