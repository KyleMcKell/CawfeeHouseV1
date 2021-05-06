import config from '../../../config/config';

const prisma = config.prisma;

const getAllUsersPrisma = async () => {
	const users = await prisma.user.findMany();

	return users;
};

export default getAllUsersPrisma;
