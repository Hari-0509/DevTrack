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

  const [
  invitations,
  setInvitations
] = useState([]);

  useEffect(() => {
  loadNotifications();
  loadInvitations();
}, []);

  const loadInvitations =
  async () => {
    try {
      const res =
        await api.get(
          "/invitations"
        );

      // console.log(
      //   "INVITATIONS",
      //   res.data
      // );

      setInvitations(
        res.data
      );
    } catch (err) {
      toast.error(
        "Failed to load invitations"
      );
    }
  };

  const acceptInvite =
  async (id) => {
    try {
      await api.post(
        `/invitations/${id}/accept`
      );

      loadInvitations();

      toast.success(
        "Invitation Accepted"
      );
    } catch (
      error
    ) {
      toast.error(
        "Failed to accept invitation"
      );
    }
  };

  const declineInvite =
  async (id) => {
    try {
      await api.post(
        `/invitations/${id}/decline`
      );

      loadInvitations();

      toast.success(
        "Invitation Declined"
      );
    } catch (
      error
    ) {
      
    }
  };

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
            // Completed
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

            // Due dates
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
                diff === 1
              ) {
                items.push({
                  icon:
                    "⚠️",
                  message:
                    `${task.task_name} is due tomorrow`,
                });
              }

              if (
                diff < 0 &&
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
        
      }
    };

  return (
    <div
      style={{
        height: "80px",
        background:
          darkMode
            ? "#1E293B"
            : "#FFFFFF",

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

        position:
          "relative",
      }}
    >
      {/* LEFT */}
      <div>
        <h2
          style={{
            margin: 0,
            color:
              darkMode
                ? "#F8FAFC"
                : "#0F172A",
          }}
        >
          Good Morning 👋
        </h2>

        <p
          style={{
            marginTop:
              "8px",

            color:
              darkMode
                ? "#CBD5E1"
                : "#64748B",
          }}
        >
          Manage your projects
          smarter.
        </p>
      </div>

      {/* RIGHT */}
      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap: "25px",

          color:
            darkMode
              ? "#CBD5E1"
              : "#0F172A",
        }}
      >
        {/* SEARCH */}
        <Search
          size={22}
          style={{
            cursor:
              "pointer",
          }}
        />

        {/* THEME */}
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
            <Sun
              size={22}
            />
          ) : (
            <Moon
              size={22}
            />
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

                  width:
                    "20px",

                  height:
                    "20px",

                  borderRadius:
                    "50%",

                  background:
                    "#EF4444",

                  color:
                    "white",

                  fontSize:
                    "12px",

                  fontWeight:
                    "600",

                  display:
                    "flex",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",
                }}
              >
                {notifications.length >
                9
                  ? "9+"
                  : notifications.length}
              </div>
            )}
          </div>

          {/* DROPDOWN */}
          {showNotifications && (
            <div
              style={{
                position:
                  "absolute",

                top:
                  "45px",

                right: 0,

                width:
                  "340px",

                background:
                  darkMode
                    ? "#1E293B"
                    : "#FFFFFF",

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

                maxHeight:
                  "350px",

                overflowY:
                  "auto",

                zIndex:
                  1000,
              }}
            >
              <h3
                style={{
                  marginTop: 0,

                  color:
                    darkMode
                      ? "#F8FAFC"
                      : "#0F172A",
                }}
              >
                Notifications
              </h3>

              {notifications.length === 0 &&
 invitations.length === 0 ? (
                <div
                  style={{
                    textAlign:
                      "center",

                    padding:
                      "40px 0",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "40px",
                    }}
                  >
                    🔔
                  </div>

                  <p
                    style={{
                      color:
                        darkMode
                          ? "#CBD5E1"
                          : "#64748B",
                    }}
                  >
                    You're all
                    caught up!
                  </p>
                </div>
            ) : (
  <>
    {invitations.map(
      (invite) => (
        <div
          key={invite.id}
          style={{
            padding: "15px",
            borderBottom:
              darkMode
                ? "1px solid #334155"
                : "1px solid #F1F5F9",
          }}
        >
          <h4
            style={{
              margin: 0,
              color: darkMode
                ? "#F8FAFC"
                : "#0F172A",
            }}
          >
            📩 Project Invitation
          </h4>

          <p
            style={{
              color: darkMode
                ? "#CBD5E1"
                : "#64748B",
            }}
          >
            Project ID:
            {" "}
            {invite.project_id}
          </p>

          <p
            style={{
              color: darkMode
                ? "#CBD5E1"
                : "#64748B",
            }}
          >
            Role:
            {" "}
            {invite.role}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={() =>
                acceptInvite(
                  invite.id
                )
              }
            >
              Accept
            </button>

            <button
              onClick={() =>
                declineInvite(
                  invite.id
                )
              }
            >
              Decline
            </button>
          </div>
        </div>
      )
    )}

    {notifications.map(
      (
        item,
        index
      ) => (
        <div
          key={index}
          style={{
            padding: "15px",
            borderBottom:
              darkMode
                ? "1px solid #334155"
                : "1px solid #F1F5F9",
            color:
              darkMode
                ? "#CBD5E1"
                : "#0F172A",
            cursor:
              "pointer",
            borderRadius:
              "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems:
                "center",
            }}
          >
            <span
              style={{
                fontSize:
                  "20px",
              }}
            >
              {item.icon}
            </span>

            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight:
                    "600",
                }}
              >
                {
                  item.message
                }
              </p>

              <small
                style={{
                  color:
                    darkMode
                      ? "#94A3B8"
                      : "#64748B",
                }}
              >
                DevTrack
                Notification
              </small>
            </div>
          </div>
        </div>
      )
    )}
  </>
)} 
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          style={{
            width: "45px",
            height:
              "45px",

            borderRadius:
              "50%",

            background:
              "#2563EB",

            color:
              "white",

            display:
              "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            fontWeight:
              "700",

            fontSize:
              "18px",

            cursor:
              "pointer",
          }}
        >
          H
        </div>
      </div>
    </div>
  );
}

export default Navbar;