import logging from '../../config/logging';
import { Request, Response } from 'express';
import { isStringNumber } from '../../functions/utils';
import PrismaBaristaItems from '../../types/PrismaBaristaItems';

const getItem = async (
	req: Request,
	res: Response,
	NAMESPACE: string,
	getItemPrisma: (
		ownerId: number,
		id: number
	) => Promise<PrismaBaristaItems | null>
) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		const parsedId = parseInt(id);

		if (!isStringNumber(id)) {
			return res.status(400).json({ message: 'Invalid id provided' });
		}

		const item = await getItemPrisma(ownerId, parsedId);

		if (item) {
			res.status(200).json({ message: item });
		} else {
			res.status(404).json({ message: `${NAMESPACE} not found` });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default getItem;
