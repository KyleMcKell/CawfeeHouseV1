import { Request, Response } from 'express';
import { createMethodPrisma } from '../../functions/prisma/method';
import { addItem } from '../helper';

const NAMESPACE = 'Method';

const addMethod = async (req: Request, res: Response) => {
	await addItem(req, res, NAMESPACE, createMethodPrisma);
};

export default addMethod;
