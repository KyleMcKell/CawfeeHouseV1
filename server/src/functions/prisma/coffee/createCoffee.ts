import { User } from '.prisma/client';
import { Response } from 'express';
import config from '../../../config/config';

const prisma = config.prisma;

const createCoffee = async () =>
	// res: Response,
	// ownerId: number,
	// coffeeName: string,
	// brand: string = '',
	// notes: string = '',
	// roastType: string = '',
	// about: string = ''
	{
		// const newCoffee = await prisma.coffee.create({
		// 	data: {
		// 		ownerId,
		// 		coffeeName,
		// 		brand,
		// 		notes,
		// 		roastType,
		// 		about,
		// 	},
		// });
		// res.json(newCoffee);
	};

export default createCoffee;
