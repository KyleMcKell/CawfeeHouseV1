import logging from '../../config/logging';
import { Response } from 'express';
import { getAllBrewsPrisma } from '../../functions/brew';

const NAMESPACE = 'Brew';

const getAllBrews = async (res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		if (ownerId) {
			const brews = await getAllBrewsPrisma(ownerId);

			res.status(200).json({ message: brews });
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

export default getAllBrews;
