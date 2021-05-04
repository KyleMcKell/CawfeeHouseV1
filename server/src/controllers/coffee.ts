import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import config from '../config/config';
import createCoffee from '../functions/prisma/coffee/createCoffee';

const NAMESPACE = 'Coffee';

const addCoffee = (req: Request, res: Response, next: NextFunction) => {
	try {
		const ownerId: number = res.locals.jwt.id;
		const { coffeeName, brand, notes, roastType, about } = req.body;
		if (coffeeName && ownerId) {
			const newCoffee = createCoffee(
				ownerId,
				coffeeName,
				brand,
				notes,
				roastType,
				about
			);
			return res.status(201).json(newCoffee);
		} else if (!ownerId) {
			return res.status(401).json('User not Authorized');
		} else if (!coffeeName) {
			return res.status(204).json('Coffee Not Provided');
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default { addCoffee };
