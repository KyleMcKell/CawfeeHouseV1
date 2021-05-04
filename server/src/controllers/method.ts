import { Method } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../config/logging';
import createMethod from '../functions/prisma/method/createMethod';

const NAMESPACE = 'Method';

const addMethod = (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;
		const { methodName, about } = req.body as Method;
		if (methodName && ownerId) {
			const newMethod = createMethod(ownerId, methodName, about);
			return res.status(201).json(newMethod);
		} else if (!ownerId) {
			return res.status(401).json('User not Authorized');
		} else if (!methodName) {
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

export default { addMethod };
