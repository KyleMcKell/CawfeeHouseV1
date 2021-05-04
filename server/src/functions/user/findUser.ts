import config from '../../config/config';
import logging from '../../config/logging';
import UserIdType from '../../types/user/UserIdType';

const prisma = config.prisma;
const NAMESPACE = 'User';

const findLoginParameter = (userId: string) => {
	let fetchParameter: UserIdType; //$ Set a fetchParameter to tell if the userLoginID provided was an email or a username

	if (userId.includes('@')) {
		fetchParameter = 'email'; //$ If the userLoginID has an @ symbol, parameter is the email
		logging.info(NAMESPACE, 'Logging in with email');
	} else {
		fetchParameter = 'username'; //$ If the userLoginID doesn't contain and @, parameter is the username
		logging.info(NAMESPACE, 'Logging in with username');
	}

	return fetchParameter;
};

//$ finds the user with either their email or their username
const findUser = async (userId: string) => {
	const fetchParameter = findLoginParameter(userId);

	let user;

	switch (fetchParameter) {
		case 'email':
			user = await prisma.user.findUnique({
				where: {
					email: userId,
				},
			});
			break;

		case 'username':
			user = await prisma.user.findUnique({
				where: {
					username: userId,
				},
			});
			break;

		default:
			return null;
	}

	async () => {
		await prisma.$disconnect();
	};

	return user;
};

export default findUser;
