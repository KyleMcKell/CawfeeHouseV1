import { Request, Response } from 'express';
import logging from '../../config/logging';
import bcryptjs from 'bcryptjs';
import { User } from '@prisma/client';
import { createUserPrisma } from '../../functions/prisma/user';

const NAMESPACE = 'User';

//$ Create a new user and store in DB
const registerUser = (req: Request, res: Response) => {
	let { username, email, password } = req.body as User; //$ Request body mirrors User prisma Model

	bcryptjs.hash(password, 10, async (hashError, hash) => {
		if (hashError) {
			return res
				.status(500)
				.json({ message: hashError.message, error: hashError });
		}
		try {
			//$ Creates new user then responds with json the user
			const newUser = createUserPrisma(hash, username, email);
			res.status(201).json(newUser);
		} catch (error) {
			//$ If failure, respond with a 500 server error
			logging.error(NAMESPACE, error.message, error);

			return res.status(500).json({
				message: error.message,
				error,
			});
		}
	});
};

export default registerUser;
