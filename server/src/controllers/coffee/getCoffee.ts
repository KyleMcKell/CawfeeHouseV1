import { Request, Response } from 'express';
import { getCoffeePrisma } from '../../functions/prisma/coffee';
import { getItem } from '../../functions/helper';

const NAMESPACE = 'Coffee';

const getCoffee = async (req: Request, res: Response) => {
	await getItem(req, res, NAMESPACE, getCoffeePrisma);
};

export default getCoffee;
