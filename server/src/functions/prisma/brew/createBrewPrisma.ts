import config from '../../../config/config';

const prisma = config.prisma;

const createBrewPrisma = async (
	ownerId: number,
	name: string,
	methodId: number,
	coffeeId: number,

	flavorings: string | null,
	favorite: boolean | null,
	about: string | null
) => {
	const newBrew = await prisma.brew.create({
		data: {
			ownerId,
			methodId,
			coffeeId,
			name,
			flavorings,
			favorite,
			about,
		},
	});

	return newBrew;
};

export default createBrewPrisma;
