import { CartDTO } from "@/shared/dto";
import { calculateCartItemTotalPrice } from "@/shared/lib";

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
	pizzaType?: number | null;
	disabled?: boolean;
	ingredients: Array<{ name: string; price: number }>;
}

interface IReturnData {
	items: CartStateItem[];
	totalAmount: number;
}

/**
 * Given a CartDTO, returns an object with 'totalAmount' and 'items' properties.
 * 'totalAmount' is the total amount of the cart, and 'items' is an array of
 * objects with the following properties:
 *   - id: the id of the cart item
 *   - quantity: the quantity of the item in the cart
 *   - name: the name of the item
 *   - imageUrl: the URL of the image of the item
 *   - price: the total price of the item (item price * quantity)
 *   - pizzaSize: the size of the pizza, if applicable
 *   - pizzaType: the type of pizza, if applicable
 *   - disabled: a boolean indicating whether the item is disabled (e.g. if it's out of stock)
 *   - ingredients: an array of objects with the name and price of each ingredient
 * @param data - The CartDTO to convert to a CartStateItem[]
 * @example getCartDetails(data)
 * @returns The converted CartStateItem[]
 */
export const getCartDetails = (data: CartDTO): IReturnData => {
	const items = data.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productVariant.product.name,
		imageUrl: item.productVariant.product.imageUrl,
		price: calculateCartItemTotalPrice(item),
		pizzaSize: item.productVariant.size,
		pizzaType: item.productVariant.pizzaType,
		disabled: false,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		}))
	})) as CartStateItem[];

	return { totalAmount: data.totalAmount, items }
}