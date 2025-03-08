from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt # for encrypting passwords
from ragsystem.llm import build_rag_chain 
from langchain_core.messages import HumanMessage, SystemMessage
load_dotenv()

app = Flask(__name__)
conn_string = os.environ.get("MONGODB_CONN_STRING")
JWT_SECRET = os.environ.get("JWT_SECRET_KEY")
app.config["JWT_SECRET_KEY"] = JWT_SECRET
OPENAI_KEY = os.getenv('OPENAI_KEY')
jwt = JWTManager(app)

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
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        user_data = {"username": username, "email": email, "password": hashed_pw.decode('utf-8')}
        # if i have time, planning to hash the passwords before saving them
        # but atleast we have demonstration
        user_auth.insert_one(user_data)

        return jsonify({"message": "User registration successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get("username")
        password = data.get("password")
        if not username or not password:
            return jsonify({"error": "missing fields"}), 400
        user = user_auth.find_one({"username": username})
        if not user:
            return jsonify({"error" : "user does not exist, please register first"}), 401
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            return jsonify({"error": "invalid credentials"}), 401
        access_token = create_access_token(identity=username)
        return jsonify({"message": "login successful", "jwt_token": access_token}), 200
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        curr_user = get_jwt_identity()
        print("Current User:", curr_user)
        if not curr_user:
            return jsonify({"error": "invalid JWT token"}), 400
        return jsonify({"username": curr_user}), 200
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/prompt_cashcat', methods=['POST'])
def prompt_cashcat():
    try:
        data = request.json
        user_prompt = data.get("prompt")
        history = []
        rag_chain = build_rag_chain(OPENAI_KEY)
        result = rag_chain.invoke({"input": user_prompt, "chat_history": history})
        if not result:
            return jsonify({"message": "issue invoking rag chain!"}), 400
        history.append(HumanMessage(content=user_prompt))
        history.append(SystemMessage(content=result["answer"]))
        return jsonify({"result": result['answer']}), 200
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
