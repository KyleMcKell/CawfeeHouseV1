import config from '../../../config/config';

const prisma = config.prisma;

const updateMethodPrisma = async (
	id: number,
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
	const updatedMethod = await prisma.method.update({
		where: { id },
		data: {
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

	return updatedMethod;
};

export default updateMethodPrisma;
