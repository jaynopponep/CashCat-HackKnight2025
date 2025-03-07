from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)
conn_string = os.environ.get("MONGODB_CONN_STRING")

try:
    client = MongoClient(conn_string)
    db = client["cashcat"]
    user_auth = db["user_auth"]
    print("connected to MongoDB")
except Exception as e:
    print(f"Connection error: {e}")
    exit(1)

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        if not username or not password or not email:
            return jsonify({"error": "missing fields"}), 400

        if user_auth.find_one({"username": username}):
            return jsonify({"error": "username already taken!"}), 409
        if user_auth.find_one({"email": email}):
            return jsonify({"error": "account with email already exists"}), 409

        user_data = {"username": username, "email": email, "password": password}
        # if i have time, planning to hash the passwords before saving them
        # but atleast we have demonstration
        user_auth.insert_one(user_data)

        return jsonify({"message": "User registration successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print(conn_string)
    app.run(debug=True)
