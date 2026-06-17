function Navbar() {
  return (
    <div
      style={{
        background: "#1e293b",
        height: "80px",
        borderRadius: "20px",
        marginBottom: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",
        padding: "0 30px"
      }}
    >
      <h2>Dashboard</h2>

      <div>
        Welcome 👋
      </div>
    </div>
  );
}

export default Navbar;