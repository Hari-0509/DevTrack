import {
  useState,
  useEffect,
  useContext,
} from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  ThemeContext,
} from "../App";
import toast from "react-hot-toast";

function Settings() {

  const {
    darkMode,
    toggleTheme,
  } = useContext(
    ThemeContext
  );

  const [profile, setProfile] =
    useState({
      username: "",
      email: "",
      role: "",
    });

  const [password, setPassword] =
    useState({
      currentPassword: "",
      newPassword: "",
    });

  const [notificationSettings,
    setNotificationSettings] =
    useState({
      email: true,
      invitation: true,
      assignment: true,
      activity: true,
    });

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {
    loadProfile();

    const saved =
      localStorage.getItem(
        "notificationSettings"
      );

    if (saved) {
      setNotificationSettings(
        JSON.parse(saved)
      );
    }

  }, []);

  async function loadProfile() {

    try {

      const res =
        await api.get(
          "/profile"
        );

      setProfile({
        username:
          res.data.name,

        email:
          res.data.email,

        role:
          res.data.role,
      });

    }
    catch (err) {

      console.log(err);

    }

  }

  async function saveProfile() {

    setLoading(true);

    try {

      await api.put(
        "/profile",
        profile
      );

      toast.success(
  "Profile updated successfully"
);

    }
    catch {

      toast.error(
  "Unable to update profile"
);
    }

    setLoading(false);

  }

  async function changePassword() {

    if (
      !password.currentPassword ||
      !password.newPassword
    ) {
      alert(
        "Fill both password fields"
      );
      return;
    }

    try {

      await api.put(
        "/profile/password",
        password
      );

      toast.success(
  "Password changed successfully"
);

      setPassword({
        currentPassword: "",
        newPassword: "",
      });

    }
    catch {

      toast.error(
        "Password change failed"
      );

    }

  }

  function toggleNotification(
    key
  ) {

    const updated = {
      ...notificationSettings,
      [key]:
        !notificationSettings[key],
    };

    setNotificationSettings(
      updated
    );

    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(updated)
    );

  }

  const pageStyle = {

    maxWidth:
      "1100px",

    margin:
      "0 auto",

    padding:
      "20px",

  };

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
      "22px",

    padding:
      "28px",

    marginBottom:
      "30px",

    boxShadow:
      darkMode
        ? "0 10px 25px rgba(0,0,0,.35)"
        : "0 10px 25px rgba(15,23,42,.08)",

  };

  const titleStyle = {

    fontSize:
      "18px",

    fontWeight:
      "700",

    marginBottom:
      "24px",

    color:
      darkMode
        ? "#F8FAFC"
        : "#0F172A",

  };

  const labelStyle = {

    display:
      "block",

    marginBottom:
      "8px",

    fontWeight:
      "600",

    color:
      darkMode
        ? "#CBD5E1"
        : "#475569",

  };

  const inputStyle = {

    width:
      "100%",

    padding:
      "14px 16px",

    borderRadius:
      "12px",

    border:
      darkMode
        ? "1px solid #475569"
        : "1px solid #CBD5E1",

    background:
      darkMode
        ? "#0F172A"
        : "#FFFFFF",

    color:
      darkMode
        ? "#F8FAFC"
        : "#0F172A",

    fontSize:
      "15px",

    outline:
      "none",

    marginBottom:
      "20px",

    boxSizing:
      "border-box",

  };

  const buttonStyle = {

    padding:
      "14px 26px",

    border:
      "none",

    borderRadius:
      "12px",

    background:
      "linear-gradient(135deg,#2563EB,#4F46E5)",

    color:
      "#FFFFFF",

    fontWeight:
      "700",

    cursor:
      "pointer",

    transition:
      ".3s",

  };

  return (

    <MainLayout>

      <div
        style={
          pageStyle
        }
      >

        <h1
          style={{
            color:
              darkMode
                ? "#F8FAFC"
                : "#0F172A",

            marginBottom:
              "35px",

            fontSize:
              "34px",

            fontWeight:
              "700",
          }}
        >
          ⚙️ Settings
        </h1>

                {/* ================= ACCOUNT ================= */}

        <div style={cardStyle}>

          <h2 style={titleStyle}>
            👤 Account Information
          </h2>

          <label style={labelStyle}>
            Username
          </label>

          <input
            style={inputStyle}
            value={profile.username}
            onChange={(e) =>
              setProfile({
                ...profile,
                username: e.target.value,
              })
            }
          />

          <label style={labelStyle}>
            Email
          </label>

          <input
            style={inputStyle}
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
          />

          <label style={labelStyle}>
            Role
          </label>

          <input
            style={{
              ...inputStyle,
              background:
                darkMode
                  ? "#1E293B"
                  : "#F8FAFC",
            }}
            value={profile.role}
            disabled
          />

          <button
            style={buttonStyle}
            onClick={saveProfile}
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>


        {/* ================= SECURITY ================= */}

        <div style={cardStyle}>

          <h2 style={titleStyle}>
            🔒 Security
          </h2>

          <label style={labelStyle}>
            Current Password
          </label>

          <input
            type="password"
            style={inputStyle}
            value={
              password.currentPassword
            }
            onChange={(e) =>
              setPassword({
                ...password,
                currentPassword:
                  e.target.value,
              })
            }
          />

          <label style={labelStyle}>
            New Password
          </label>

          <input
            type="password"
            style={inputStyle}
            value={
              password.newPassword
            }
            onChange={(e) =>
              setPassword({
                ...password,
                newPassword:
                  e.target.value,
              })
            }
          />

          <button
            style={buttonStyle}
            onClick={changePassword}
          >
            Change Password
          </button>

        </div>


        {/* ================= APPEARANCE ================= */}

        <div style={cardStyle}>

          <h2 style={titleStyle}>
            🎨 Appearance
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
            }}
          >

            <div>

              <h3
                style={{
                  color:
                    darkMode
                      ? "#F8FAFC"
                      : "#0F172A",
                }}
              >
                Dark Mode
              </h3>

              <p
                style={{
                  color:
                    darkMode
                      ? "#94A3B8"
                      : "#64748B",
                }}
              >
                Switch between light
                and dark theme.
              </p>

            </div>

            <button
              style={buttonStyle}
              onClick={
                toggleTheme
              }
            >
              {darkMode
                ? "☀️ Light"
                : "🌙 Dark"}
            </button>

          </div>

        </div>


        {/* ================= NOTIFICATIONS ================= */}

        <div style={cardStyle}>

          <h2 style={titleStyle}>
            🔔 Notifications
          </h2>

          {[
            [
              "Email Notifications",
              "email",
            ],
            [
              "Project Invitations",
              "invitation",
            ],
            [
              "Task Assignments",
              "assignment",
            ],
            [
              "Activity Feed",
              "activity",
            ],
          ].map(
            ([title, key]) => (

              <div
                key={key}
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  marginBottom:
                    "20px",
                }}
              >

                <span
                  style={{
                    color:
                      darkMode
                        ? "#F8FAFC"
                        : "#0F172A",

                    fontWeight:
                      "600",
                  }}
                >
                  {title}
                </span>

                <input
                  type="checkbox"
                  checked={
                    notificationSettings[
                      key
                    ]
                  }
                  onChange={() =>
                    toggleNotification(
                      key
                    )
                  }
                />

              </div>

            )
          )}

        </div>

        {/* ================= ACCOUNT ================= */}

        <div style={cardStyle}>

          <h2 style={titleStyle}>
            🚪 Account
          </h2>

          <button
            style={{
              ...buttonStyle,
              background:
                "#DC2626",
            }}
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              window.location.href =
                "/login";

            }}
          >
            Logout
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default Settings;