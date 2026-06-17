function RecentActivity() {
  const activities = [
    "Created AI Dashboard Project",
    "Completed Database Module",
    "Added Authentication",
    "Created Task Board",
  ];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "30px",
        border: "1px solid #E2E8F0",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
        }}
      >
        Recent Activity
      </h2>

      {activities.map(
        (
          activity,
          index
        ) => (
          <div
            key={index}
            style={{
              padding:
                "15px 0",
              borderBottom:
                "1px solid #E2E8F0",
            }}
          >
            {activity}
          </div>
        )
      )}
    </div>
  );
}

export default RecentActivity;