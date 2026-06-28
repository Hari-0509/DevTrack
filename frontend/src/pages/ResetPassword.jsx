import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleResetPassword =
    async () => {

      if (!password) {
        alert(
          "Please enter a password"
        );
        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      setLoading(true);

      try {

        await api.post(
          "/reset-password",
          {
            token,
            password,
          }
        );

        alert(
          "Password changed successfully."
        );

        navigate("/login");

      }
      catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Unable to reset password."
        );

      }

      setLoading(false);

    };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        background:
          "#F8FAFC",
        padding: "30px",
      }}
    >

      <div
        style={{
          width: "500px",
          background:
            "#FFFFFF",
          borderRadius:
            "24px",
          padding: "50px",
          boxShadow:
            "0 20px 60px rgba(15,23,42,0.12)",
        }}
      >

        <h1
          style={{
            textAlign:
              "center",
            marginBottom:
              "10px",
          }}
        >
          Reset Password
        </h1>

        <p
          style={{
            textAlign:
              "center",
            color:
              "#64748B",
            marginBottom:
              "35px",
          }}
        >
          Enter your new password.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
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
          style={inputStyle}
        />

        <button
          style={buttonStyle}
          onClick={
            handleResetPassword
          }
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>

        <p
          style={{
            marginTop: "30px",
            textAlign:
              "center",
            color:
              "#64748B",
          }}
        >
          Back to{" "}
          <Link
            to="/login"
            style={{
              color:
                "#2563EB",
              fontWeight:
                "600",
            }}
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "18px",

  marginBottom: "20px",

  borderRadius: "14px",

  border:
    "1px solid #CBD5E1",

  fontSize: "16px",

  outline: "none",

  boxSizing:
    "border-box",

};

const buttonStyle = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(135deg,#2563EB,#4F46E5)",

  color:
    "#FFFFFF",

  fontSize: "16px",

  fontWeight:
    "700",

  cursor:
    "pointer",

};

export default ResetPassword;