import logging from '../../config/logging';
import { Response } from 'express';
import { getAllMethodsPrisma } from '../../functions/method';

const NAMESPACE = 'Method';

const getAllMethods = async (res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		if (ownerId) {
			const methods = await getAllMethodsPrisma(ownerId);
			return res.status(200).json({ message: methods });
		} else {
			return res.status(401).json({ message: 'Unathorized' });
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
