### CashCat API Endpoints

## /register (POST)
### Headers:
None
### Parameters:
- username (string)
- email (string)
- password (string)

## /login (POST)
### Headers:
None

### Parameters:
- username (string)
- password (string)

## /profile (GET)
### Headers:
**Authorization**: Bearer Token

## /prompt_cashcat (POST)
### Headers:
None

### Parameters:
- prompt (string)

## /nessie_getallcustomers (GET)
### Headers:
None

### Parameters:
None

Returns: JSON response of all customers. Each customer has:
- "_id"
- "address" which has "city", "state", "street_name", "street_number", "zip""
- "first_name"
- "last_name"
