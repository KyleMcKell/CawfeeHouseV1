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
				admin: false, //? Default admin to false, adding functionality to change admin permissions later
			},
		});
		return newUser;
	} catch (error) {
		//$ returns undefined which is handled as a user already exists in database in controller
		return;
	}
};

export default createUser;
