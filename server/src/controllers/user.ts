import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';
import config from '../config/config';
import createUser from '../functions/prisma/createUser';
import findUser from '../functions/prisma/findUser';

const prisma = config.prisma;

const NAMESPACE = 'User';

//$ Protected Route for testing to make sure token provided is working properly
const validateToken = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Token validated, user authorized');

	return res.status(200).json({
		message: 'Authorized',
	});
};

//$ Create a new user and store in DB
const register = (req: Request, res: Response, next: NextFunction) => {
	let { username, email, password } = req.body;

	bcryptjs.hash(password, 10, async (hashError, hash) => {
		if (hashError) {
			return res
				.status(500)
				.json({ message: hashError.message, error: hashError });
		}
		try {
			createUser(hash, res, username, email);
		} catch (error) {
			logging.error(NAMESPACE, error.message, error);

			return res.status(500).json({
				message: error.message,
				error,
			});
		} finally {
			async () => {
				await prisma.$disconnect();
			};
		}
	});
};

//$ Login user and return token and user object
const login = async (req: Request, res: Response, next: NextFunction) => {
	const { userId, password } = req.body;

	try {
		const user = await findUser(userId);
		if (!user) {
			logging.error(NAMESPACE, `User ${userId} not found`);
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
				signJWT(user, (error, token) => {
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

//$ Return all users in database without passwords
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
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

export default { validateToken, register, login, getAllUsers };
