import { Brew } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import { createBrewPrisma } from '../../functions/brew';

const NAMESPACE = 'Brew';

const addBrew = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;
		const {
			methodId,
			coffeeId,
			name,
			flavorings,
			favorite,
			about,
		} = req.body as Brew;
		if (name && ownerId) {
			const brew = await createBrewPrisma(
				ownerId,
				methodId,
				coffeeId,
				name,
				flavorings,
				favorite,
				about
			);
			res.status(201).json({ message: 'Brew Created', brew });
		} else if (!ownerId) {
			res.status(401).json({ message: 'Unauthorized' });
		} else if (!name) {
			res.status(204).json({ message: 'Brew Not Provided' });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default addBrew;
