import logging from '../config/logging';
import { Request, Response } from 'express';

const getCoffee = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (!ownerId) {
			res.status(403).json({ message: 'Unauthorized' });
		} else if (Number.isNaN(parseInt(id))) {
			res.status(400).json({ message: 'Invalid id provided' });
		} else if (ownerId) {
			const coffee = await getCoffeePrisma(ownerId, parseInt(id));

			if (!coffee) {
				res.status(404).json({ message: 'Coffee not found' });
			} else if (coffee) {
				res.status(200).json({ message: coffee });
			}
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default getCoffee;
