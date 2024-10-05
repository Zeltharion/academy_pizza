import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib";

/**
 * Given an array of ingredients and a pizza type and size, returns a string
 * with a human-readable representation of the cart item's details.
 *
 * @param ingredients - An array of ingredients.
 * @param pizzaType - A pizza type.
 * @param pizzaSize - A pizza size.
 * @example getCartItemsDetail(ingredients, 1, 20)
 * @returns A string with a human-readable representation of the cart item's details.
 */
export const getCartItemsDetail = (
	ingredients: CartStateItem['ingredients'],
	pizzaType: PizzaType,
	pizzaSize: PizzaSize,
): string => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const typeName = mapPizzaType[pizzaType];
		details.push(`${typeName} ${pizzaSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
}