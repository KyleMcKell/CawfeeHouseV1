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
const register = async (req: Request, res: Response, next: NextFunction) => {
	let { username, email, password } = req.body;

	bcryptjs.hash(password, 10, async (hashError, hash) => {
		if (hashError) {
			return res
				.status(500)
				.json({ message: hashError.message, error: hashError });
		}

		let query =
			'INTO INTO Users (username, email, password) VALUES($1, $2, $3) RETURNING *';

		const newUser = await pg.query(query, [username, email, password]);
		res.json(newUser.rows[0]);
	});

	//todo insert user into DB
};

//$ Login user and return token and user object
const login = (req: Request, res: Response, next: NextFunction) => {};

//$ Return all users in database without passwords
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};

export default { validateToken, register, login, getAllUsers };
