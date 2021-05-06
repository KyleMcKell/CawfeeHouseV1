import config from '../../../config/config';

const prisma = config.prisma;

const getAllMethodsPrisma = async (ownerId: number) => {
	const methods = await prisma.method.findMany({
		where: { ownerId },
	});

	return methods;
};

export default getAllMethodsPrisma;
