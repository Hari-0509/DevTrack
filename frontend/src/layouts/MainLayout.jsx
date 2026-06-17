import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout({
  children
}) {
  return (
    <div
      style={{
        display: "flex",
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
        <Navbar />

        {children}
      </div>
    </div>
  );
}

export default MainLayout;