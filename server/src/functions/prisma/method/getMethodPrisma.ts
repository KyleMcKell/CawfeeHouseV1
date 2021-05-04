import config from '../../../config/config';

const prisma = config.prisma;

const getMethodPrisma = async (ownerId: number, id: number) => {
	const newMethod = await prisma.method.findFirst({
		where: { id, ownerId },
	});

	return newMethod;
};

export default getMethodPrisma;
