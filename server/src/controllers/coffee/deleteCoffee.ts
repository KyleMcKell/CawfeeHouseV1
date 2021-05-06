import { Request, Response } from 'express';
import { deleteCoffeePrisma, getCoffeePrisma } from '../../functions/coffee';
import { deleteItem } from '../../functions/helper';

const NAMESPACE = 'Coffee';

const deleteCoffee = async (req: Request, res: Response) => {
	await deleteItem(req, res, NAMESPACE, deleteCoffeePrisma, getCoffeePrisma);
};

export default deleteCoffee;
