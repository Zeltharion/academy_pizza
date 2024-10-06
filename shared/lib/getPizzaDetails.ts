import { calculateTotalPizzaPrice } from "./calculateTotalPizzaPrice";
import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaType, PizzaSize, mapPizzaType } from "../constants/pizza";

/**
 * Returns an object with pizza details and total price.
 *
 * @param type - Pizza type.
 * @param size - Pizza size.
 * @param selectedIngredients - Set of selected ingredients.
 * @param variants - Array of product variants.
 * @param ingredients - Array of ingredients.
 *
 * @example getPizzaDetails(1, 20, selectedIngredients, variants, ingredients)
 * @returns Object with 'pizzaDetails' and 'totalPrice' properties.
 */

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	selectedIngredients: Set<number>,
	variants: ProductVariant[],
	ingredients: Ingredient[]
) => {
	const totalPrice = calculateTotalPizzaPrice(type, size, selectedIngredients, variants, ingredients);
	const pizzaDetails = `${mapPizzaType[type]} ${size}см, ${selectedIngredients.size === 0 ? "без доп. ингредиентов" : `доп. ингредиентов: ${selectedIngredients.size}`}`;

	return { pizzaDetails, totalPrice };
}