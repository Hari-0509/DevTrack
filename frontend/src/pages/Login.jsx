import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  GoogleLogin
} from "@react-oauth/google";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  const handleGoogleLogin =
  async (
    credentialResponse
  ) => {
    try {

      const response =
        await api.post(
          "/google-login",
          {
            token:
              credentialResponse
                .credential
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/");
    }
    catch (error) {
      console.log(error);

      alert(
        "Google login failed"
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
            "linear-gradient(135deg,#2563EB,#7C3AED)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            position: "absolute",
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
            position: "absolute",
            bottom: "-100px",
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
              display: "inline-block",
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
            🚀 Productivity Platform
          </div>

          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              marginBottom:
                "30px",
            }}
          >
            DevTrack
          </h1>

          <h2
            style={{
              fontSize: "44px",
              lineHeight: "1.3",
              marginBottom:
                "30px",
            }}
          >
            Build.
            <br />
            Organize.
            <br />
            Deliver.
          </h2>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.8",
              opacity: 0.9,
            }}
          >
            Transform ideas into successful
            projects. Plan your work,
            track progress and collaborate
            efficiently.
          </p>

          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "60px",
            }}
          >
            <div>
              <h1>10K+</h1>
              <p>Tasks Managed</p>
            </div>

            <div>
              <h1>500+</h1>
              <p>Projects Created</p>
            </div>

            <div>
              <h1>99%</h1>
              <p>Productivity</p>
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
          alignItems: "center",
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
            padding: "50px",
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
              fontSize: "38px",
              marginBottom:
                "10px",
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              textAlign:
                "center",
              color: "#64748B",
              marginBottom:
                "40px",
            }}
          >
            Sign in to continue
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={inputStyle}
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
            style={inputStyle}
          />

          <button
            onClick={
              handleLogin
            }
            style={buttonStyle}
          >
            Sign In
          </button>

          <div
            style={{
              textAlign:
                "center",
              margin: "30px 0",
              color: "#64748B",
            }}
          >
            OR
          </div>

          <div
  style={{
    display: "flex",
    justifyContent:
      "center"
  }}
>
  <GoogleLogin
    onSuccess={
      handleGoogleLogin
    }
    onError={() =>
      alert(
        "Google Login Failed"
      )
    }
  />
</div>

          <p
            style={{
              marginTop: "30px",
              textAlign:
                "center",
              color: "#64748B",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color:
                  "#2563EB",
                fontWeight:
                  "600",
              }}
            >
              Create Account
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
  border: "1px solid #E2E8F0",
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
  border: "1px solid #E2E8F0",
  borderRadius: "16px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  fontSize: "15px",
  fontWeight: "600",
};

export default Login;

