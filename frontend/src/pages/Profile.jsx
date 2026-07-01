import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  ThemeContext,
} from "../App";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Profile() {
  const {
    darkMode,
  } = useContext(
    ThemeContext
  );

  const [
    profile,
    setProfile,
  ] = useState(null);

  const [
    showEdit,
    setShowEdit,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
  role,
  setRole,
] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
  if (profile) {
    setUsername(
      profile.name
    );

    setEmail(
      profile.email
    );

    setRole(
      profile.role
    );
  }
}, [profile]);

  const loadProfile =
    async () => {
      try {
        const res =
          await api.get(
            "/profile"
          );

        setProfile(
          res.data
        );
      } catch (error) {
        
      }
    };

  if (!profile) {
    return (
      <MainLayout>
        <h2
          style={{
            color:
              darkMode
                ? "white"
                : "#0F172A",
          }}
        >
          Loading...
        </h2>
      </MainLayout>
    );
  }

  const productivity =
  profile.total_tasks > 0
    ? Math.round(
        (
          profile.completed /
          profile.total_tasks
        ) * 100
      )
    : 0;

  return (
    <MainLayout>
      <h1
        style={{
          fontSize: "48px",
          marginBottom:
            "40px",
          color:
            darkMode
              ? "white"
              : "#0F172A",
        }}
      >
        Profile
      </h1>

      <div
        style={{
          background:
            darkMode
              ? "#1E293B"
              : "white",
          borderRadius:
            "30px",
          padding: "50px",
          maxWidth:
            "900px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems:
              "center",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
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
              fontSize:
                "45px",
              fontWeight:
                "700",
            }}
          >
            {profile.name?.[0] ||
              "U"}
          </div>

          <div>
            <h2
              style={{
                color:
                  darkMode
                    ? "white"
                    : "#0F172A",
              }}
            >
              {profile.name}
            </h2>

            <p
              style={{
                color:
                  darkMode
                    ? "#CBD5E1"
                    : "#64748B",
              }}
            >
              {profile.email}
            </p>

            <p
              style={{
                color:
                  darkMode
                    ? "#CBD5E1"
                    : "#64748B",
              }}
            >
              {profile.role}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
            marginTop:
              "50px",
          }}
        >
          <StatCard
            darkMode={
              darkMode
            }
            title="Projects"
            value={
              profile.projects
            }
            color="#2563EB"
          />

          <StatCard
            darkMode={
              darkMode
            }
            title="Completed"
            value={
              profile.completed
            }
            color="#16A34A"
          />
          <StatCard
  darkMode={
    darkMode
  }
  title="Tasks"
  value={
    profile.total_tasks
  }
  color="#7C3AED"
/>
          <StatCard
            darkMode={
              darkMode
            }
            title="Productivity"
            value={`${productivity}%`}
            color="#F59E0B"
          />
        </div>

        {/* Progress Bar */}
        <div
          style={{
            marginTop:
              "40px",
          }}
        >
          <p
            style={{
              color:
                darkMode
                  ? "white"
                  : "#0F172A",
              marginBottom:
                "15px",
            }}
          >
            Productivity
            Score
          </p>

          <div
            style={{
              width: "100%",
              height: "12px",
              background:
                "#CBD5E1",
              borderRadius:
                "10px",
              overflow:
                "hidden",
            }}
          >
            <div
              style={{
                width:
                  `${productivity}%`,
                height:
                  "100%",
                background:
  productivity >= 80
    ? "#16A34A"
    : productivity >= 50
    ? "#F59E0B"
    : "#DC2626",
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop:
              "40px",
            flexWrap:
              "wrap",
          }}
        >
          <button
            onClick={() =>
              setShowEdit(
                true
              )
            }
            style={buttonStyle(
              "#2563EB"
            )}
          >
            Edit Profile
          </button>

          <button
            onClick={() =>
              setShowPassword(
                true
              )
            }
            style={buttonStyle(
              "#7C3AED"
            )}
          >
            Change Password
          </button>

          <button
            onClick={() => {
              localStorage.removeItem(
                "token"
              );
              window.location =
                "/login";
            }}
            style={buttonStyle(
              "#DC2626"
            )}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div style={overlay}>
          <div
            style={modal(
              darkMode
            )}
          >
            <h2>
              Edit Profile
            </h2>

            <input
              value={
                username
              }
              onChange={(
                e
              ) =>
                setUsername(
                  e.target
                    .value
                )
              }
              placeholder="Username"
              style={input}
            />

            <input
              value={
                email
              }
              onChange={(
                e
              ) =>
                setEmail(
                  e.target
                    .value
                )
              }
              placeholder="Email"
              style={input}
            />
           <select
  value={role}
  onChange={(e) =>
    setRole(
      e.target.value
    )
  }
  style={input}
