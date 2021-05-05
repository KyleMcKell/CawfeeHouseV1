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

## Get user coffees

**_GET_**: /coffee

Get all coffees that belong to a user

## Get coffee from Id

**_GET_**: /coffee/:id

Get a coffee from its id, passed as req.params
