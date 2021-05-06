import { Request, Response } from 'express';
import { updateCoffeePrisma } from '../../functions/prisma/coffee';
import { updateItem } from '../helper';

const NAMESPACE = 'Coffee';

const updateCoffee = async (req: Request, res: Response) => {
	await updateItem(req, res, NAMESPACE, updateCoffeePrisma);
};

export default updateCoffee;
