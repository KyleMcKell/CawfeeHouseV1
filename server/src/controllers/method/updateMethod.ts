import { Request, Response } from 'express';
import { updateMethodPrisma } from '../../functions/prisma/method';
import { updateItem } from '../helper';

const NAMESPACE = 'Method';

const updateMethod = async (req: Request, res: Response) => {
	await updateItem(req, res, NAMESPACE, updateMethodPrisma);
};

export default updateMethod;
