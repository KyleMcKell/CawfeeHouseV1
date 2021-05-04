# Method Routes for CawfeeHouse

## Add a Method

**_POST_**: /method/add

Adds a method to the database.

Request body must contain:
{
methodName: string,
about: string | null
}

Sends JSON to Database containing:
{
ownerId,
methodName,
about,
}

ownerId: Int = Id of user who added method

methodName: String = Name given to method by user

about?: String = Info on how to do the method
