import logging from '../../config/logging';
import { Response } from 'express';
import { getAllCoffeesPrisma } from '../../functions/coffee';

const NAMESPACE = 'Coffee';

const getAllCoffees = async (res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		if (ownerId) {
			const coffees = await getAllCoffeesPrisma(ownerId);
			res.status(200).json({ message: coffees });
		} else {
			res.status(403).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default getAllCoffees;
