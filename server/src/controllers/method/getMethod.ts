import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getMethodPrisma } from '../../functions/method';

const NAMESPACE = 'Method';

const getMethod = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (ownerId) {
			const method = await getMethodPrisma(ownerId, parseInt(id));

			if (!method) {
				res.status(404).json({ message: 'Method not found' });
			} else if (method) {
				res.status(200).json({ message: method });
			}
		} else if (!ownerId) {
			res.status(403).json({ message: 'Unauthorized' });
		} else if (!id || parseInt(id) === NaN) {
			res.status(400).json({ message: 'Invalid id provided' });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default getMethod;
