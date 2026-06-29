import { useState } from "react";
import api from "../../services/api";

function CreateProjectModal({
  open,
  close,
  refresh,
}) {
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  if (!open) {
    return null;
  }

  const createProject =
    async () => {
      try {
        await api.post(
          "/projects",
          {
            title,
            description,
          }
        );

        close();
        refresh();
      } catch (error) {
        toast.error(
          "Failed to create project"
        );
      }
    };

  return (
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
      }}
    >
      <div
        style={{
          background:
            "white",
          width: "500px",
          padding: "40px",
          borderRadius:
            "30px",
        }}
      >
        <h1
          style={{
            marginBottom:
              "30px",
          }}
        >
          Create Project
        </h1>

        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) =>
            setTitle(
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
            height: "120px",
          }}
        />

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
            onClick={
              close
            }
            style={
              cancelButton
            }
          >
            Cancel
          </button>

          <button
            onClick={
              createProject
            }
            style={
              createButton
            }
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  border:
    "1px solid #E2E8F0",
  borderRadius: "16px",
  fontSize: "15px",
};

const cancelButton = {
  padding: "15px 25px",
  border:
    "1px solid #E2E8F0",
  background: "white",
  borderRadius: "14px",
  cursor: "pointer",
};

const createButton = {
  padding: "15px 25px",
  background: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
};

export default CreateProjectModal;