import config from '../../../config/config';

const prisma = config.prisma;

const updateCoffeePrisma = async (
	id: number,
	name: string,
	brand: string | null,
	notes: string | null,
	roast: string | null,
	favorite: boolean | null,
	about: string | null
) => {
	const updatedCoffee = await prisma.coffee.update({
		where: { id },
		data: {
			name,
			brand,
			notes,
			roast,
			favorite,
			about,
		},
	});

	return updatedCoffee;
};

export default updateCoffeePrisma;
