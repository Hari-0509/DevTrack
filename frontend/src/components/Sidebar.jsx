import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}
    >
      <h2>DevTrack</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Tasks
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;