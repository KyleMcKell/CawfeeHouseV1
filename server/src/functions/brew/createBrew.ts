import config from '../../config/config';

const prisma = config.prisma;

const createBrew = async (
	ownerId: number,
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
) => {
	console.log(`Method Id: ${methodId}`);
	console.log(`Coffee Id: ${coffeeId}`);
	const newBrew = await prisma.brew.create({
		data: {
			ownerId,
			coffeeId,
			methodId,
			brewName,
			ratio,
			brewTime,
			waterTemp,
			flavorings,
			grindSize,
			ingredients,
			isFavorite,
			about,
		},
	});

	await prisma.$disconnect();

	return newBrew;
};

export default createBrew;
