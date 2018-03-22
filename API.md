FORMAT: 1A
HOST: https://anarh-mintymint-v1.p.mashape.com

# MintyMint

An exercise in providing a basic mock API for project code-named MintyMint. All requests must use a valid API key in the request header as follows.

`X-Mashape-Key: Your API Key` 

Get an API key by emailing the owner of this API or creating a free account at http://marketplace.mashape.com.

# Group Authentication

Login, account and password retrieval services. 

## /auth/login

A successful login provides a JSON Web Token (JWT). Note, session token lasts 1hr

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            
    + Body
            
            {
                "username": "john",
                "password": "password"
            }

+ Response 200 (application/json)
    + Body

            {
                "accessToken": "yJhbGciOiJIUzI1..."
            }
            
## /auth/login/forgot-username

First step in identifying user in order to retrieve account username

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            
    + Body
    
            {   
                "firstname": "john",
                "lastname" "brown",
                "email": "john@example.com"
            }
            
+ Response 200 (application/json)
    + Body

            {
                "tmpToken": 12345
            }

## /auth/login/forgot-password

First step in identifying user in order to change password

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            
    + Body
    
            {   
                "username": "john",
                "email": "john@example.com"
            }
            
+ Response 200 (application/json)
    + Body

            {
                "tmpToken": 12345
            }
            
## /auth/login/send-pin

Temporary PIN for account verification. Note: PIN is sent to email of user in production but to ethereal.email in development mode

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            
    + Body
    
            {   
                "tmpPin": 12345
            }
            
+ Response 200 (application/json)
    + Body

            {
            }
            
## /auth/login/verify-pin

Verify PIN sent to email or text

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            
    + Body
    
            {   
                "pin": 67890,
                "tmpPin": 12345
            }
            
+ Response 200 (application/json)
    + Body

            {
            }

## /auth/login/get-accounts

Provides a list of accounts for user

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            
    + Body
    
            {   
                "pin": 67890,
                "tmpPin": 12345,
                "email": "john@example.com"
            }
            
+ Response 200 (application/json)
    + Body

            {
                "accounts": [
                    {
                        "username": "john",
                        "merchant": {
                            "description": "Greatest coffee shop",
                            "_id": "5aaf22a365589a0acef87443",
                            "name": "The Coffee Shop"
                        }
                    }
                ]
            }
         
## /auth/login/create-password

Create new password

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            
    + Body
    
            {   
                "pin": 67890,
                "tmpPin": 12345,
                "email": "john@example.com",
                "password": "newpassword"
            }
            
+ Response 200 (application/json)

    + Body

            {
            }
           
            
# Group Merchants

A valid session token must be used for all requests

## /merchants

View or add a merchant.

### GET [GET]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body 
    
            {
                "merchants": [
                    {
                        "description": "Greatest coffee shop",
                        "accounts": [ "5aaf22a565589a0acef8750b" ],
                        "_id": "5aaf22a365589a0acef87443",
                        "name": "The Coffee Shop"
                    }
                ]
            }

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token
            
    + Body 
    
            {
                "description": "New coffee shop",
                "accounts": [ "5aaf22a565589a0acef8750b" ],
                "name": "New Coffee Shop"
            }

+ Response 200 (application/json)
    + Body 
    
            {
                "description": "New coffee shop",
                "accounts": [ "5aaf22a565589a0acef8750b" ],
                "name": "New Coffee Shop"
            }

          
## /merchants/{id}

CRUD operations for a Merchant account.

+ Parameters
    + id (number) - ID of the Merchant in the form of an ObjectID

### GET [GET]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body

             {
                "merchant": {
                    "description": "Greatest coffee shop",
                    "accounts": [ "5aaf22a565589a0acef8750b" ],
                    "name": "The Coffee Shop"
                }
            }
            
### PUT [PUT]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token
            
    + Body
    
            {
                "description": "New Description",
                "name": "The Coffee Shop New Name"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": "5aaf22a365589a0acef87443"
            }

### PATCH [PATCH]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token
            
    + Body
    
            {
                "id": "5aaf22a365589a0acef87443"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": "5aaf22a365589a0acef87443"
            }
            
### DELETE [DELETE]
+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body
    
            {
                "id": "5aaf22a365589a0acef87443"
            }


# Group Accounts

A valid session token must be used for all requests

