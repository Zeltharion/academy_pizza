import { useEffect } from "react";
import { useCartStore } from "@/shared/store";
import { CreateCartItemValues } from "@/shared/dto";
import { CartStateItem } from "../lib";

type UseCartReturnData = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

export const useCart = (): UseCartReturnData => {
	const cartState = useCartStore();

	useEffect(() => {
		cartState.fetchCartItems();
	}, [cartState.fetchCartItems]);

	return cartState;
}