import { Response } from 'express';
import config from '../../../config/config';

const prisma = config.prisma;

//$ Creates user in database with prisma
const createUser = async (
	hash: string,
	res: Response,
	username: string,
	email: string
) => {
	const newUser = await prisma.user.create({
		data: {
			username,
			email,
			password: hash,
			isAdmin: false, //? Default admin to false
		},
	});
	res.json(newUser);
};

export default createUser;
