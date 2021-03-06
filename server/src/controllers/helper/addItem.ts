import { Brew, Method, Coffee } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import PrismaBaristaItems from '../../types/PrismaBaristaItems';

const addItem = async (
	req: Request,
	res: Response,
	NAMESPACE: string,
	createItemPrisma: (
		ownerId: number,
		name: string,
		...rest: any[]
	) => Promise<PrismaBaristaItems>
) => {
	try {
		const ownerId: number = res.locals.jwt.id;
		const { name } = req.body;
		let params: any[];
		switch (NAMESPACE) {
			case 'Brew': {
				const {
					methodId,
					coffeeId,
					flavorings,
					favorite,
					about,
				} = req.body as Brew;
				params = [methodId, coffeeId, flavorings, favorite, about];
				if (!methodId || !coffeeId) {
					return res
						.status(400)
						.json({ message: `methodId and/or coffeeId not Provided` });
				}
				break;
			}
			case 'Method': {
				const {
					equipment,
					ingredients,
					brewTime,
					temperature,
					grindSize,
					ratio,
					favorite,
					about,
				} = req.body as Method;
				params = [
					equipment,
					ingredients,
					brewTime,
					temperature,
					grindSize,
					ratio,
					favorite,
					about,
				];
				break;
			}
			case 'Coffee':
				const { brand, notes, roast, favorite, about } = req.body as Coffee;
				params = [brand, notes, roast, favorite, about];
				break;
			default: {
				params = [];
				break;
			}
		}

		if (name && ownerId) {
			const item = await createItemPrisma(ownerId, name, ...params);
			res.status(201).json({ message: `${NAMESPACE} Created`, item });
		} else if (!ownerId) {
			res.status(401).json({ message: 'Unauthorized' });
		} else if (!name) {
			res.status(400).json({ message: `${NAMESPACE} Not Provided` });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};
export default addItem;
