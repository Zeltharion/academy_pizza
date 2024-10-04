import { CartItemDTO } from "@/shared/dto";

/**
 * Calculate total price of a cart item.
 * @param item - Cart item to calculate the total price for.
 * @example calculateCartItemTotalPrice(item)
 * @returns Total price of the cart item.
 */
export const calculateCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

	return (ingredientsPrice + item.productVariant.price) * item.quantity;
}