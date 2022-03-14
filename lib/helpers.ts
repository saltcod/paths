// Converts a YYYY-MM-DD string to a date timestamp
export function convertStringToDate(date: string): Date  {
	const year: number = Number(date.substring(0, 4));
	const month: number = Number(date.substring(5, 7));
	const day: number = Number(date.substring(8, 10));

	return new Date(year, month-1, day);
}
