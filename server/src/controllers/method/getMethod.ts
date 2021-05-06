import { Request, Response } from 'express';
import { getMethodPrisma } from '../../functions/prisma/method';
import { getItem } from '../../functions/helper';

const NAMESPACE = 'Method';

const getMethod = async (req: Request, res: Response) => {
	await getItem(req, res, NAMESPACE, getMethodPrisma);
};

export default getMethod;
