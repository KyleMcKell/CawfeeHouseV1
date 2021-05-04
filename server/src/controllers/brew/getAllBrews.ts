import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getAllBrewsPrisma } from '../../functions/brew';

const NAMESPACE = 'Brew';

const getAllBrews = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		if (ownerId) {
			const brews = await getAllBrewsPrisma(ownerId);

			res.status(200).json(brews);
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

export default getAllBrews;
