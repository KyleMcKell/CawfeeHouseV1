import { Request, Response } from 'express';
import { createCoffeePrisma } from '../../functions/prisma/coffee';
import { addItem } from '../helper';

const NAMESPACE = 'Coffee';

const addCoffee = async (req: Request, res: Response) => {
	await addItem(req, res, NAMESPACE, createCoffeePrisma);
};

export default addCoffee;
