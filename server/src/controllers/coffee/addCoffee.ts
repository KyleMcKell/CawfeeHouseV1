import { Coffee } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import { createCoffeePrisma } from '../../functions/coffee';

const NAMESPACE = 'Coffee';

const addCoffee = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id; //$ res.locals.jwt set in middleware
		const { name, brand, notes, roast, favorite, about } = req.body as Coffee; //$ Request body mirrors Coffee prisma Model
		if (name && ownerId) {
			const newCoffee = await createCoffeePrisma(
				ownerId,
				name,
				brand,
				notes,
				roast,
				favorite,
				about
			);
			return res.status(201).json(newCoffee);
		} else if (!ownerId) {
			//$ If owner doesn't exist, user wasn't authorized or isn't logged in, or session has expired
			return res.status(401);
		} else if (!name) {
			//$ If Coffee Name isn't provided, cannot create coffee
			return res.status(204);
		} else {
			return res.status(500);
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
