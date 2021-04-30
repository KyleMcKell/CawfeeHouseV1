import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';
import config from '../config/config';
import IUser from '../interfaces/user';

const pg = config.database;

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
			let query =
				'INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *';

			const newUser = await pg.query(query, [username, email, hash]);
			res.json(newUser.rows);
		} catch (error) {
			logging.error(NAMESPACE, error.message, error);

			return res.status(500).json({
				message: error.message,
				error,
			});
		}
	});
};

//$ Login user and return token and user object
const login = async (req: Request, res: Response, next: NextFunction) => {
	let { userLoginID, password } = req.body;

	//$ Set a fetchParameter to tell if the userLoginID provided was an email or a username
	let fetchParameter;

	if (userLoginID.includes('@')) {
		//$ If the userLoginID has an @ symbol, parameter is the email
		fetchParameter = 'email';
		logging.info(NAMESPACE, 'Logging in with email');
	} else {
		//$ If the userLoginID doesn't contain and @, parameter is the username
		fetchParameter = 'username';
		logging.info(NAMESPACE, 'Logging in with username');
	}

	try {
		//$ Query selects an array of length 1 where the fetchParameter matches
		let query = `SELECT * FROM users WHERE ${fetchParameter} = $1`;

		const users = await pg.query<IUser>(query, [userLoginID]);

		//$ Compare password with bcrypt hash
		bcryptjs.compare(password, users.rows[0].password, (error, result) => {
			if (error) {
				return res.status(401).json({
					message: 'Password Mismatch',
				});
			} else if (result) {
				//$ Sign a JWT to user if password matches
				signJWT(users.rows[0], (error, token) => {
					if (error) {
						return res.status(401).json({
							message: 'Unable to Sign JWT',
							error,
						});
					} else if (token) {
						return res.status(200).json({
							message: 'Auth Successful',
							token,
							user: users.rows[0],
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
		let query = `SELECT id, username, email, password FROM users`;

		const users = await pg.query<IUser>(query);

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
