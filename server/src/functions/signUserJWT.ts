import { User } from '.prisma/client';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = 'Auth';

//$ Signs token for JWT
const signUserJWT = (
	user: User,
	callback: (error: Error | null, token: string | null) => void
): void => {
	//$ Sets time for expiring token
	const timeSinceEpoch = new Date().getTime();
	const expirationTime =
		timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
	const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

	logging.info(NAMESPACE, `Attempting to sign token for ${user.username}`);

	try {
		jwt.sign(
			{
				username: user.username,
				email: user.email,
				id: user.id,
				isAdmin: user.isAdmin,
			},
			config.server.token.secret,
			{
				issuer: config.server.token.issuer,
				algorithm: 'HS256',
				expiresIn: expirationTimeInSeconds,
			},
			(error, token) => {
				if (error) {
					callback(error, null);
				} else if (token) {
					callback(null, token);
				}
			}
		);
	} catch (error) {
		logging.error(NAMESPACE, error.message, error);
		callback(error, null);
	}
};

export default signUserJWT;
