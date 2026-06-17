import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

import {
  Link,
  useLocation
} from "react-router-dom";

function Sidebar() {
  const location =
    useLocation();

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/"
    },
    {
      title: "Projects",
      icon: FolderKanban,
      path: "/projects"
    },
    {
      title: "Tasks",
      icon: CheckSquare,
      path: "/tasks"
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <div
      style={{
        width: "280px",
        background: "#ffffff",
        borderRight:
          "1px solid #e2e8f0",
        minHeight: "100vh",
        padding: "40px 25px"
      }}
    >
      <h1
        style={{
          color: "#2563EB",
          marginBottom: "50px"
        }}
      >
        DevTrack
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "10px"
        }}
      >
        {menu.map((item) => {

          const Icon =
            item.icon;

          const active =
            location.pathname ===
            item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "15px",
                padding:
                  "15px 20px",
                borderRadius:
                  "14px",
                background:
                  active
                    ? "#EFF6FF"
                    : "transparent",
                color:
                  active
                    ? "#2563EB"
                    : "#64748B",
                fontWeight: 600
              }}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "80px"
        }}
      >
        <button
          style={{
            width: "100%",
            background:
              "#ffffff",
            border:
              "1px solid #e2e8f0",
            padding: "15px",
            borderRadius:
              "14px",
            cursor: "pointer",
            display: "flex",
            gap: "15px",
            alignItems:
              "center"
          }}
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;