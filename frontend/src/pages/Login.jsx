import { Link } from "react-router-dom";

function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#F8FAFC",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
          padding: "60px",
        }}
      >
        {/* Decorative Circles */}
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.10)",
            position: "absolute",
            top: "-100px",
            right: "-100px",
          }}
        />

        <div
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
          }}
        />

        <div
          style={{
            maxWidth: "500px",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "70px",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            DevTrack
          </h1>

          <h2
            style={{
              fontSize: "42px",
              lineHeight: "1.3",
              marginBottom: "25px",
            }}
          >
            Manage Projects Smarter 🚀
          </h2>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.8",
              opacity: "0.9",
            }}
          >
            Organize projects, track tasks,
            monitor progress, and collaborate
            efficiently from one powerful platform.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "460px",
            background: "#FFFFFF",
            padding: "50px",
            borderRadius: "30px",
            boxShadow:
              "0 20px 60px rgba(15,23,42,0.08)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "38px",
              marginBottom: "10px",
              color: "#0F172A",
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#64748B",
              marginBottom: "40px",
              fontSize: "16px",
            }}
          >
            Sign in to continue to DevTrack
          </p>

          <input
            type="email"
            placeholder="Email Address"
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
          />

          <button style={buttonStyle}>
            Sign In
          </button>

          <div
            style={{
              textAlign: "center",
              margin: "30px 0",
              color: "#64748B",
            }}
          >
            OR
          </div>

          <button style={googleButton}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              width="22"
              alt="google"
            />

            Continue with Google
          </button>

          <p
            style={{
              marginTop: "30px",
              textAlign: "center",
              color: "#64748B",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#2563EB",
                fontWeight: "600",
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
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
};

export default Login;