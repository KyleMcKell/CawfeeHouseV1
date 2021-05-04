import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getBrewPrisma } from '../../functions/brew';

const NAMESPACE = 'Brew';

const getBrew = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (ownerId) {
			const brew = await getBrewPrisma(ownerId, parseInt(id));

			res.status(200).json(brew);
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

export default getBrew;
