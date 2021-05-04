import UserLoginType from '../../types/user/UserLoginType';
import findUser from '../../functions/prisma/user/findUser';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import signUserJWT from '../../functions/signUserJWT';
import logging from '../../config/logging';

const NAMESPACE = 'User';

//$ Login user and return token and user object
const loginUser = async (req: Request, res: Response) => {
	const { userId, password } = req.body as UserLoginType;

	try {
		const user = await findUser(userId);
		if (!user) {
			return res.status(404).json(`User "${userId}" not found`);
		}
		//$ Compare password with bcrypt hash
		bcryptjs.compare(password, user.password, (error, result) => {
			if (error) {
				return res.status(401).json({
					message: 'Password Mismatch',
				});
			} else if (result) {
				//$ Sign a JWT to user if password matches
				signUserJWT(user, (error, token) => {
					if (error) {
						return res.status(401).json({
							message: 'Unable to Sign JWT',
							error,
						});
					} else if (token) {
						return res.status(200).json({
							message: 'Auth Successful',
							token,
						});
					}
				});
			}
		});
	} catch (error) {
		logging.error(NAMESPACE, error.message, error);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default loginUser;
