import config from '../../../config/config';

const prisma = config.prisma;

const updateBrewPrisma = async (
	id: number,
	methodId: number,
	coffeeId: number,
	name: string,
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
