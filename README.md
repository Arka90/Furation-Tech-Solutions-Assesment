# How to run this project locally ?

- Step 1 : Fork and download the project locally or download directly in zip format

- Step 2 : Locate to the folder and start Command Prompt or Power shell in the project folder

- Step 3 : Now install all the dependencies using `npm install`

- Step 4 : After installing the dependencies start the project using `npm start`

# How to use API end points

## Getting all items

URL:localhost:3000/api/item
METHOD: GET

## Getting one item

URL:localhost:3000/api/item/:id
METHOD: GET

## Creating item

**NOTE : This end point is secure you need to login and use your JWT token to create item**

URL:localhost:3000/api/item
METHOD: POST

This method expect an JSON object:

Example:

```
{
  "name":"XYZ",
  "price":100,
  "description":"ABC",
  "stock":50
}
```

**Name and Price are mandatory fields description is optional and stock has a default value of 50**

## Updating item

URL:localhost:3000/api/item/:id
METHOD: PUT

This method expect an JSON object:

Example:

```
{
  "field_to_update" : "value"
}
```

## Deleteing item

URL:localhost:3000/api/item/:id
METHOD: DELETE

# Authentication

## Registering as Admin

URL:localhost:8000/api/admin/register
Method: POST

This method expect an JSON object:

Example:

```
{
    "email":"name50@gmail.com",
    "name":"Jhon doe",
    "password":"test1234",
    "passwordConfirm":"test1234"
}
```

## Log In as a admin

URL:localhost:8000/api/admin/register
Method: POST

This request expect an JSON object:

Example:

```
{
    "email":"name50@gmail.com",
    "password":"test1234",

}
```

**This will return an JWT token**

# Packages Used

- Passport & passport-jwt for Authentication
- Winston for logging
- Mongoose for db operations
- Bcryptjs for encrypting password
- Validator for validating req body
- Jsonwebtoken to issue token
