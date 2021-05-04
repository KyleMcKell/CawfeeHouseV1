import { Brew } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import createBrew from '../../functions/brew/createBrew';

const NAMESPACE = 'Brew';

const addBrew = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;
		const {
			methodId,
			coffeeId,
			brewName,
			ratio,
			brewTime,
			waterTemp,
			flavorings,
			grindSize,
			ingredients,
			isFavorite,
			about,
		} = req.body as Brew;
		if (brewName && ownerId) {
			const newBrew = await createBrew(
				ownerId,
				methodId,
				coffeeId,
				brewName,
				ratio,
				brewTime,
				waterTemp,
				flavorings,
				grindSize,
				ingredients,
				isFavorite,
				about
			);
			res.status(201).json(newBrew);
		} else if (!ownerId) {
			return res.status(401).json('User not Authorized');
		} else if (!brewName) {
			return res.status(204).json('Brew Not Provided');
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
