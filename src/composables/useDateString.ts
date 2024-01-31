const useDateString = (date: string) => {
	const dateObj = new Date(date);
	return dateObj.toLocaleDateString("cs-CZ");
};

export { useDateString };
