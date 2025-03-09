### CashCat API Endpoints

## /register (POST)
### Headers:
None
### JSON Body:
- username (string)
- email (string)
- password (string)

## /login (POST)
### Headers:
None

### JSON Body: 
- username (string)
- password (string)

## /profile (GET)
### Headers:
**Authorization**: Bearer Token

## /prompt_cashcat (POST)
### Headers:
None

### JSON Body:
- prompt (string)

## /nessie_getallcustomers (GET)
### Headers:
None

### JSON Body: 
None

### Returns: JSON response of all customers. Each customer has:
- "_id"
- "address" which has "city", "state", "street_name", "street_number", "zip""
- "first_name"
- "last_name"

## /nessie_getcustomerinfo (GET)
### Headers:
None

### JSON Body: 
None

### Query Params:
- id

### Returns:
- "_id"
- "address" which has "city", "state", "street_name", "street_number", "zip""
- "first_name"
- "last_name"

## /nessie_getallaccounts (GET)
### Headers:
None

### JSON Body:
None

### Returns:
- "_id" (ACCOUNT id, different than CUSTOMER id)
- "account_number"
- "balance"
- "customer_id"
- "nickname"
- "rewards"
- "type"

## /nessie_getaccountinfo (GET)
### Headers:
None

### JSON Body:
None

### Query Params:
- account_id

### Returns:
- "_id"
- "account_number"
- "balance": 0,
- "customer_id"
- "nickname"
- "rewards"
- "type"

## /nessie_getmerchants
### Headers:
None

### JSON Body:
None

### Query Params:
None

Returns: All merchants available

## /nessie_makepurchase
### Headers:
None

### JSON Body:
- "merchant_id"
- "amount"
- "description"

### Query Params:
- "buyer_id"

returns: 
- "_id"
- "amount"
- "description"
- "medium" 
- "merchant_id"
- "payer_id"
- "purchase_date"
- "status"
- "type"

## /nessie_getuserpurchases
### Headers:
None

### JSON Body:
None

### Query Params:
- "user_account_id"

returns: 
- "_id"
- "amount"
- "description"
- "medium"
- "merchant_id"
- "payer_id"
- "purchase_date"
- "status"
- "type"
