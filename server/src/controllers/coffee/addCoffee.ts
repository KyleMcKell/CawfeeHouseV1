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
			return res.status(201).json({ message: 'Coffee Created', newCoffee });
		} else if (!ownerId) {
			return res.status(401).json({ message: 'Unauthorized' });
		} else if (!name) {
			return res.status(204).json({ message: 'Brew Not Provided' });
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

export default addCoffee;
