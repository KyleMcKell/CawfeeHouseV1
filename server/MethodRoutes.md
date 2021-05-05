# Method Routes for CawfeeHouse

## Add a Method

**_POST_**: /method/add

Adds a method to the database.

Request body must contain:
{
name: string,
equipment: string | null,
ingredients: string | null,
brewTime: number | null,
temperature: number | null,
grindSize: string | null,
ratio: number | null,
favorite: boolean | null,
about: string | null
}

Sends JSON to Database containing:
{
ownerId,
name,
equipment,
ingredients,
brewTime,
temperature,
grindSize,
ratio,
favorite,
about
}

## Get user methods

**_GET_**: /method

Get all methods that belong to a user

## Get method from Id

**_GET_**: /method/:id

Get a method from its id, passed as req.params
