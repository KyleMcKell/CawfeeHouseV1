import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import logging from '../config/logging';
import createCoffee from '../functions/prisma/coffee/createCoffee';

const prisma = config.prisma;

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
		} else if (!coffeeName) {
			return res.status(204).json('Coffee Not Provided');
		} else if (!ownerId) {
			return res.status(401).json('User not Authorized');
		} else {
			return res.status(204);
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
	}
};

export default { addCoffee };
