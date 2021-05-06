import config from '../../../config/config';

const prisma = config.prisma;

const updateBrewPrisma = async (
	id: number,
	name: string,
	methodId: number,
	coffeeId: number,
	flavorings: string | null,
	favorite: boolean | null,
	about: string | null
) => {
	const updatedBrew = await prisma.brew.update({
		where: { id },
		data: {
			methodId,
			coffeeId,
			name,
			flavorings,
			favorite,
			about,
		},
	});

	return updatedBrew;
};

export default updateBrewPrisma;
