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

**_GET_**: /user

Requires JWT and user to be an admin

Gets all users from database

## Validate User

**_GET_**: /user/validate

Requires JWT

Test Route to check to see if JWT is valid
