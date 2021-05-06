import config from '../../../config/config';

const prisma = config.prisma;

const deleteCoffeePrisma = async (id: number) => {
	const deletedCoffee = await prisma.coffee.delete({
		where: { id },
	});

	return deletedCoffee;
};

export default deleteCoffeePrisma;
