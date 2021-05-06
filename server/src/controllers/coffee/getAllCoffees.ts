import { Request, Response } from 'express';
import { getAllCoffeesPrisma } from '../../functions/coffee';
import getAllOfItem from '../../functions/helper/getAllOfItem';

const NAMESPACE = 'Coffee';

const getAllCoffees = async (req: Request, res: Response) => {
	getAllOfItem(req, res, NAMESPACE, getAllCoffeesPrisma);
};

export default getAllCoffees;
