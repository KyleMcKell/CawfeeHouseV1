import { Request, Response } from 'express';
import { deleteBrewPrisma, getBrewPrisma } from '../../functions/brew';
import { deleteItem } from '../../functions/helper';

const NAMESPACE = 'Brew';

const deleteBrew = async (req: Request, res: Response) => {
	await deleteItem(req, res, NAMESPACE, deleteBrewPrisma, getBrewPrisma);
};

export default deleteBrew;
