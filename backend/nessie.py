import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('NESSIE_API_KEY')
account_id = os.getenv('NESSIE_ACCOUNT_ID')
if not api_key:
    raise ValueError("NESSIE_API_KEY not found in .env file")
if not account_id:
    raise ValueError("NESSIE_ACCOUNT_ID not found in .env file")

url = f"http://api.nessieisreal.com/accounts/{account_id}/purchases?key={api_key}"

response = requests.get(url)

if response.status_code == 200:
   
    purchases = response.json()
    
    for purchase in purchases:
        print(f"Merchant: {purchase['merchant_id']}")
        print(f"Amount: ${purchase['amount']}")
        print(f"Date: {purchase['purchase_date']}")
        print(f"Category: {purchase['medium']}")
        print("-------------------")
else:
    print(f"Error: {response.status_code}")
    print(response.text)