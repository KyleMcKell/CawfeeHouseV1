import { Request, Response } from 'express';
import { getAllBrewsPrisma } from '../../functions/prisma/brew';
import { getAllOfItem } from '../../functions/helper';

const NAMESPACE = 'Brew';

const getAllBrews = async (req: Request, res: Response) => {
	getAllOfItem(req, res, NAMESPACE, getAllBrewsPrisma);
};

export default getAllBrews;
