import config from '../../config/config';

const prisma = config.prisma;

const getAllCoffeesPrisma = async (ownerId: number) => {
	const coffees = await prisma.coffee.findMany({
		where: { ownerId },
	});

	return coffees;
};

export default getAllCoffeesPrisma;
