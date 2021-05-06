import { Request, Response } from 'express';
import { getBrewPrisma } from '../../functions/prisma/brew';
import { getItem } from '../helper';

const NAMESPACE = 'Brew';

const getBrew = async (req: Request, res: Response) => {
	await getItem(req, res, NAMESPACE, getBrewPrisma);
};

export default getBrew;
