# Coffee Routes for CawfeeHouse

## Add a Coffee

**_POST_**: /coffee/add

Adds a coffee to the database.

Request body must contain:
{
coffeeName: string,
brand: string | null,
notes: string | null,
roastType: string | null,
about: string | null
}

Sends JSON to Database containing:
{
ownerId,
coffeeName,
brand,
notes,
roastType,
about,
}

ownerId: Int = Id of user who added coffee

coffeeName: String = Name given to coffee by user

brand?: String = Brand of coffee

notes?: String = Flavor notes of coffee

roastType?: String = Roast Type of coffee

about?: String = Any additional info about coffee
