import { Request, Response } from 'express';
import {
	deleteMethodPrisma,
	getMethodPrisma,
} from '../../functions/prisma/method';
import { deleteItem } from '../../functions/helper';

const NAMESPACE = 'Method';

const deleteMethod = async (req: Request, res: Response) => {
	await deleteItem(req, res, NAMESPACE, deleteMethodPrisma, getMethodPrisma);
};

export default deleteMethod;
