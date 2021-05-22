# User Routes for CawfeeHouse

## Registering User

**_POST_**: /user/register

Request must contain, and sends to Database JSON containing:
{
username: string,
email: string,
password: string,
admin: boolean | null
}

## Logging in User

**_POST_**: /user/login

Request must contain:
{
userId: string,
password: string
}

**userId**: string containing what the user puts into the sign in field, will be either an email or a username and treated accordingly

**password** string containing password from request body, compared to hash stored in database

## Get all Users

**_GET_**: /user/get

Gets all users from database

Protected route

## Validate User

**_GET_**: /user/validate

Validates user via a middleware to see if they can perform an action

Protected Route

Requires Bearer Token
