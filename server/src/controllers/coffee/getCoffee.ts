import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getCoffeePrisma } from '../../functions/coffee';

const NAMESPACE = 'Coffee';

const getCoffee = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (ownerId && id) {
			const coffee = await getCoffeePrisma(ownerId, parseInt(id));

			return res.status(200).json({ message: coffee });
		} else if (!ownerId) {
			return res.status(401).json({ message: 'Unauthorized' });
		} else if (!id) {
			return res.status(400).json({ message: 'Coffee Id Not Provided' });
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

export default getCoffee;
