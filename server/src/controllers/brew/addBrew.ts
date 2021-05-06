import { Request, Response } from 'express';
import { createBrewPrisma } from '../../functions/prisma/brew';
import { addItem } from '../helper';

const NAMESPACE = 'Brew';

const addBrew = async (req: Request, res: Response) => {
	await addItem(req, res, NAMESPACE, createBrewPrisma);
};

export default addBrew;
