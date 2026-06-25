import sqlite3

conn = sqlite3.connect(
    "instance/devtrack.db"
)

cursor = conn.cursor()

cursor.execute(
    "PRAGMA table_info(tasks)"
)

for row in cursor.fetchall():
    print(row)