# Coffee Routes for CawfeeHouse

## Add a Coffee

**_POST_**: /coffee/add

Adds a coffee to the database.

Request body must contain:
{
name: string,
brand: string | null,
notes: string | null,
roast: string | null,
favorite: boolean | null,
about: string | null
}

Sends JSON to Database containing:
{
ownerId,
name,
brand,
notes,
roast,
favorite,
about,
}

## Get all coffees for a user

**_GET_**: /coffee

Requires JWT

Get all coffees that belong to a user

## Get coffee from Id

**_GET_**: /coffee/:id

Requires JWT

Get a coffee from its id, passed from req.params

## Delete coffee from Id

**_DELETE_**: /coffee/:id

Requires JWT

Deletes a coffee from its id, passed from req.params

## Update a coffee from Id

**_PATCH_**: /coffee/:id

Requires JWT

Updates a coffee from its id, passed from req.params

Request body must contain:
{
name: string,
brand: string | null,
notes: string | null,
roast: string | null,
favorite: boolean | null,
about: string | null
}

Sends JSON to Database containing:
{
ownerId,
name,
brand,
notes,
roast,
favorite,
about,
}
