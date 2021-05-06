import { Request, Response } from 'express';
import {
	deleteCoffeePrisma,
	getCoffeePrisma,
} from '../../functions/prisma/coffee';
import { deleteItem } from '../helper';

const NAMESPACE = 'Coffee';

const deleteCoffee = async (req: Request, res: Response) => {
	await deleteItem(req, res, NAMESPACE, deleteCoffeePrisma, getCoffeePrisma);
};

export default deleteCoffee;
