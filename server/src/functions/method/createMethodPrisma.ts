import config from '../../config/config';

const prisma = config.prisma;

const createMethodPrisma = async (
	ownerId: number,
	name: string,
	equipment: string | null,
	ingredients: string | null,
	brewTime: number | null,
	temperature: number | null,
	grindSize: string | null,
	ratio: number | null,
	favorite: boolean | null,
	about: string | null
) => {
	const newMethod = await prisma.method.create({
		data: {
			ownerId,
			name,
			equipment,
			ingredients,
			brewTime,
			temperature,
			grindSize,
			ratio,
			favorite,
			about,
		},
	});

	return newMethod;
};

export default createMethodPrisma;
