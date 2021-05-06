import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getBrewPrisma } from '../../functions/brew';
import { isStringNumber } from '../../functions/utils';

const NAMESPACE = 'Brew';

const getBrew = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (!ownerId) {
			res.status(403).json({ message: 'Unauthorized' });
		} else if (!isStringNumber(id)) {
			res.status(400).json({ message: 'Invalid id provided' });
		} else if (ownerId) {
			const brew = await getBrewPrisma(ownerId, parseInt(id));
			if (!brew) {
				res.status(404).json({ message: 'Brew not found' });
			} else if (brew) {
				res.status(200).json({ message: brew });
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

export default getBrew;
