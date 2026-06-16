import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a"
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MainLayout;