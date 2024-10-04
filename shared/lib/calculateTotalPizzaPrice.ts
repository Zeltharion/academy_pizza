import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaType, PizzaSize } from "../constants/pizza";

/**
 * Calculate total price of pizza with selected ingredients.
 * @param type - Pizza type.
 * @param size - Pizza size.
 * @param selectedIngredients - selected ingredients.
 * @param variants - Array of product variants.
 * @param ingredients - Array of ingredients.
*
 * @example calculateTotalPizzaPrice(1, 20, selectedIngredients, variants, ingredients)
 * @returns Total price of pizza with selected ingredients.
 */
export const calculateTotalPizzaPrice = (
	type: PizzaType,
	size: PizzaSize,
	selectedIngredients: Set<number>,
	variants: ProductVariant[],
	ingredients: Ingredient[]
) => {
	const pizzaPrice = variants
		.find((variants) => variants.pizzaType === type && variants.size === size)?.price || 0;
	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);
	const totalPrice = pizzaPrice + totalIngredientsPrice;

	return totalPrice;
}