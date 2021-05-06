import logging from '../../config/logging';
import { Request, Response } from 'express';
import PrismaBaristaItems from '../../types/PrismaBaristaItems';

const getAllOfItem = async (
	req: Request,
	res: Response,
	NAMESPACE: string,
	getAllOfItemPrisma: (ownerId: number) => Promise<PrismaBaristaItems[]>
) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		if (ownerId) {
			const items = await getAllOfItemPrisma(ownerId);

			res.status(200).json({ message: items });
		} else {
			res.status(403).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default getAllOfItem;
