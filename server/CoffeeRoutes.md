# Coffee Routes for CawfeeHouse

## Add a Coffee

**_POST_**: /coffee/add

Adds a coffee to the database.

Sends JSON containing:
{
ownerId,
coffeeName,
brand,
notes,
roastType,
about,
barista,
brews
}

ownerId: Int = Id of user who added coffee

coffeeName: String = Name given to coffee by user

brand?: String = Brand of coffee

notes?: String = Flavor notes of coffee

roastType?: String = Roast Type of coffee

about?: String = Any additional info about coffee

barista?: User = User of coffee

brews: Brew[] = Array of Brews associated to coffee
