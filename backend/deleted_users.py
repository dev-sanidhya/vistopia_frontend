import sqlite3

# Step 1: Connect to the database
conn = sqlite3.connect("users.db")  # Make sure this is your actual DB filename
cursor = conn.cursor()

# Step 2: Username you want to delete
username_to_delete = "atharva"  # <- change this to the username you want to delete

# Step 3: Execute the DELETE statement
cursor.execute("DELETE FROM users WHERE username = ?", (username_to_delete,))

# Step 4: Commit and close connection
conn.commit()
conn.close()

print(f"User '{username_to_delete}' deleted successfully.")