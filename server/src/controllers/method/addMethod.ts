import { Method } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import createMethod from '../../functions/method/createMethod';

const NAMESPACE = 'Method';

const addMethod = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id; //$ res.locals.jwt set in middleware
		const { methodName, about } = req.body as Method; //$ Request body mirrors Method prisma Model
		if (methodName && ownerId) {
			const newMethod = await createMethod(ownerId, methodName, about);
			return res.status(201).json(newMethod);
		} else if (!ownerId) {
			//$ If JWT doesn't control ownerId, user isn't auth'd
			return res.status(401).json('User not Authorized');
		} else if (!methodName) {
			//$ If Method Name isn't provided, cannot create method
			return res.status(204).json('Method Not Provided');
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default addMethod;
