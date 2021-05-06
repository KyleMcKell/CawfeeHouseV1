import config from '../../config/config';

const prisma = config.prisma;

const deleteUserPrisma = async (id: number) => {
	const deletedUser = await prisma.user.delete({
		where: { id },
	});

	return deletedUser;
};

export default deleteUserPrisma;
