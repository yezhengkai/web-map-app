import psycopg2
from dotenv import dotenv_values

# import pandas as pd

postgress_conn = dotenv_values()

# Update connection string information
# *dbname*: the database name
# *database*: the database name (only as keyword argument)
# *user*: user name used to authenticate
# *password*: password used to authenticate
# *host*: database host address (defaults to UNIX socket if not provided)
# *port*: connection port number (defaults to 5432 if not provided)
dbname = postgress_conn["POSTGRES_DB"]
user = postgress_conn["POSTGRES_USER"]
password = postgress_conn["POSTGRES_PASSWORD"]
host = postgress_conn["POSTGRES_HOST"]
port = postgress_conn["POSTGRES_PORT"]

# Construct connection
conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
print("Connection established")

# We can use context manager. `with conn.cursor() as cur:`
cursor = conn.cursor()

# Drop previous table of same name if one exists
cursor.execute("DROP TABLE IF EXISTS inventory;")
print("Finished dropping table (if existed)")

# Create a table
cursor.execute("CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);")
print("Finished creating table")

# Insert some data into the table
cursor.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s);", ("banana", 150))
cursor.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s);", ("orange", 154))
cursor.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s);", ("apple", 100))
print("Inserted 3 rows of data")

# Clean up
conn.commit()  # Commit all changes to database
cursor.close()
conn.close()
