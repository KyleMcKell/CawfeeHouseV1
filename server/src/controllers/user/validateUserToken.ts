import logging from '../../config/logging';
import { Response } from 'express';

const NAMESPACE = 'User';

//$ Protected Route for testing to make sure token provided is working properly
//$ Points to a middleware that extracts the jwt
const validateUserToken = (res: Response) => {
	logging.info(NAMESPACE, 'Token validated, user authorized');

	return res.status(200).json({
		message: 'Authorized',
	});
};

export default validateUserToken;
