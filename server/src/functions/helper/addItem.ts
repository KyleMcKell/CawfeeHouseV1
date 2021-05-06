import logging from '../../config/logging';
import { Request, Response } from 'express';
import PrismaBaristaItems from '../../types/PrismaBaristaItems';


const getItem = async (
	req: Request,
	res: Response,
	NAMESPACE: string,
	createItemPrisma: (
		ownerId: number,
		name: string,
		{ ...rest }
	) => Promise<PrismaBaristaItems | null>
) => {
  const ownerId: number = res.locals.jwt.id;
  const {...rest} = req.body as PrismaBaristaItems;

	if (name && ownerId) {
			const item = await createItemPrisma(
				ownerId,
        ...rest
			);
			res.status(201).json({ message: `${NAMESPACE} Created`, item });
		} else if (!ownerId) {
			res.status(401).json({ message: 'Unauthorized' });
		} else if (!name) {
			res.status(204).json({ message: `${NAMESPACE} Not Provided` });
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
		return res.status(500).json({
			message: error.message,
			error,
		});
	}

export default getItem;
