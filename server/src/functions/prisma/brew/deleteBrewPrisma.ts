import config from '../../../config/config';

const prisma = config.prisma;

const deleteBrewPrisma = async (id: number) => {
	const deletedBrew = await prisma.brew.delete({
		where: { id },
	});

	return deletedBrew;
};

export default deleteBrewPrisma;
