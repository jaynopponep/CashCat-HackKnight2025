from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)
conn_string = os.environ.get("MONGODB_CONN_STRING")
client = MongoClient(conn_string)
db = client["cashcat"]
user_auth = db["user_auth"]

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        username = data.get("username")
        password = data.get("password")
        if not username or not password:
            return jsonify({"error": "missing fields"}), 400

        if user_auth.find_one({"username": username}):
            return jsonify({"error": "username already taken!"}), 409

        user_data = {"username": username, "password": password}
        user_auth.insert(user_data)

        return jsonify({"message": "User registration successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print(conn_string)
    app.run(debug=True)
