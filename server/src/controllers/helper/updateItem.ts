import { Brew, Method, Coffee } from '@prisma/client';
import { Request, Response } from 'express';
import logging from '../../config/logging';
import { isStringNumber } from '../../functions/utils';
import PrismaBaristaItems from '../../types/PrismaBaristaItems';

const updateItem = async (
	req: Request,
	res: Response,
	NAMESPACE: string,
	updateItemPrisma: (id: number, ...rest: any[]) => Promise<PrismaBaristaItems>
) => {
	try {
		const ownerId: number = res.locals.jwt.id;
		const { id } = req.params;

		if (!isStringNumber(id)) {
			return res.status(400).json({ message: 'Invalid id provided' });
		}

		const parsedId = parseInt(id);

		let params: any[];
		switch (NAMESPACE) {
			case 'Brew': {
				const {
					methodId,
					coffeeId,
					name,
					flavorings,
					favorite,
					about,
				} = req.body as Brew;
				params = [name, methodId, coffeeId, flavorings, favorite, about];
				break;
			}
			case 'Method': {
				const {
					name,
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
					name,
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
				const {
					name,
					brand,
					notes,
					roast,
					favorite,
					about,
				} = req.body as Coffee;
				params = [name, brand, notes, roast, favorite, about];
				break;
			default: {
				params = [];
				break;
			}
		}

		if (ownerId && id) {
			const item = await updateItemPrisma(parsedId, ...params);
			res.status(200).json({ message: `${NAMESPACE} updated`, item });
		} else if (!ownerId) {
			res.status(401).json({ message: 'Unauthorized' });
		} else if (!id) {
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
export default updateItem;
