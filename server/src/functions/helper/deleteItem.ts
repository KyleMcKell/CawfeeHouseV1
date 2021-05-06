import logging from '../../config/logging';
import { Request, Response } from 'express';
import { isStringNumber } from '../../functions/utils';
import { Coffee, Brew, User, Method } from '.prisma/client';

type PrismaItems = Coffee | Brew | User | Method;

const deleteItem = async (
	req: Request,
	res: Response,
	NAMESPACE: string,
	deleteItemPrisma: (id: number) => Promise<PrismaItems>,
	getItemPrisma: (ownerId: number, id: number) => Promise<PrismaItems | null>
) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		const parsedId = parseInt(id);

		const fetchedCoffee = await getItemPrisma(ownerId, parsedId);

		if (!isStringNumber(id)) {
			res.status(400).json({ message: 'Invalid id provided' });
		} else if (!fetchedCoffee) {
			res.status(404).json({ message: `${NAMESPACE} not found` });
		} else if (fetchedCoffee) {
			const item = await deleteItemPrisma(parsedId);
			res.status(200).json({ message: `${NAMESPACE} Deleted`, item });
		} else {
			res.status(500).json({ message: 'Unknown error' });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default deleteItem;
