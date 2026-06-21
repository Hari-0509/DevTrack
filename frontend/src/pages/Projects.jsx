import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { FolderKanban, Plus } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
  showInvite,
  setShowInvite
] = useState(false);

const [
  selectedProject,
  setSelectedProject
] = useState(null);

const [
  inviteEmail,
  setInviteEmail
] = useState("");

const [
  inviteRole,
  setInviteRole
] = useState("Member");


  useEffect(() => {
    loadProjects();
  }, []);

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

        setTitle("");
        setDescription("");
        setShowModal(false);

        loadProjects();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredProjects =
    projects.filter(
      (project) =>
        project.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  
  const sendInvite =
  async () => {
    try {
      const res =
        await api.post(
          `/projects/${selectedProject}/invite`,
          {
            email:
              inviteEmail,
            role:
              inviteRole,
          }
        );

      alert(
        res.data.message
      );

      setShowInvite(
        false
      );

      setInviteEmail(
        ""
      );

      setInviteRole(
        "Member"
      );

    } catch (
      error
    ) {
      console.log(
        error
      );

      alert(
        error.response
          ?.data
          ?.message ||
        "Unable to send invitation"
      );
    }
  };

  return (
    <MainLayout>
      {/* Header */}

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
            Projects
          </h1>

          <p
            style={{
              color:
                "#64748B",
              marginTop:
                "10px",
            }}
          >
            Manage your
            projects
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
            display: "flex",
            gap: "10px",
            alignItems:
              "center",
            cursor:
              "pointer",
            fontWeight:
              "600",
          }}
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Search */}

      <input
        placeholder="Search Projects..."
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
            "40px",
          fontSize: "15px",
        }}
      />

      {/* Project Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(350px,1fr))",
          gap: "25px",
        }}
      >
        {filteredProjects.map(
          (project) => (
            <div
              key={project.id}
              style={{
                background:
                  "white",
                border:
                  "1px solid #E2E8F0",
                borderRadius:
                  "24px",
                padding:
                  "30px",
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
    marginBottom: "10px",
  }}
>
  {project.title}
</h2>

<p
  style={{
    color: "#94A3B8",
    fontSize: "14px",
    marginBottom: "15px",
  }}
>
  {project.total_tasks} Tasks
</p>

<p
  style={{
    color: "#64748B",
    lineHeight: "1.7",
    marginBottom: "25px",
  }}
>
  {project.description}
</p>

{/* Progress */}

<div
  style={{
    marginBottom: "20px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent:
        "space-between",
      marginBottom: "10px",
    }}
  >
    <span
      style={{
        fontWeight: "600",
      }}
    >
      Progress
    </span>

    <span
      style={{
        fontWeight: "600",
        color: "#2563EB",
      }}
    >
      {project.progress}%
    </span>
  </div>

  <div
    style={{
      background: "#E2E8F0",
      height: "12px",
      borderRadius: "30px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width:
          `${project.progress}%`,
        height: "100%",
        background:
          project.progress ===
          100
            ? "#16A34A"
            : "#2563EB",
        borderRadius:
          "30px",
        transition:
          "0.5s ease",
      }}
    />
  </div>
</div>

<p
  style={{
    color: "#64748B",
    marginBottom: "20px",
    fontSize: "14px",
  }}
>
  {project.completed_tasks}
  /
  {project.total_tasks}
  {" "}
  Tasks Completed
</p>

<span
  style={{
    background:
      project.progress ===
      100
        ? "#DCFCE7"
        : "#DBEAFE",

    color:
      project.progress ===
      100
        ? "#16A34A"
        : "#2563EB",

    padding:
      "8px 18px",

    borderRadius:
      "30px",

    fontSize: "14px",

    fontWeight: "600",
  }}
>
  {project.progress ===
  100
    ? "Completed"
    : "In Progress"}
</span>
<button
  onClick={() => {
    setSelectedProject(
      project.id
    );

    setShowInvite(
      true
    );
  }}
  style={{
    marginTop:
      "20px",

    width:
      "100%",

    padding:
      "12px",

    background:
      "#2563EB",

    color:
      "white",

    border:
      "none",

    borderRadius:
      "12px",

    cursor:
      "pointer",

    fontWeight:
      "600",
  }}
>
  + Invite Member
</button>
            </div>
          )
        )}
      </div>

      {/* Modal */}

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
          }}
        >
          <div
            style={{
              width: "500px",
              background:
                "white",
              padding:
                "40px",
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
              Create New
              Project
            </h1>

            <input
              placeholder="Project Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target
                    .value
                )
              }
              style={
                inputStyle
              }
            />

            <textarea
              placeholder="Description"
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target
                    .value
                )
              }
              style={{
                ...inputStyle,
                height:
                  "120px",
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
                    "1px solid #E2E8F0",
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
                  createProject
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
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {
  showInvite && (
    <div
      style={{
        position:
          "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height:
          "100%",
        background:
          "rgba(0,0,0,0.5)",
        display:
          "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        zIndex:
          999,
      }}
    >
      <div
        style={{
          width:
            "420px",
          background:
            "white",
          padding:
            "30px",
          borderRadius:
            "20px",
        }}
      >
        <h2>
          Invite Member
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={
            inviteEmail
          }
          onChange={(
            e
          ) =>
            setInviteEmail(
              e.target
                .value
            )
          }
          style={{
            width:
              "100%",
            padding:
              "14px",
            marginTop:
              "20px",
            border:
              "1px solid #CBD5E1",
            borderRadius:
              "12px",
          }}
        />

        <select
          value={
            inviteRole
          }
          onChange={(
            e
          ) =>
            setInviteRole(
              e.target
                .value
            )
          }
          style={{
            width:
              "100%",
            padding:
              "14px",
            marginTop:
              "20px",
            border:
              "1px solid #CBD5E1",
            borderRadius:
              "12px",
          }}
        >
          <option>
            Member
          </option>

          <option>
            Admin
          </option>
        </select>

        <div
          style={{
            display:
              "flex",
            gap:
              "15px",
            marginTop:
              "30px",
          }}
        >
          <button
            onClick={
              sendInvite
            }
            style={{
              flex: 1,
              padding:
                "14px",
              background:
                "#2563EB",
              color:
                "white",
              border:
                "none",
              borderRadius:
                "12px",
              cursor:
                "pointer",
            }}
          >
            Send Invite
          </button>

          <button
            onClick={() =>
              setShowInvite(
                false
              )
            }
            style={{
              flex: 1,
              padding:
                "14px",
              background:
                "#E2E8F0",
              border:
                "none",
              borderRadius:
                "12px",
              cursor:
                "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
    </MainLayout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  border: "1px solid #E2E8F0",
  borderRadius: "16px",
  fontSize: "15px",
  outline: "none",
};

export default Projects;