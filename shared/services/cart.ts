import { Cart } from "@prisma/client";
import { ApiRoutes } from "./apiRoutes";
import { axiosInstanse } from "./axiosInstanse";
import { CartDTO, CreateCartItemValues } from "@/shared/dto";

export const getCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstanse.get<CartDTO>(ApiRoutes.CART);
	return data;
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
	const { data } = await axiosInstanse.patch<CartDTO>(ApiRoutes.CART + id, { quantity });
	return data;
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	const { data } = await axiosInstanse.delete<CartDTO>(ApiRoutes.CART + id);
	return data;
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
	const { data } = await axiosInstanse.post<CartDTO>(ApiRoutes.CART, values);
	return data;
}