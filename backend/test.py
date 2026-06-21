import sqlite3

conn = sqlite3.connect("instance/devtrack.db")
cursor = conn.cursor()

cursor.execute("""
ALTER TABLE users
ADD COLUMN role TEXT
DEFAULT 'Student'
""")

conn.commit()
conn.close()