>
  <option>
    Student
  </option>

  <option>
    Software Engineer
  </option>

  <option>
    Business Analyst
  </option>

  <option>
    DevOps Engineer
  </option>

  <option>
    Data Scientist
  </option>

  <option>
    Intern
  </option>
</select>

            <div
              style={{
                display:
                  "flex",
                gap: "15px",
                marginTop:
                  "20px",
              }}
            >
              <button
  onClick={
    async () => {
      try {
        await api.put(
          "/profile",
          {
            username,
            email,
            role,
          }
        );

        setProfile({
          ...profile,
          name:
            username,
          email,
          role,
        });

        setShowEdit(
          false
        );

        toast.success(
          "Profile Updated Successfully"
        );
      } catch (
        error
      ) {
        
        toast.error(
          "Unable to update profile"
        );
      }
    }
  }
  style={buttonStyle(
    "#2563EB"
  )}
>
  Save
</button>

              <button
                onClick={() =>
                  setShowEdit(
                    false
                  )
                }
                style={buttonStyle(
                  "#64748B"
                )}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPassword && (
        <div style={overlay}>
          <div
            style={modal(
              darkMode
            )}
          >
            <h2>
              Change Password
            </h2>

            <input
              type="password"
              value={
                currentPassword
              }
              onChange={(
                e
              ) =>
                setCurrentPassword(
                  e.target
                    .value
                )
              }
              placeholder="Current Password"
              style={input}
            />

            <input
              type="password"
              value={
                newPassword
              }
              onChange={(
                e
              ) =>
                setNewPassword(
                  e.target
                    .value
                )
              }
              placeholder="New Password"
              style={input}
            />

            <div
              style={{
                display:
                  "flex",
                gap: "15px",
                marginTop:
                  "20px",
              }}
            >
              <button
  onClick={
    async () => {

      if (
        !currentPassword ||
        !newPassword
      ) {
        toast.error(
          "Please fill all fields"
        );
        return;
      }

      try {
        const res =
          await api.put(
            "/profile/password",
            {
              currentPassword,
              newPassword,
            }
          );

        toast.success(
          res.data.message
        );

        setCurrentPassword(
          ""
        );

        setNewPassword(
          ""
        );

        setShowPassword(
          false
        );

      } catch (
        error
      ) {
        

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Unable to update password"
        );
      }
    }
  }
  style={buttonStyle(
    "#7C3AED"
  )}
>
  Update
</button>

              <button
                onClick={() =>
                  setShowPassword(
                    false
                  )
                }
                style={buttonStyle(
                  "#64748B"
                )}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

function StatCard({
  darkMode,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background:
          darkMode
            ? "#0F172A"
            : "#F8FAFC",
        padding: "25px",
        borderRadius:
          "20px",
      }}
    >
      <h3
        style={{
          color:
            darkMode
              ? "white"
              : "#0F172A",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color,
          marginTop:
            "15px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

function buttonStyle(
  background
) {
  return {
    background,
    color: "white",
    border: "none",
    padding:
      "15px 30px",
    borderRadius:
      "14px",
    cursor: "pointer",
    fontSize:
      "15px",
    fontWeight:
      "600",
  };
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent:
    "center",
  alignItems:
    "center",
};

const modal = (
  darkMode
) => ({
  background:
    darkMode
      ? "#1E293B"
      : "white",
  padding: "40px",
  borderRadius:
    "20px",
  width: "450px",
});

const input = {
  width: "100%",
  padding: "15px",
  border:
    "1px solid #CBD5E1",
  borderRadius:
    "12px",
  marginTop: "20px",
};

export default Profile;
