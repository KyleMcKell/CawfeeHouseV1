import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const NAMESPACE = 'Auth';

//$ extracts the JWT on each request to ensure proper permissions are met
const extractJWT = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Validating Token');

	let token = req.headers.authorization?.split(' ')[1];

	if (token) {
		jwt.verify(token, config.server.token.secret, (error, token) => {
			if (error) {
				return res.status(404).json({
					message: error.message,
					error,
				});
			} else {
				res.locals.jwt = token;
				return next();
			}
		});
	} else {
		return res.status(401).json({
			message: 'Unauthorized',
		});
	}
	return;
};

export default extractJWT;
