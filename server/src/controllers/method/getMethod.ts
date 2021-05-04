import config from '../../config/config';
import logging from '../../config/logging';
import { Request, Response } from 'express';

const NAMESPACE = 'Method';

const prisma = config.prisma;

const getMethod = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (ownerId) {
			const method = await prisma.method.findFirst({
				where: { id: parseInt(id), ownerId },
			});

			res.status(200).json(method);
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

export default getMethod;
