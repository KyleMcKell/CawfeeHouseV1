import logging from '../../config/logging';
import { Request, Response } from 'express';
import { deleteMethodPrisma } from '../../functions/method';
import { isStringNumber } from '../../functions/helper';

const NAMESPACE = 'Method';

const deleteMethod = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (!ownerId) {
			res.status(403).json({ message: 'Unauthorized' });
		} else if (!isStringNumber(id)) {
			res.status(400).json({ message: 'Invalid id provided' });
		} else if (ownerId) {
			const method = await deleteMethodPrisma(parseInt(id));
			if (!method) {
				res.status(404).json({ message: 'Method not found' });
			} else if (method) {
				res.status(200).json({ message: 'Method Deleted', method });
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

export default deleteMethod;
