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