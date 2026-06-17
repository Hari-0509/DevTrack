function Button({
  children,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#3b82f6",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "12px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600"
      }}
    >
      {children}
    </button>
  );
}

export default Button;