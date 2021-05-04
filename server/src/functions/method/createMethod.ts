import config from '../../config/config';

const prisma = config.prisma;

const createMethod = async (
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
	async () => {
		await prisma.$disconnect();
	};
	return newMethod;
};

export default createMethod;
