import config from '../../../config/config';

const prisma = config.prisma;

//$ Creates user in database with prisma
const createUser = async (hash: string, username: string, email: string) => {
	try {
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hash,
				admin: false, //? Default admin to false
			},
		});
		return newUser;
	} catch (error) {
		return;
	}
};

export default createUser;
