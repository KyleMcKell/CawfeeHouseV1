import config from '../../../config/config';

const prisma = config.prisma;

const createMethod = async (
	ownerId: number,
	coffeeName: string,
	brand: string | null,
	notes: string | null,
	roastType: string | null,
	about: string | null
) => {
	const newCoffee = await prisma.coffee.create({
		data: {
			ownerId,
			coffeeName,
			brand,
			notes,
			roastType,
			about,
		},
	});
	async () => {
		await prisma.$disconnect();
	};
	return newCoffee;
};

export default createMethod;
