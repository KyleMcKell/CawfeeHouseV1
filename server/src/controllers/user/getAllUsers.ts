import { Request, Response } from 'express';
import logging from '../../config/logging';
import { getAllUsersPrisma } from '../../functions/user';

const NAMESPACE = 'User';

//$ Return all users in database without passwords
const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await getAllUsersPrisma();

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
