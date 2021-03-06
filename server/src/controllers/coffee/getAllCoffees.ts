import { Request, Response } from 'express';
import { getAllCoffeesPrisma } from '../../functions/prisma/coffee';
import { getAllOfItem } from '../helper';

const NAMESPACE = 'Coffee';

const getAllCoffees = async (req: Request, res: Response) => {
	getAllOfItem(req, res, NAMESPACE, getAllCoffeesPrisma);
};

export default getAllCoffees;
