import logging from '../../config/logging';
import { Request, Response } from 'express';
import { deleteUserPrisma } from '../../functions/user';
import { isStringNumber } from '../../functions/utils';

const NAMESPACE = 'User';

const deleteUser = async (req: Request, res: Response) => {
	try {
		const ownerId: number = res.locals.jwt.id;

		const { id } = req.params;

		if (!ownerId) {
			res.status(403).json({ message: 'Unauthorized' });
		} else if (!isStringNumber(id)) {
			res.status(400).json({ message: 'Invalid id provided' });
		} else if (ownerId) {
			const user = await deleteUserPrisma(parseInt(id));
			if (!user) {
				res.status(404).json({ message: 'User not found' });
			} else if (user) {
				res.status(200).json({ message: 'User Deleted', user });
			}
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);

		return res.status(500).json({
			message: error.message,
			error,
		});
	}
};

export default deleteUser;
