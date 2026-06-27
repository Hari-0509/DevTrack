import {
  useContext
} from "react";

import MainLayout from
  "../layouts/MainLayout";

import {
  ThemeContext
} from "../App";

function Settings() {

  const {
    darkMode,
    toggleTheme,
  } = useContext(
    ThemeContext
  );

  const cardStyle = {
    background:
      darkMode
        ? "#1E293B"
        : "#FFFFFF",

    border:
      darkMode
        ? "1px solid #334155"
        : "1px solid #E2E8F0",

    borderRadius:
      "24px",

    padding:
      "30px",

    marginBottom:
      "25px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)",
  };

  const titleStyle = {
    color:
      darkMode
        ? "#F8FAFC"
        : "#0F172A",

    marginBottom:
      "20px",
  };

  return (
    <MainLayout>

      <h1
        style={{
          color:
            darkMode
              ? "#F8FAFC"
              : "#0F172A",

          marginBottom:
            "40px",
        }}
      >
        ⚙️ Settings
      </h1>

      {/* Appearance */}

      <div
        style={cardStyle}
      >
        <h2
          style={
            titleStyle
          }
        >
          Appearance
        </h2>

        <button
          onClick={
            toggleTheme
          }
          style={{
            padding:
              "14px 24px",

            border:
              "none",

            borderRadius:
              "12px",

            cursor:
              "pointer",

            background:
              "#2563EB",

            color:
              "white",

            fontWeight:
              "600",
          }}
        >
          {
            darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"
          }
        </button>
      </div>

      {/* Notifications */}

      <div
        style={cardStyle}
      >
        <h2
          style={
            titleStyle
          }
        >
          Notifications
        </h2>

        <p
          style={{
            color:
              darkMode
                ? "#CBD5E1"
                : "#64748B",
          }}
        >
          Project invitations,
          task assignments and
          activity updates are
          enabled.
        </p>
      </div>

      {/* Account */}

      <div
        style={cardStyle}
      >
        <h2
          style={
            titleStyle
          }
        >
          Account
        </h2>

        <button
          onClick={() => {
            localStorage.removeItem(
              "token"
            );

            window.location.href =
              "/login";
          }}
          style={{
            padding:
              "14px 24px",

            border:
              "none",

            borderRadius:
              "12px",

            cursor:
              "pointer",

            background:
              "#DC2626",

            color:
              "white",

            fontWeight:
              "600",
          }}
        >
          Logout
        </button>
      </div>

    </MainLayout>
  );
}

export default Settings;