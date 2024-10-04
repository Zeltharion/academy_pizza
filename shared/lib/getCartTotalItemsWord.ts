/**
 * Returns the correct word for the given total items count.
 * The word is determined based on the following rules:
 * - if `totalItems` ends with 1, but not with 11, the word is 'товар';
 * - if `totalItems` ends with 2, 3, or 4, but not with 12, 13, or 14, the word is 'товара';
 * - otherwise, the word is 'товаров'.
 * @param {number} totalItems - total items count
 * @example getCartTotalItemsWord(items.lenght)
 * @returns {string} the correct word
 */
export const getCartTotalItemsWord = (totalItems: number): string => {
	if (totalItems % 10 === 1 && totalItems % 100 !== 11) {
		return 'товар';
	} else if (totalItems % 10 >= 2 && totalItems % 10 <= 4 && (totalItems % 100 < 10 || totalItems % 100 >= 20)) {
		return 'товара';
	} else {
		return 'товаров';
	}
}