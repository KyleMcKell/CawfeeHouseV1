import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import logging from '../config/logging';
import createCoffee from '../functions/prisma/coffee/createCoffee';

const prisma = config.prisma;

const NAMESPACE = 'Coffee';

const addCoffee = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { coffeeName, brand, notes, roastType, about } = req.body;
		if (coffeeName) {
			// createCoffee();
		}
	} catch (error) {
		logging.error(NAMESPACE, error.message);
	}
};

export default { addCoffee };
