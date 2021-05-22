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

## Get all methods for a user

**_GET_**: /method

Requires JWT

Get all methods that belong to a user

## Get method from Id

**_GET_**: /method/:id

Requires JWT

Get a method from its id, passed from req.params

## Delete method from Id

**_DELETE_**: /method/:id

Requires JWT

Deletes a method from its id, passed from req.params

## Update a method from Id

**_PATCH_**: /method/:id

Requires JWT

Updates a method from its id, passed from req.params

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
