import { Response } from 'express';
import logging from '../../config/logging';
import { getAllUsersPrisma } from '../../functions/user';

const NAMESPACE = 'User';

//$ Return all users in database without passwords
const getAllUsers = async (res: Response) => {
	const admin: boolean = res.locals.jwt.admin; //$ res.locals.jwt set in middleware

	if (admin) {
		try {
			const users = await getAllUsersPrisma();

			return res.status(200).json({
				message: users,
				count: users.length,
			});
		} catch (error) {
			logging.error(NAMESPACE, error.message, error);

			return res.status(500).json({
				message: error.message,
				error,
			});
		}
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
};

export default getAllUsers;
