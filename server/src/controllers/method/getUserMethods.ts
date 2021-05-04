import config from '../../config/config';
import logging from '../../config/logging';
import { Request, Response } from 'express';

const NAMESPACE = 'Method';

const prisma = config.prisma;

const getUserMethods = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		if (ownerId) {
			const methods = await prisma.method.findMany({
				where: { ownerId },
			});
			res.status(200).json(methods);
			await prisma.$disconnect();
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

export default getUserMethods;
