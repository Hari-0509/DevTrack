import { Link } from "react-router-dom";

function Register() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#FFFFFF",
          padding: "50px",
          borderRadius: "24px",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#2563EB"
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748B",
            marginBottom: "40px"
          }}
        >
          Create your DevTrack account
        </p>

        <input
          placeholder="Full Name"
          style={inputStyle}
        />

        <input
          placeholder="Email Address"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Create Account
        </button>

        <div
          style={{
            textAlign: "center",
            margin: "25px 0",
            color: "#64748B"
          }}
        >
          OR
        </div>

        <button style={googleButton}>
          Continue with Google
        </button>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center"
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563EB",
              fontWeight: "600"
            }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "20px",
  borderRadius: "14px",
  border: "1px solid #E2E8F0",
  fontSize: "15px"
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "14px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer"
};

const googleButton = {
  width: "100%",
  padding: "16px",
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600"
};

export default Register;