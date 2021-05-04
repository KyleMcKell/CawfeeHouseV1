import { Request, Response } from 'express';
import logging from '../../config/logging';
import config from '../../config/config';

const NAMESPACE = 'User';

const prisma = config.prisma;

//$ Return all users in database without passwords
const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();

		return res.status(200).json({
			users: users,
			count: users.length,
		});
	} catch (error) {
		logging.error(NAMESPACE, error.message, error);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default getAllUsers;
