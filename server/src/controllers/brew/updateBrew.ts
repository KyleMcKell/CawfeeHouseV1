import { Request, Response } from 'express';
import { updateBrewPrisma } from '../../functions/prisma/brew';
import { updateItem } from '../helper';

const NAMESPACE = 'Brew';

const updateBrew = async (req: Request, res: Response) => {
	await updateItem(req, res, NAMESPACE, updateBrewPrisma);
};

export default updateBrew;
