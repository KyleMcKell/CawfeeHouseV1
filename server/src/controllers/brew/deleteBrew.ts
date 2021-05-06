import { Request, Response } from 'express';
import { deleteBrewPrisma, getBrewPrisma } from '../../functions/prisma/brew';
import { deleteItem } from '../helper';

const NAMESPACE = 'Brew';

const deleteBrew = async (req: Request, res: Response) => {
	await deleteItem(req, res, NAMESPACE, deleteBrewPrisma, getBrewPrisma);
};

export default deleteBrew;
