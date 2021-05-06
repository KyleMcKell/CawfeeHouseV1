import { Request, Response } from 'express';
import { getAllMethodsPrisma } from '../../functions/method';
import getAllOfItem from '../../functions/helper/getAllOfItem';

const NAMESPACE = 'Method';

const getAllMethods = async (req: Request, res: Response) => {
	getAllOfItem(req, res, NAMESPACE, getAllMethodsPrisma);
};

export default getAllMethods;
