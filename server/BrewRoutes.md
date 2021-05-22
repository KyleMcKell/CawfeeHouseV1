# Method Routes for CawfeeHouse

## Add a Brew

**_POST_**: /brew/add

Adds a brew to the database.

Requires JWT

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

## Get all brews for a user

**_GET_**: /brew

Requires JWT

Get all brews that belong to a user

## Get brew from Id

**_GET_**: /brew/:id

Requires JWT

Get a brew from its id, passed as req.params

## Delete brew from Id

**_DELETE_**: /brew/:id
