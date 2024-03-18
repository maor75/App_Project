from fastapi import FastAPI, HTTPException
import mysql.connector
from config import DB_CONFIG
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def execute_query(query, params=None, fetch=False):
    try:
        # Connect to the database
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            cursor = connection.cursor()

            # Execute the SQL query with optional parameters
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)

            if fetch:
                column_names = [column[0] for column in cursor.description]

                # Fetch all rows if needed
                records = cursor.fetchall()
                # Construct a list of dictionaries with column names as keys
                customers = [{column_names[i]: row[i] for i in range(len(column_names))} for row in records]
                return customers
            else:
                # Commit the transaction if not fetching data
                connection.commit()
                return {"message": "Query executed successfully."}

    except mysql.connector.Error as e:
        print("Error while executing MySQL query:", e)
        raise HTTPException(status_code=500, detail="Error executing query")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


@app.get("/costumers")
def get_customers():
    query = "SELECT * FROM app1.costumers;"
    customers = execute_query(query, fetch=True)
    if customers:
        return {"table": customers}
    else:
        return {"message": "Failed to fetch customers"}
@app.get("/product")
def get_customers():
    # Fetch customers data
    query = "SELECT * FROM app1.product;"
    customers = execute_query(query, fetch=True)
    return {"table": customers}
class Customer(BaseModel):
    costumer_id: int
    costumer_name: str
    last_name: str

@app.post("/input")
def create_customer(customer: Customer):
    try:
        query = "INSERT INTO app1.costumers (costumer_id, costumer_name, last_name) VALUES (%s, %s, %s)"
        params = (customer.costumer_id, customer.costumer_name, customer.last_name)
        execute_query(query, params)
        return {"message": "Customer created successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error creating customer")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
