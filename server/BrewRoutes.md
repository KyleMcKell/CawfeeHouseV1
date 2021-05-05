# Method Routes for CawfeeHouse

## Add a Brew

**_POST_**: /brew/add

Adds a brew to the database.

Request body must contain:
{
methodId: number,
coffeeId: number,
name: string,
flavorings: string | null,
favorite: boolean | null,
about: string | null
}

Sends JSON to Database containing:
{
ownerId,
methodId,
coffeeId,
name,
flavorings,
favorite,
about,
}

## Get all brews

**_GET_**: /brew

Get all brews that belong to a user

## Get brew from Id

**_GET_**: /brew/:id

Get a brew from its id, passed as req.params
