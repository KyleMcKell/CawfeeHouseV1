import config from '../../../config/config';

const prisma = config.prisma;

const deleteMethodPrisma = async (id: number) => {
	const deletedMethod = await prisma.method.delete({
		where: { id },
	});

	return deletedMethod;
};

export default deleteMethodPrisma;
