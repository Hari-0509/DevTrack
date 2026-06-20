import {
  Bell,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import {
  useState,
  useEffect,
  useContext,
} from "react";

import {
  ThemeContext,
} from "../../App";

import api from "../../services/api";

function Navbar() {
  const {
    darkMode,
    toggleTheme,
  } = useContext(
    ThemeContext
  );

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications =
    async () => {
      try {
        const response =
          await api.get(
            "/tasks"
          );

        const tasks =
          response.data;

        const today =
          new Date();

        const items = [];

        tasks.forEach(
          (task) => {
            if (
              task.status ===
              "Completed"
            ) {
              items.push({
                icon: "✅",
                message:
                  `${task.task_name} completed`,
              });
            }

            if (
              task.due_date
            ) {
              const due =
                new Date(
                  task.due_date
                );

              const diff =
                Math.ceil(
                  (due -
                    today) /
                    (
                      1000 *
                      60 *
                      60 *
                      24
                    )
                );

              if (
                diff ===
                1
              ) {
                items.push({
                  icon:
                    "⚠️",
                  message:
                    `${task.task_name} is due tomorrow`,
                });
              }

              if (
                diff <
                  0 &&
                task.status !==
                  "Completed"
              ) {
                items.push({
                  icon:
                    "🚨",
                  message:
                    `${task.task_name} is overdue`,
                });
              }
            }
          }
        );

        setNotifications(
          items
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  return (
    <div
      style={{
        height: "80px",
        background:
          darkMode
            ? "#1E293B"
            : "#ffffff",
        border:
          darkMode
            ? "1px solid #334155"
            : "1px solid #E2E8F0",
        borderRadius:
          "20px",
        padding:
          "0 30px",
        display:
          "flex",
        alignItems:
          "center",
        justifyContent:
          "space-between",
        transition:
          "0.3s",
      }}
    >
      <div>
        <h2
          style={{
            color:
              darkMode
                ? "#F8FAFC"
                : "#0F172A",
            margin: 0,
          }}
        >
          Good Morning 👋
        </h2>

        <p
          style={{
            color:
              darkMode
                ? "#CBD5E1"
                : "#64748B",
            marginTop:
              "8px",
          }}
        >
          Manage your projects
          smarter.
        </p>
      </div>

      <div
        style={{
          display:
            "flex",
          gap: "20px",
          alignItems:
            "center",
          color:
            darkMode
              ? "#CBD5E1"
              : "#0F172A",
        }}
      >
        <Search
          style={{
            cursor:
              "pointer",
          }}
        />

        {/* DARK MODE */}

        <div
          onClick={
            toggleTheme
          }
          style={{
            cursor:
              "pointer",
          }}
        >
          {darkMode ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </div>

        {/* NOTIFICATIONS */}

        <div
          style={{
            position:
              "relative",
          }}
        >
          <div
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            style={{
              cursor:
                "pointer",
              position:
                "relative",
            }}
          >
            <Bell
              size={22}
            />

            {notifications.length >
              0 && (
              <div
                style={{
                  position:
                    "absolute",
                  top:
                    "-8px",
                  right:
                    "-8px",
                  background:
                    "#EF4444",
                  color:
                    "white",
                  width:
                    "20px",
                  height:
                    "20px",
                  borderRadius:
                    "50%",
                  fontSize:
                    "12px",
                  display:
                    "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                  fontWeight:
                    "600",
                }}
              >
                {
                  notifications.length
                }
              </div>
            )}
          </div>

          {showNotifications && (
            <div
              style={{
                position:
                  "absolute",
                top:
                  "45px",
                right: 0,
                width:
                  "320px",
                background:
                  darkMode
                    ? "#1E293B"
                    : "white",
                border:
                  darkMode
                    ? "1px solid #334155"
                    : "1px solid #E2E8F0",
                borderRadius:
                  "20px",
                padding:
                  "20px",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.08)",
                zIndex:
                  1000,
                maxHeight:
                  "350px",
                overflowY:
                  "auto",
              }}
            >
              <h3
                style={{
                  color:
                    darkMode
                      ? "#F8FAFC"
                      : "#0F172A",
                }}
              >
                Notifications
              </h3>

              {notifications.length ===
              0 ? (
                <p
                  style={{
                    color:
                      darkMode
                        ? "#CBD5E1"
                        : "#64748B",
                  }}
                >
                  No notifications
                </p>
              ) : (
                notifications.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      style={{
                        padding:
                          "12px 0",
                        borderBottom:
                          darkMode
                            ? "1px solid #334155"
                            : "1px solid #F1F5F9",
                        color:
                          darkMode
                            ? "#CBD5E1"
                            : "#0F172A",
                      }}
                    >
                      {
                        item.icon
                      }{" "}
                      {
                        item.message
                      }
                    </div>
                  )
                )
              )}
            </div>
          )}
        </div>

        {/* PROFILE */}

        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius:
              "50%",
            background:
              "#2563EB",
            color: "white",
            display:
              "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            fontWeight:
              "700",
          }}
        >
          H
        </div>
      </div>
    </div>
  );
}

export default Navbar;