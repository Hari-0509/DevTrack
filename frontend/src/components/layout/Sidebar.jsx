import {
  FaChartPie,
  FaFolder,
  FaTasks,
  FaSignOutAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        background: "#1e293b",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      <h1
        style={{
          marginBottom: "50px"
        }}
      >
        DevTrack
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px"
        }}
      >
        <Link to="/">
          <FaChartPie /> Dashboard
        </Link>

        <Link to="/projects">
          <FaFolder /> Projects
        </Link>

        <Link to="/tasks">
          <FaTasks /> Tasks
        </Link>

        <Link to="/login">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;