import config from '../../config/config';

const prisma = config.prisma;

const getAllBrewsPrisma = async (ownerId: number) => {
	const brews = await prisma.brew.findMany({
		where: { ownerId },
	});

	return brews;
};

export default getAllBrewsPrisma;
