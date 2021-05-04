import config from '../../config/config';

const prisma = config.prisma;

const getAllUsersPrisma = () => {
	const users = prisma.user.findMany();

	return users;
};

export default getAllUsersPrisma;
