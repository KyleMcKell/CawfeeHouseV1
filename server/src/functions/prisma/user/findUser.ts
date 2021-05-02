import config from '../../../config/config';
import logging from '../../../config/logging';

const prisma = config.prisma;
const NAMESPACE = 'User';

//$ Defines the user Fetch Parameter for logging in
type UserIdType = 'email' | 'username';

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
const findUser = async (userLoginID: string) => {
	const fetchParameter = findLoginParameter(userLoginID);

	let user;

	switch (fetchParameter) {
		case 'email':
			user = await prisma.user.findUnique({
				where: {
					email: userLoginID,
				},
			});
			break;

		case 'username':
			user = await prisma.user.findUnique({
				where: {
					username: userLoginID,
				},
			});
			break;

		default:
			return null;
	}

	return user;
};

export default findUser;
