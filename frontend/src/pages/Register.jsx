import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleRegister =
    async () => {
      if (
        password !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        await api.post(
          "/register",
          {
            username,
            email,
            password,
          }
        );

        alert(
          "Account created successfully"
        );

        navigate("/login");
      } catch (error) {
        alert(
          "Registration failed"
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#F8FAFC",
      }}
    >
      {/* LEFT PANEL */}

      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg,#7C3AED,#2563EB)",
          color: "white",
          display: "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          position: "relative",
          overflow: "hidden",
          padding: "60px",
        }}
      >
        <div
          style={{
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "rgba(255,255,255,0.10)",
            position:
              "absolute",
            top: "-120px",
            right: "-120px",
            animation:
              "float 6s infinite",
          }}
        />

        <div
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "rgba(255,255,255,0.08)",
            position:
              "absolute",
            bottom:
              "-100px",
            left: "-100px",
            animation:
              "float 7s infinite",
          }}
        />

        <div
          style={{
            maxWidth: "520px",
            zIndex: 1,
            animation:
              "fadeIn 1s ease",
          }}
        >
          <div
            style={{
              display:
                "inline-block",
              background:
                "rgba(255,255,255,0.15)",
              padding:
                "10px 20px",
              borderRadius:
                "30px",
              marginBottom:
                "30px",
            }}
          >
            ✨ Join DevTrack Today
          </div>

          <h1
            style={{
              fontSize:
                "72px",
              fontWeight:
                "800",
              marginBottom:
                "30px",
            }}
          >
            DevTrack
          </h1>

          <h2
            style={{
              fontSize:
                "44px",
              lineHeight:
                "1.3",
              marginBottom:
                "30px",
            }}
          >
            Turn Goals
            <br />
            Into Results.
          </h2>

          <p
            style={{
              fontSize:
                "20px",
              lineHeight:
                "1.8",
              opacity: 0.9,
            }}
          >
            Join thousands of
            developers and teams
            who plan,
            collaborate and
            deliver faster with
            a modern productivity
            workspace.
          </p>

          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop:
                "60px",
            }}
          >
            <div>
              <h1>500+</h1>
              <p>
                Active Teams
              </p>
            </div>

            <div>
              <h1>25K+</h1>
              <p>
                Completed Tasks
              </p>
            </div>

            <div>
              <h1>100%</h1>
              <p>
                Cloud Based
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "460px",
            background:
              "rgba(255,255,255,0.9)",
            backdropFilter:
              "blur(20px)",
            border:
              "1px solid rgba(255,255,255,0.3)",
            padding:
              "50px",
            borderRadius:
              "30px",
            boxShadow:
              "0 20px 60px rgba(15,23,42,0.12)",
          }}
        >
          <h1
            style={{
              textAlign:
                "center",
              fontSize:
                "38px",
              marginBottom:
                "10px",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              textAlign:
                "center",
              color:
                "#64748B",
              marginBottom:
                "40px",
            }}
          >
            Create your
            DevTrack account
          </p>

          <input
            placeholder="Full Name"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            style={
              inputStyle
            }
          />

          <button
            onClick={
              handleRegister
            }
            style={
              buttonStyle
            }
          >
            Create Account
          </button>

          <div
            style={{
              textAlign:
                "center",
              margin:
                "30px 0",
              color:
                "#64748B",
            }}
          >
            OR
          </div>

          <button
            style={
              googleButton
            }
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              width="22"
              alt="google"
            />

            Continue with
            Google
          </button>

          <p
            style={{
              marginTop:
                "30px",
              textAlign:
                "center",
              color:
                "#64748B",
            }}
          >
            Already have an
            account?{" "}
            <Link
              to="/login"
              style={{
                color:
                  "#2563EB",
                fontWeight:
                  "600",
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "16px",
  border:
    "1px solid #E2E8F0",
  fontSize: "15px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "18px",
  background: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const googleButton = {
  width: "100%",
  padding: "18px",
  background: "white",
  border:
    "1px solid #E2E8F0",
  borderRadius: "16px",
  cursor: "pointer",
  display: "flex",
  justifyContent:
    "center",
  alignItems: "center",
  gap: "12px",
  fontSize: "15px",
  fontWeight: "600",
};

export default Register;

