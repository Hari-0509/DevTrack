import sqlite3

conn = sqlite3.connect(
    "instance/devtrack.db"
)

cursor = conn.cursor()

cursor.execute("""
ALTER TABLE tasks
ADD COLUMN assigned_to INTEGER
""")

conn.commit()
conn.close()

print(
    "assigned_to added"
)