const isStringNumber = (str: string): boolean => {
	const regex = /^\d+$/;

	if (regex.test(str)) {
		return true;
	} else {
		return false;
	}
};

export default isStringNumber;
