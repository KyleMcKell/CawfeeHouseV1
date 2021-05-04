import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getCoffeePrisma } from '../../functions/coffee';

const NAMESPACE = 'Coffee';

const getCoffee = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (ownerId) {
			const coffee = await getCoffeePrisma(ownerId, parseInt(id));

			res.status(200).json(coffee);
		} else {
			return res.status(403);
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
