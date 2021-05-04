import config from '../../config/config';

const prisma = config.prisma;

const getBrewPrisma = async (ownerId: number, id: number) => {
	const newBrew = await prisma.brew.findFirst({
		where: { id, ownerId },
	});

	return newBrew;
};

export default getBrewPrisma;
