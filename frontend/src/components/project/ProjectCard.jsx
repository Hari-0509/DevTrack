import {
  Edit,
  Trash2,
  FolderKanban
} from "lucide-react";

function ProjectCard({
  project
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "30px",
        border:
          "1px solid #E2E8F0",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <FolderKanban
        size={35}
        color="#2563EB"
      />

      <h2
        style={{
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        {project.title}
      </h2>

      <p
        style={{
          color: "#64748B",
          marginBottom: "20px",
        }}
      >
        {project.description}
      </p>

      <span
        style={{
          background:
            "#DCFCE7",
          color: "#16A34A",
          padding:
            "8px 16px",
          borderRadius:
            "30px",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        In Progress
      </span>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Edit
          size={20}
          color="#2563EB"
          style={{
            cursor:
              "pointer",
          }}
        />

        <Trash2
          size={20}
          color="#EF4444"
          style={{
            cursor:
              "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default ProjectCard;