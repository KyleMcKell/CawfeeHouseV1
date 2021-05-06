import logging from '../../config/logging';
import { Request, Response } from 'express';
import { deleteBrewPrisma } from '../../functions/brew';
import { isStringNumber } from '../../functions/helper';

const NAMESPACE = 'Brew';

const deleteBrew = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (!ownerId) {
			res.status(403).json({ message: 'Unauthorized' });
		} else if (!isStringNumber(id)) {
			res.status(400).json({ message: 'Invalid id provided' });
		} else if (ownerId) {
			const brew = await deleteBrewPrisma(parseInt(id));
			if (!brew) {
				res.status(404).json({ message: 'Brew not found' });
			} else if (brew) {
				res.status(200).json({ message: 'Brew Deleted', brew });
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

export default deleteBrew;
