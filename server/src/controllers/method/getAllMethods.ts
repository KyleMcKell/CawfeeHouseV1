import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getAllMethodsPrisma } from '../../functions/method';

const NAMESPACE = 'Method';

const getAllMethods = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		if (ownerId) {
			const methods = await getAllMethodsPrisma(ownerId);
			res.status(200).json({ message: methods });
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

export default getAllMethods;
