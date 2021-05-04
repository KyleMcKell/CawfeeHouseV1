import config from '../../../config/config';

const prisma = config.prisma;

const getCoffeePrisma = async (ownerId: number, id: number) => {
	const newCoffee = await prisma.coffee.findFirst({
		where: { id, ownerId },
	});

	return newCoffee;
};

export default getCoffeePrisma;
