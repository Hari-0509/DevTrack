function Card({ children }) {
  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "20px",
        padding: "24px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.3)"
      }}
    >
      {children}
    </div>
  );
}

export default Card;