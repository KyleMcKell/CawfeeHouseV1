# User Routes for CawfeeHouse

## Registering User

**_POST_**: /users/register

Send in JSON containing username, password, and email

## Logging in User

**_POST_**: /users/login

Send in JSON containing userLoginID and password

**userLoginID**: string containing what the user puts into the sign in field, will be either an email or a username and treated accordingly

## Get all Users

**_GET_**: /users/get/all

Gets all users from database

Protected route

## Validate User

**_GET_**: /users/validate

Validates user via a middleware to see if they can perform an action

Protected Route

Requires Bearer Token
