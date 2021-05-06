import { Request, Response } from 'express';
import { getAllMethodsPrisma } from '../../functions/prisma/method';
import { getAllOfItem } from '../helper';

const NAMESPACE = 'Method';

const getAllMethods = async (req: Request, res: Response) => {
	getAllOfItem(req, res, NAMESPACE, getAllMethodsPrisma);
};

export default getAllMethods;
