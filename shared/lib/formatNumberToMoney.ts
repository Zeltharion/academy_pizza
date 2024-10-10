/**
 * Format a number with a currency symbol and thousands separator.
 * @param amount - the number to format
 * @param currencySymbol - the currency symbol to use (default is '₽')
 * @returns a string with the formatted number and currency symbol
 * @example formatNumberToMoney(1000) => "1.000 ₽"
 */
export const formatNumberToMoney = (amount: number, currencySymbol: string = '₽') => {
	const formattedAmount = amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return `${formattedAmount} ${currencySymbol}`;
}