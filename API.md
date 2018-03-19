FORMAT: 1A
HOST: https://anarh-mintymint-v1.p.mashape.com/merchants

# MintyMint

An exercise in providing a basic mock API for project code-named MintyMint. 

# Group Authentication

## /auth/login

First you need a MintyMint API developer key. Get your developer key by emailing the owner of this API or creating an account at http://marketplace.mashape.com.

### POST [POST]

+ Request (application/json)
    + Schema
            
            {
                "username": "john",
                "password": "password"
            }

+ Response 200 (application/json)
    + Schema

            {
                "accessToken": "yJhbGciOiJIUzI1..."
            }
            
## /auth/login/forgot-username

Provides the user a step to retrieving usernames by using email, first name and last name

### POST [POST]

+ Request (application/json)
    + Schema
    
            {   
                "firstname": "john",
                "lastname" "brown",
                "email": "john@example.com"
            }
            
+ Response 200 (application/json)
    + Schema

            {
                "tmpToken": 12345
            }

## /auth/login/forgot-password

Provides the user a step to retrieving usernames by using email, and username

### POST [POST]

+ Request (application/json)
    + Schema
    
            {   
                "username": "john",
                "email": "john@example.com"
            }
            
+ Response 200 (application/json)
    + Schema

            {
                "tmpToken": 12345
            }
            
## /auth/login/send-pin

Provides the user a temporary pin for verification retrieving usernames by using email, and username

### POST [POST]

+ Request (application/json)
    + Schema
    
            {   
                "tmpPin": 12345
            }
            
+ Response 200 (application/json)
    + Schema

            {
            }
            
## /auth/login/verify-pin

Provides the user a step to verifying PIN received via email or text

### POST [POST]

+ Request (application/json)
    + Schema
    
            {   
                "pin": 67890,
                "tmpPin": 12345
            }
            
+ Response 200 (application/json)
    + Schema

            {
            }

## /auth/login/get-accounts

Provides the user a list of their usernames

### POST [POST]

+ Request (application/json)
    + Schema
    
            {   
                "pin": 67890,
                "tmpPin": 12345,
                "email": "john@example.com"
            }
            
+ Response 200 (application/json)
    + Schema

            {
                "accounts": [
                    {
                        "_id": "5aaf22a565589a0acef8750b",
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

User can reset/create password with this endpoint

### POST [POST]

+ Request (application/json)
    + Schema
    
            {   
                "pin": 67890,
                "tmpPin": 12345,
                "email": "john@example.com",
                "password": "newpassword"
            }
            
+ Response 200 (application/json)

    + Schema

            {
            }
           
            
# Group Merchants

## /merchants

See list of all Merchants.

### GET [GET]

+ Response 200 (application/json)
    + Schema 
    
            {
                "merchants": [
                    {
                        "description": "Greatest coffee shop",
                        "accounts": [ "5aaf22a565589a0acef8750b" ],
                        "_id": "5aaf22a365589a0acef87443",
                        "name": "The Coffee Shop",
                    }
                ]
            }

          
## /merchants/{id}

CRUD operations of a Merchant account. Available to privileged accounts

+ Parameters
    + id (number) - ID of the Merchant in the form of an ObjectID

### GET [GET]

+ Response 200 (application/json)
    + Schema

             {
                "merchant": [
                    {
                        "description": "Greatest coffee shop",
                        "accounts": [ "5aaf22a565589a0acef8750b" ],
                        "_id": "5aaf22a365589a0acef87443",
                        "name": "The Coffee Shop",
                    }
                ]
            }
            
### PUT [PUT]

+ Request (application/json)
    + Schema
    
            {
                "description": "New Description",
                "_id": "5aaf22a365589a0acef87443",
                "name": "The Coffee Shop New Name",
            }

+ Response 200 (application/json)
    + Schema

            {
                "description": "New Description",
                "_id": "5aaf22a365589a0acef87443",
                "name": "The Coffee Shop New Name",
            }

### PATCH [PATCH]

+ Request (application/json)
    + Schema
    
            {
                "description": "New Description",
                "_id": "5aaf22a365589a0acef87443",
                "name": "The Coffee Shop New Name",
            }

+ Response 200 (application/json)
    + Schema

            {
                "description": "New Description",
                "_id": "5aaf22a365589a0acef87443",
                "name": "The Coffee Shop New Name",
            }
            
### DELETE [DELETE]

+ Response 200 (application/json)
    + Schema
    
            {
                "_id": "5aaf22a365589a0acef87443",
            }


# Group Accounts

## /accounts

See list of all accounts.

### GET [GET]

+ Response 200 (application/json)
    + Schema 
    
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


## /accounts/{id}

CRUD operations of an account. Available to privileged accounts

+ Parameters
    + id (number) - ID of the account in the form of an ObjectID

### GET [GET]

+ Response 200 (application/json)
    + Schema

             {
                "account": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "username": "user1",
                        "merchant": "5aaf22a365589a0acef87444",
                        "user": "5aaf22a565589a0acef874a8"
                    }
                ]
            }
            
### PUT [PUT]

+ Request (application/json)
    + Schema
    
            {
                "_id": "5aaf22a565589a0acef8750c",
                "username": "newusername",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }

+ Response 200 (application/json)
    + Schema

            {
                "_id": "5aaf22a565589a0acef8750c",
                "username": "newusername",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }

### PATCH [PATCH]

+ Request (application/json)
    + Schema
    
            {
                "username": "newusername",
            }

+ Response 200 (application/json)
    + Schema

            {
                "_id": "5aaf22a565589a0acef8750c",
                "username": "newusername",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }
            
### DELETE [DELETE]

+ Response 200 (application/json)
    + Schema
    
            {
                "_id": "5aaf22a365589a0acef87443",
            }


# Group Users

## /users

See list of all users.

### GET [GET]

+ Response 200 (application/json)
    + Schema 
    
            {
                "users": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "username": "user1",
                        "merchant": "5aaf22a365589a0acef87444",
                        "user": "5aaf22a565589a0acef874a8"
                    }
                ]
            }


