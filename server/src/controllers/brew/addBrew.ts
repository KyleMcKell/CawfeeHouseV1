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
			const newBrew = await createBrewPrisma(
				ownerId,
				methodId,
				coffeeId,
				name,
				flavorings,
				favorite,
				about
			);
			return res.status(201).json({ message: 'Brew Created', newBrew });
		} else if (!ownerId) {
			return res.status(401).json({ message: 'Unauthorized' });
		} else if (!name) {
			return res.status(204).json({ message: 'Brew Not Provided' });
		} else {
			return res.status(500).json({ message: 'Internal Error' });
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
