import { CartStateItem } from "@/shared/lib"

export interface ICheckoutCart {
	items: CartStateItem[];
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
	removeCartItem: (id: number) => void;
	loading?: boolean;
	className?: string;
} 