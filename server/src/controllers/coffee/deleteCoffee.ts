import logging from '../../config/logging';
import { Request, Response } from 'express';
import { deleteCoffeePrisma, getCoffeePrisma } from '../../functions/coffee';
import { isStringNumber } from '../../functions/helper';

const NAMESPACE = 'Coffee';

const deleteCoffee = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		const parsedId = parseInt(id);

		const fetchedCoffee = await getCoffeePrisma(ownerId, parsedId);

		if (!isStringNumber(id)) {
			res.status(400).json({ message: 'Invalid id provided' });
		} else if (!fetchedCoffee) {
			res.status(404).json({ message: 'Coffee not found' });
		} else if (fetchedCoffee) {
			const coffee = await deleteCoffeePrisma(parsedId);
			res.status(200).json({ message: 'Coffee Deleted', coffee });
		} else {
			res.status(500).json({ message: 'Unknown error' });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default deleteCoffee;
