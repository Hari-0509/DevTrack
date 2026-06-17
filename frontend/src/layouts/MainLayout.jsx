import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout({
  children
}) {
  return (
    <div
      style={{
        display: "flex",
        background:
          "#F8FAFC"
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

        <div
          style={{
            marginTop: "30px"
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;