## /accounts

View and add accounts.

### GET [GET]
+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token
            
+ Response 200 (application/json)
    + Body 
    
            {
                "accounts": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "username": "user1",
                        "merchant": "5aaf22a365589a0acef87444",
                        "user": "5aaf22a565589a0acef874a8"
                    }
                ]
            }


### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token
            
    + Body 
    
            {
                "username": "newuser",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }

+ Response 200 (application/json)
    + Body 
    
            {
                "username": "newuser",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }


## /accounts/{id}

CRUD operations of an account. Available to privileged accounts

+ Parameters
    + id (number) - ID of the account in the form of an ObjectID

### GET [GET]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body

             {
                "account": {
                    "username": "user1",
                    "merchant": "5aaf22a365589a0acef87444",
                    "user": "5aaf22a565589a0acef874a8"
                }
            }
            
### PUT [PUT]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

    + Body
    
            {
                "username": "newusername",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": "5aaf22a365589a0acef87443"
            }

### PATCH [PATCH]
+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token
            
    + Body
    
            {
                "username": "newusername"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": "5aaf22a365589a0acef87443"
            }
            
### DELETE [DELETE]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body
    
            {
                "id": "5aaf22a365589a0acef87443"
            }


# Group Users

A valid session token must be used for all requests

## /users

View and add users.

### GET [GET]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body 
    
            {
                "users": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "email": "email@example.com",
                        "firstname": "John",
                        "lastname": "Smith",
                        "accounts": ["5aaf22a565589a0acef874a8"]
                    }
                ]
            }

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token
            
    + Body 
    
            {
                "user": [
                    {
                        "email": "email@example.com",
                        "firstname": "John",
                        "lastname": "Smith",
                        "accounts": ["5aaf22a565589a0acef874a8"]
                    }
                ]
            }

+ Response 200 (application/json)
    + Body 
    
            {
                "user": [
                    {
                        "email": "email@example.com",
                        "firstname": "John",
                        "lastname": "Smith",
                        "accounts": ["5aaf22a565589a0acef874a8"]
                    }
                ]
            }

## /users/{id}

CRUD operations of a user object. Available to privileged accounts

+ Parameters
    + id (number) - ID of the user in the form of an ObjectID

### GET [GET]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body

             {
                "user": {
                    "email": "email@example.com",
                    "firstname": "John",
                    "lastname": "Smith",
                    "accounts": ["5aaf22a565589a0acef874a8"]
                }
            }
            
### PUT [PUT]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

    + Body
    
            {
                "email": "email@example.com",
                "firstname": "John",
                "lastname": "Smith",
                "accounts": ["5aaf22a565589a0acef874a8"]
            }

+ Response 200 (application/json)
    + Body

            {
                "id": "5aaf22a365589a0acef87443"
            }

### PATCH [PATCH]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

    + Body
    
            {
                "email": "email@example.com"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": "5aaf22a365589a0acef87443"
            }
            
### DELETE [DELETE]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body
    
            {
                "id": "5aaf22a365589a0acef87443"
            }

# Group Transactions

A valid session token must be used for all requests

## /transactions

View and add transactions.

### GET [GET]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body 
    
            {
                "transactions": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "item": "blue toy",
                        "merchant": "5aaf22a365589a0acef87444"
                    }
                ]
            }

### POST [POST]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

    + Body 
    
            {
                "item": "blue toy",
                "merchant": "5aaf22a365589a0acef87444"
            }

+ Response 200 (application/json)
    + Body 
    
            {
                "item": "blue toy",
                "merchant": "5aaf22a365589a0acef87444"
            }

## /transactions/{id}

CRUD operations of a transaction model.

+ Parameters
    + id (number) - ID of the transaction in the form of an ObjectID

### GET [GET]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body

             {
                "transaction": {
                        "item": "blue toy",
                        "merchant": "5aaf22a365589a0acef87444"
                    }
            }
            
### PATCH [PATCH]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

    + Body
    
            {
                "item": "blue toy red"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": "5aaf22a365589a0acef87443"
            }
            
### DELETE [DELETE]

+ Request (application/json)
    + Headers
    
            X-Mashape-Key: Your API Key
            Authorization: Bearer Your Session Token

+ Response 200 (application/json)
    + Body
    
            {
                "id": "5aaf22a365589a0acef87443"
            }
            
