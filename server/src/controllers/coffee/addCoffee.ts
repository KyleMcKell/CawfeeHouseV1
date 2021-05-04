import { Coffee } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import createCoffee from '../../functions/coffee/createCoffee';

const NAMESPACE = 'Coffee';

const addCoffee = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id; //$ res.locals.jwt set in middleware
		const { coffeeName, brand, notes, roastType, about } = req.body as Coffee; //$ Request body mirrors Coffee prisma Model
		if (coffeeName && ownerId) {
			const newCoffee = await createCoffee(
				ownerId,
				coffeeName,
				brand,
				notes,
				roastType,
				about
			);
			return res.status(201).json(newCoffee);
		} else if (!ownerId) {
			//$ If owner doesn't exist, user wasn't authorized or isn't logged in, or session has expired
			return res.status(401).json('User not Authorized');
		} else if (!coffeeName) {
			//$ If Coffee Name isn't provided, cannot create coffee
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

export default addCoffee;
