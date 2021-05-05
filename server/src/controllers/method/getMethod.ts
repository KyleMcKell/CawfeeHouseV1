import logging from '../../config/logging';
import { Request, Response } from 'express';
import { getMethodPrisma } from '../../functions/method';

const NAMESPACE = 'Method';

const getMethod = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params!;

		if (ownerId && id) {
			const method = await getMethodPrisma(ownerId, parseInt(id));

			return res.status(200).json({ method });
		} else if (!ownerId) {
			return res.status(401);
		} else if (!id) {
			return res.status(400);
		} else {
			return res.status(500);
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
