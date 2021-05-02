import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';
import config from '../config/config';
import { User } from '.prisma/client';

const pg = config.database;
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

	const createUser = async (hash: string) => {
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hash,
			},
		});
		res.json(newUser);
	};

	bcryptjs.hash(password, 10, async (hashError, hash) => {
		if (hashError) {
			return res
				.status(500)
				.json({ message: hashError.message, error: hashError });
		}
		try {
			createUser(hash);
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

//$ Defines the user Fetch Parameter for logging in
type LoginUserFetchParam = 'email' | 'username';

//$ Login user and return token and user object
const login = async (req: Request, res: Response, next: NextFunction) => {
	const { userLoginID, password } = req.body;

	let fetchParameter: LoginUserFetchParam; //$ Set a fetchParameter to tell if the userLoginID provided was an email or a username

	if (userLoginID.includes('@')) {
		fetchParameter = 'email'; //$ If the userLoginID has an @ symbol, parameter is the email
		logging.info(NAMESPACE, 'Logging in with email');
	} else {
		fetchParameter = 'username'; //$ If the userLoginID doesn't contain and @, parameter is the username
		logging.info(NAMESPACE, 'Logging in with username');
	}

	//$ finds the user with either their email or their username
	const findUser = async (fetchParameter: LoginUserFetchParam) => {
		let user;
		switch (fetchParameter) {
			case 'email':
				user = await prisma.user.findUnique({
					where: {
						email: userLoginID,
					},
				});
				break;
			case 'username':
				user = await prisma.user.findUnique({
					where: {
						username: userLoginID,
					},
				});
				break;
			default:
				return null;
		}

		return user;
	};

	try {
		const user = await findUser(fetchParameter);
		if (!user) {
			logging.error(NAMESPACE, `User ${userLoginID} not found`);
			return res.status(404).json(`User "${userLoginID}" not found`);
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
		let query = `SELECT id, username, email, password FROM "User"`;

		const users = await pg.query<User>(query);

		return res.status(200).json({
			users: users.rows,
			count: users.rows.length,
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
