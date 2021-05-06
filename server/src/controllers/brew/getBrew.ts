import { Request, Response } from 'express';
import { getBrewPrisma } from '../../functions/brew';
import { getItem } from '../../functions/helper';

const NAMESPACE = 'Brew';

const getBrew = async (req: Request, res: Response) => {
	await getItem(req, res, NAMESPACE, getBrewPrisma);
};

export default getBrew;
