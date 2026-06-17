import {
  Bell,
  Search
} from "lucide-react";

function Navbar() {
  return (
    <div
      style={{
        height: "80px",
        background: "#ffffff",
        border:
          "1px solid #e2e8f0",
        borderRadius: "20px",
        padding:
          "0 30px",
        display: "flex",
        alignItems:
          "center",
        justifyContent:
          "space-between"
      }}
    >
      <div>
        <h2>
          Good Morning 👋
        </h2>

        <p
          style={{
            color: "#64748B"
          }}
        >
          Manage your projects
          smarter.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems:
            "center"
        }}
      >
        <Search />
        <Bell />

        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius:
              "50%",
            background:
              "#2563EB",
            color: "white",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            fontWeight: "700"
          }}
        >
          H
        </div>
      </div>
    </div>
  );
}

export default Navbar;