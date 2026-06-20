import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  User,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  ThemeContext,
} from "../../App";

function Sidebar() {
  const {
    darkMode,
  } = useContext(
    ThemeContext
  );

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const menu = [
    {
      title:
        "Dashboard",
      icon:
        LayoutDashboard,
      path: "/",
    },
    {
      title:
        "Projects",
      icon:
        FolderKanban,
      path:
        "/projects",
    },
    {
      title:
        "Tasks",
      icon:
        CheckSquare,
      path:
        "/tasks",
    },
    {
      title:
        "Analytics",
      icon:
        BarChart3,
      path:
        "/analytics",
    },
    {
      title:
        "Settings",
      icon:
        Settings,
      path:
        "/settings",
    },
  ];

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      navigate(
        "/login"
      );
    };

  return (
    <div
      style={{
        width: "280px",
        background:
          darkMode
            ? "#1E293B"
            : "#ffffff",
        borderRight:
          darkMode
            ? "1px solid #334155"
            : "1px solid #E2E8F0",
        minHeight:
          "100vh",
        padding:
          "35px 25px",
        display:
          "flex",
        flexDirection:
          "column",
        justifyContent:
          "space-between",
      }}
    >
      <div>
        <div
          style={{
            marginBottom:
              "50px",
          }}
        >
          <h1
            style={{
              color:
                "#2563EB",
              fontSize:
                "32px",
              fontWeight:
                "800",
              margin: 0,
            }}
          >
            DevTrack
          </h1>

          <p
            style={{
              color:
                darkMode
                  ? "#CBD5E1"
                  : "#94A3B8",
            }}
          >
            Project Workspace
          </p>
        </div>

        <div
          style={{
            display:
              "flex",
            flexDirection:
              "column",
            gap: "12px",
          }}
        >
          {menu.map(
            (
              item
            ) => {
              const Icon =
                item.icon;

              const active =
                location.pathname ===
                item.path;

              return (
                <Link
                  key={
                    item.path
                  }
                  to={
                    item.path
                  }
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "15px",
                    padding:
                      "15px 20px",
                    borderRadius:
                      "16px",
                    textDecoration:
                      "none",
                    background:
                      active
                        ? "#2563EB"
                        : "transparent",
                    color:
                      active
                        ? "white"
                        : darkMode
                        ? "#CBD5E1"
                        : "#64748B",
                    fontWeight:
                      "600",
                  }}
                >
                  <Icon
                    size={
                      20
                    }
                  />
                  {
                    item.title
                  }
                </Link>
              );
            }
          )}
        </div>
      </div>

      <div>
        <div
          style={{
            background:
              darkMode
                ? "#334155"
                : "#F8FAFC",
            border:
              darkMode
                ? "1px solid #475569"
                : "1px solid #E2E8F0",
            borderRadius:
              "20px",
            padding:
              "18px",
            display:
              "flex",
            gap: "15px",
            marginBottom:
              "20px",
            alignItems:
              "center",
          }}
        >
          <div
            style={{
              width:
                "50px",
              height:
                "50px",
              borderRadius:
                "50%",
              background:
                "#2563EB",
              display:
                "flex",
              justifyContent:
                "center",
              alignItems:
                "center",
              color:
                "white",
            }}
          >
            <User
              size={24}
            />
          </div>

          <div>
            <h4
              style={{
                margin: 0,
                color:
                  darkMode
                    ? "#F8FAFC"
                    : "#0F172A",
              }}
            >
              DevTrack User
            </h4>

            <p
              style={{
                margin:
                  "4px 0 0",
                color:
                  darkMode
                    ? "#CBD5E1"
                    : "#64748B",
              }}
            >
              Welcome back 👋
            </p>
          </div>
        </div>

        <button
          onClick={
            handleLogout
          }
          style={{
            width: "100%",
            background:
              darkMode
                ? "#334155"
                : "#ffffff",
            color:
              darkMode
                ? "#F8FAFC"
                : "#0F172A",
            border:
              darkMode
                ? "1px solid #475569"
                : "1px solid #E2E8F0",
            padding:
              "16px",
            borderRadius:
              "16px",
            cursor:
              "pointer",
            display:
              "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            gap: "12px",
            fontWeight:
              "600",
          }}
        >
          <LogOut
            size={20}
          />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;