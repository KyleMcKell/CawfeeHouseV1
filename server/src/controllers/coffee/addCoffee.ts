import { Coffee } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import { createCoffeePrisma } from '../../functions/prisma/coffee';

const NAMESPACE = 'Coffee';

const addCoffee = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id; //$ res.locals.jwt set in middleware
		const { name, brand, notes, roast, favorite, about } = req.body as Coffee; //$ Request body mirrors Coffee prisma Model
		if (name && ownerId) {
			const coffee = await createCoffeePrisma(
				ownerId,
				name,
				brand,
				notes,
				roast,
				favorite,
				about
			);
			res.status(201).json({ message: coffee });
		} else if (!ownerId) {
			//$ If owner doesn't exist, user wasn't authorized or isn't logged in, or session has expired
			res.status(401).json({ message: 'Unauthorized' });
		} else if (!name) {
			//$ If Coffee Name isn't provided, cannot create coffee
			res.status(204).json({ message: 'Coffee Not Provided' });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default addCoffee;
