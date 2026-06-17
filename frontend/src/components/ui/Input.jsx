function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "none",
        background: "#334155",
        color: "white",
        outline: "none"
      }}
    />
  );
}

export default Input;