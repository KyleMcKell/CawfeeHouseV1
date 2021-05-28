import UserLoginType from '../../types/UserLoginType';
import { getUserPrisma } from '../../functions/prisma/user';
import { signUserJWT } from '../../functions/utils';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import logging from '../../config/logging';

const NAMESPACE = 'User';

//$ Login user and return token and user object
const loginUser = async (req: Request, res: Response) => {
	const { userId, password } = req.body as UserLoginType;

	try {
		const user = await getUserPrisma(userId);
		if (!user) {
			logging.info(NAMESPACE, 'User not found');
			return res.status(404).json({ message: `User "${userId}" not found` });
		}
		//$ Compare password with bcrypt hash
		const match = await bcryptjs.compare(password, user.password);
		if (match) {
			//$ Sign a JWT to user if password matches
			signUserJWT(user, (error, token) => {
				if (error) {
					logging.error(NAMESPACE, 'Unable to Sign JWT', error);
					return res.status(401).json({
						message: 'Unable to Sign JWT',
						error,
					});
				} else if (token) {
					logging.info(NAMESPACE, 'Auth Successful');
					return res.status(200).json({
						message: 'Auth Successful',
						token,
					});
				}
			});
		} else {
			logging.info(NAMESPACE, 'Password Mismatch, Auth Unsuccessful');
			return res.status(401).json({
				message: 'Password Mismatch',
			});
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message, error);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default loginUser;
