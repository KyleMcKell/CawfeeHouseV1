import config from '../../config/config';
import logging from '../../config/logging';
import { Request, Response } from 'express';
import BrewSearchConstraintType from '../../types/brew/BrewSearchConstraintType';

const NAMESPACE = 'Brew';

const prisma = config.prisma;

const getUserBrews = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { methodId, coffeeId } = req.body as BrewSearchConstraintType;

		if (ownerId) {
			const brews = await prisma.brew.findMany({
				where: { ownerId, methodId, coffeeId },
			});

			res.status(200).json(brews);
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

export default getUserBrews;
