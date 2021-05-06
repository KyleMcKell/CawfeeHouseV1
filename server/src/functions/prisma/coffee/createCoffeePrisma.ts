import config from '../../../config/config';

const prisma = config.prisma;

const createCoffeePrisma = async (
	ownerId: number,
	name: string,
	brand: string | null,
	notes: string | null,
	roast: string | null,
	favorite: boolean | null,
	about: string | null
) => {
	const newCoffee = await prisma.coffee.create({
		data: {
			ownerId,
			name,
			brand,
			notes,
			roast,
			favorite,
			about,
		},
	});

	return newCoffee;
};

export default createCoffeePrisma;
