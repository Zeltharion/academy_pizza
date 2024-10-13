import { axiosInstanse } from "./axiosInstanse"
import { ApiRoutes } from "./apiRoutes";
import { Ingredient, Order } from "@prisma/client";

export const getAllOrders = async (): Promise<Order[]> => {
	const { data } = await axiosInstanse.get<Order[]>(ApiRoutes.ORDERS);
	
	return data;
}