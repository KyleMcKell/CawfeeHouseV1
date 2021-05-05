import { Method } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import { createMethodPrisma } from '../../functions/method';

const NAMESPACE = 'Method';

const addMethod = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id; //$ res.locals.jwt set in middleware
		const {
			name,
			equipment,
			ingredients,
			brewTime,
			temperature,
			grindSize,
			ratio,
			favorite,
			about,
		} = req.body as Method; //$ Request body mirrors Method prisma Model
		if (name && ownerId) {
			const newMethod = await createMethodPrisma(
				ownerId,
				name,
				equipment,
				ingredients,
				brewTime,
				temperature,
				grindSize,
				ratio,
				favorite,
				about
			);
			return res.status(201).json({ message: 'Method Created', newMethod });
		} else if (!ownerId) {
			//$ If JWT doesn't control ownerId, user isn't auth'd
			return res.status(401).json({ message: 'Unauthorized' });
		} else if (!name) {
			//$ If Method Name isn't provided, cannot create method
			return res.status(204).json({ message: 'Method Not Provided' });
		} else {
			return res.status(500).json({ message: 'Internal Error' });
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