## /users/{id}

CRUD operations of a user object. Available to privileged accounts

+ Parameters
    + id (number) - ID of the user in the form of an ObjectID

### GET [GET]

+ Response 200 (application/json)
    + Schema

             {
                "user": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "username": "user1",
                        "merchant": "5aaf22a365589a0acef87444",
                        "user": "5aaf22a565589a0acef874a8"
                    }
                ]
            }
            
### PUT [PUT]

+ Request (application/json)
    + Schema
    
            {
                "_id": "5aaf22a565589a0acef8750c",
                "username": "newusername",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }

+ Response 200 (application/json)
    + Schema

            {
                "_id": "5aaf22a565589a0acef8750c",
                "username": "newusername",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }

### PATCH [PATCH]

+ Request (application/json)
    + Schema
    
            {
                "username": "newusername",
            }

+ Response 200 (application/json)
    + Schema

            {
                "_id": "5aaf22a565589a0acef8750c",
                "username": "newusername",
                "merchant": "5aaf22a365589a0acef87444",
                "user": "5aaf22a565589a0acef874a8"
            }
            
### DELETE [DELETE]

+ Response 200 (application/json)
    + Schema
    
            {
                "_id": "5aaf22a365589a0acef87443",
            }

# Group Transactions

## /transactions

See list of all transactions.

### GET [GET]

+ Response 200 (application/json)
    + Schema 
    
            {
                "users": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "item": "blue toy",
                        "merchant": "5aaf22a365589a0acef87444"
                    }
                ]
            }


## /transactions/{id}

CRUD operations of a transaction model. Available to privileged accounts

+ Parameters
    + id (number) - ID of the transaction in the form of an ObjectID

### GET [GET]

+ Response 200 (application/json)
    + Schema

             {
                "user": [
                    {
                        "_id": "5aaf22a565589a0acef8750c",
                        "item": "blue toy",
                        "merchant": "5aaf22a365589a0acef87444"
                    }
                ]
            }
            
### PATCH [PATCH]

+ Request (application/json)
    + Schema
    
            {
                "item": "blue toy red",
            }

+ Response 200 (application/json)
    + Schema

            {
                "item": "blue toy red",
            }
            
### DELETE [DELETE]

+ Response 200 (application/json)
    + Schema
    
            {
                "_id": "5aaf22a365589a0acef87443",
            }
            

