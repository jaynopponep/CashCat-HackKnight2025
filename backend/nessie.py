

import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

apiKey = os.getenv('NESSIE_API_KEY')
apiKey = NESSIE_API_KEY
print("API Key Loaded:", apiKey)
if not apiKey:
    raise ValueError("NESSIE_API_KEY not found in .env file")

url = 'http://api.reimaginebanking.com/purchases?key={}'.format(apiKey)
response = requests.get(
    url,
    headers={'content-type':'application/json'},
)

if response.status_code == 200:
    purchases = response.json()
    for purchase in purchases:
        print(f"Merchant: {purchase.get('merchant_id', 'N/A')}")
        print(f"Amount: ${purchase.get('amount', 'N/A')}")
        print(f"Date: {purchase.get('purchase_date', 'N/A')}")
        print(f"Category: {purchase.get('medium', 'N/A')}")
        print("-------------------")
else:
    print(f"Error: {response.status_code}")
    print(response.text)