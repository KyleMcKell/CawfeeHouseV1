import config from '../../config/config';

const prisma = config.prisma;

const createMethodPrisma = async (
	ownerId: number,
	methodName: string,
	about: string | null
) => {
	const newMethod = await prisma.method.create({
		data: {
			ownerId,
			methodName,
			about,
		},
	});

	return newMethod;
};

export default createMethodPrisma;
