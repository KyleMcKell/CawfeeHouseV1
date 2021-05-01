# User Routes for CawfeeHouse

## Registering User

**_Route_**: _POST_ /users/register

Send in JSON containing username, password, and email

## Logging in User

**_Route_**: _POST_ /users/login

Send in JSON containing userLoginID and password

**userLoginID**: string containing what the user puts into the sign in field, will be either an email or a username and treated accordingly
