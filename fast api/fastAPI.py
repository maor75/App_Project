from fastapi import FastAPI
import mysql.connector
from config import DB_CONFIG
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],)

def fetch_customers(request):
    try:
        # Connect to the database
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)  # Set dictionary=True to return rows as dictionaries

            # Execute the SQL query
            cursor.execute(str(request))

            # Fetch column names
            column_names = [column[0] for column in cursor.description]

            # Fetch all rows
            records = cursor.fetchall()

            # Construct a list of dictionaries with column names as keys
            customers = [{column_name: row[column_name] for column_name in column_names} for row in records]

            return customers

    except mysql.connector.Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

@app.get("/costumers")
def get_customers():
    customers = fetch_customers("SELECT * FROM app1.costumers;")
    if customers:
        return {"table": customers}
    else:
        return {"message": "Failed to fetch customers"}
@app.get("/product")
def get_customers():
    product = fetch_customers("SELECT * FROM app1.product;")
    if product:
        return {"table": product}
    else:
        return {"message": "Failed to fetch product"}




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)