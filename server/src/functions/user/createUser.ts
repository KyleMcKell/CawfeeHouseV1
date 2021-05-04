import { User } from '@prisma/client';
import { Response } from 'express';
import config from '../../config/config';

const prisma = config.prisma;

//$ Creates user in database with prisma
const createUser = async (hash: string, username: string, email: string) => {
	const newUser = await prisma.user.create({
		data: {
			username,
			email,
			password: hash,
			isAdmin: false, //? Default admin to false
		},
	});

	return newUser;
};

export default createUser;
