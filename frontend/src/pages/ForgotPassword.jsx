import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {

    if (!email) {

      setMessage(
        "Please enter your email."
      );

      return;
    }

    try {

      setLoading(true);

      const res =
        await api.post(
          "/forgot-password",
          {
            email,
          }
        );

      setMessage(
        `Reset link generated.\n\n${res.data.link}`
      );

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Something went wrong."
      );

    }

    setLoading(false);

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "#F8FAFC",
        padding: "40px",
      }}
    >

      <div
        style={{
          width: "500px",
          background: "#FFFFFF",
          borderRadius: "24px",
          padding: "45px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,.08)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Forgot Password
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748B",
            marginBottom: "35px",
          }}
        >
          Enter your registered email.
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

        <button
          style={buttonStyle}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Reset Link"}
        </button>

        {message && (

          <div
            style={{
              marginTop: "25px",
              background:
                "#EFF6FF",
              color:
                "#1E40AF",
              padding: "16px",
              borderRadius:
                "12px",
              whiteSpace:
                "pre-wrap",
              wordBreak:
                "break-word",
            }}
          >
            {message}
          </div>

        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <Link
            to="/login"
            style={{
              color:
                "#2563EB",
              textDecoration:
                "none",
              fontWeight:
                "600",
            }}
          >
            ← Back to Login
          </Link>
        </p>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "16px",

  borderRadius: "12px",

  border:
    "1px solid #CBD5E1",

  marginBottom: "20px",

  fontSize: "16px",

  boxSizing:
    "border-box",

};

const buttonStyle = {

  width: "100%",

  padding: "16px",

  background:
    "linear-gradient(135deg,#2563EB,#4F46E5)",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "12px",

  fontSize: "16px",

  fontWeight: "700",

  cursor: "pointer",

};

export default ForgotPassword;