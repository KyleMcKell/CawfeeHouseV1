# Method Routes for CawfeeHouse

## Add a Method

**_POST_**: /brew/add

Adds a brew to the database.

Request body must contain:
{
coffeeId: number,
methodId: number,
brewName: string,
ratio: number | null,
brewTime: number | null,
waterTemp: number | null,
flavorings: string | null,
grindSize: string | null,
ingredients: string | null,
isFavorite: boolean | undefined,
about: string | null
}

Sends JSON to Database containing:
{
ownerId,
methodId,
coffeeId,
brewName,
ratio,
brewTime,
waterTemp,
flavorings,
grindSize,
ingredients,
isFavorite,
about,
}

ownerId: Int = Id of user who added method

methodName: String = Name given to method by user

about?: String = Info on how to do the method