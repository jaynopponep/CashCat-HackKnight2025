from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt # for encrypting passwords
from ragsystem.llm import build_rag_chain 
from langchain_core.messages import HumanMessage, SystemMessage
load_dotenv()

app = Flask(__name__)
CORS(app)
conn_string = os.environ.get("MONGODB_CONN_STRING")
JWT_SECRET = os.environ.get("JWT_SECRET_KEY")
try:
    NESSIEKEY = os.environ.get("NESSIEAPIKEY")
except Exception as e:
    print("couldn't get Nessie key")
    exit(1)
app.config["JWT_SECRET_KEY"] = JWT_SECRET
OPENAI_KEY = os.getenv('OPENAI_KEY')
jwt = JWTManager(app)

try:
    client = MongoClient(conn_string)
    db = client["cashcat"]
    user_auth = db["user_auth"]
    posts = db["posts"]
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
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/get_useraccount_id', methods=['GET'])
@jwt_required()
def getuseraccountid():
    try:
        username = get_jwt_identity()
        account_id = user_auth.find_one({"username": username}, {"account_id": 1, "_id": 0})
        if not account_id:
            return jsonify({"error": "no account id found"}), 404
        return jsonify({"account_id": account_id}), 200
    except Exception as e:
        return jsonify({"error": "Token invalid or expired"}), 401


@app.route('/get_username', methods=['GET'])
@jwt_required()
def get_username():
    try:
        username = get_jwt_identity()
        if not username:
            return jsonify({"error": "username doesn't exist"}), 404
        return jsonify({"username": username}), 200
    except Exception as e:
        return jsonify({"error": "Token invalid or expired"}), 401


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

@app.route('/nessie_getallcustomers', methods=['GET'])
def getallcustomers():
    try:
        response = requests.get(f"http://api.nessieisreal.com/customers?key={NESSIEKEY}")
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/nessie_getcustomerinfo', methods=['GET'])
def getcustomerinfo():
    try:
        user_id = request.args.get('id')
        if not user_id:
            return jsonify({"message": "missing fields"}), 500
        response = requests.get(f"http://api.nessieisreal.com/customers/{user_id}?key={NESSIEKEY}")
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/nessie_getallaccounts', methods=['GET'])
def getallaccounts():
    try:
        response = requests.get(f"http://api.nessieisreal.com/accounts?type=Checking&key={NESSIEKEY}")
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/nessie_getaccountinfo', methods=['GET'])
def getaccountinfo():
    try:
        account_id = request.args.get('account_id')
        response = requests.get(f"http://api.nessieisreal.com/accounts/{account_id}?key={NESSIEKEY}")
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/nessie_getmerchants', methods=['GET'])
def getmerchants():
    try:
        # note there are more merchants, but the best constraints i've found is lat=42, long=-76, 25 mi radius
        # 100% subject to change though
        response = requests.get(f"http://api.nessieisreal.com/merchants?lat=42&lng=-76&rad=25&key={NESSIEKEY}")
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/nessie_makepurchase', methods=['POST'])
def makepurchase():
    try:
        buyer_id = request.args.get('buyer_id')
        data = request.json
        merchant_id = data.get("merchant_id")
        amount = data.get("amount")
        description = data.get("description")
        purchase_payload = {
                "merchant_id": merchant_id,
                "medium": "balance",
                "purchase_date": "2025-03-08",
                "amount": amount,
                "status": "completed",
                "description": description 
                }
        response = requests.post(f"http://api.nessieisreal.com/accounts/{buyer_id}/purchases?key={NESSIEKEY}",
                                json=purchase_payload)
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/nessie_getuserpurchases', methods=['GET'])
def getuserpurchases():
    try:
        user_account_id = request.args.get('user_account_id')
        response = requests.get(f"http://api.nessieisreal.com/accounts/{user_account_id}/purchases?key={NESSIEKEY}")
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

@app.route('/add_post', methods=['POST'])
def addpost():
    try:
        data = request.json
        username = data.get("username")
        content = data.get("content")
        category = data.get("category")
        content_data = {"username": username, "content": content, "category": category}
        posts.insert_one(content_data)
        return jsonify({"message": "post successful"}), 200
    except Exception as e:
        return jsonify({"message": "internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
