import {
  useContext,
} from "react";

import {
  ThemeContext,
} from "../App";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout({
  children,
}) {
  const {
    darkMode,
  } = useContext(
    ThemeContext
  );

  return (
    <div
      style={{
        display: "flex",
        background:
          darkMode
            ? "#0F172A"
            : "#F8FAFC",
        minHeight:
          "100vh",
        transition:
          "0.3s",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding:
            "30px",
        }}
      >
        <Navbar />

        <div
          style={{
            marginTop:
              "30px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;