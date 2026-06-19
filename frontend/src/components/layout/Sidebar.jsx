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

function Sidebar() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Projects",
      icon: FolderKanban,
      path: "/projects",
    },
    {
      title: "Tasks",
      icon: CheckSquare,
      path: "/tasks",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      navigate("/login");
    };

  return (
    <div
      style={{
        width: "280px",
        background:
          "#ffffff",
        borderRight:
          "1px solid #E2E8F0",
        minHeight:
          "100vh",
        padding:
          "35px 25px",
        display: "flex",
        flexDirection:
          "column",
        justifyContent:
          "space-between",
        boxSizing:
          "border-box",
      }}
    >
      {/* TOP */}

      <div>
        {/* LOGO */}

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
                "#94A3B8",
              marginTop:
                "8px",
            }}
          >
            Project Workspace
          </p>
        </div>

        {/* MENU */}

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "12px",
          }}
        >
          {menu.map(
            (item) => {
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
                        ? "#EFF6FF"
                        : "transparent",

                    color:
                      active
                        ? "#2563EB"
                        : "#64748B",

                    fontWeight:
                      "600",

                    transition:
                      "all 0.3s ease",

                    boxShadow:
                      active
                        ? "0 8px 20px rgba(37,99,235,0.12)"
                        : "none",
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

      {/* BOTTOM */}

      <div>
        {/* USER CARD */}

        <div
          style={{
            background:
              "#F8FAFC",
            border:
              "1px solid #E2E8F0",
            borderRadius:
              "20px",
            padding:
              "18px",
            display: "flex",
            alignItems:
              "center",
            gap: "15px",
            marginBottom:
              "20px",
          }}
        >
          <div
            style={{
              width: "50px",
              height:
                "50px",
              borderRadius:
                "50%",
              background:
                "#2563EB",
              display: "flex",
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
              }}
            >
              DevTrack User
            </h4>

            <p
              style={{
                margin:
                  "4px 0 0",
                color:
                  "#64748B",
                fontSize:
                  "14px",
              }}
            >
              Welcome back 👋
            </p>
          </div>
        </div>

        {/* LOGOUT */}

        <button
          onClick={
            handleLogout
          }
          style={{
            width: "100%",
            background:
              "#ffffff",
            border:
              "1px solid #E2E8F0",
            padding:
              "16px",
            borderRadius:
              "16px",
            cursor:
              "pointer",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            gap: "12px",
            fontSize:
              "15px",
            fontWeight:
              "600",
            transition:
              "all 0.3s ease",
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