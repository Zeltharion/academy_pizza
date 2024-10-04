import { Product } from "@prisma/client"
import { axiosInstanse } from "./axiosInstanse"
import { ApiRoutes } from "./apiRoutes";

export const search = async (query: string): Promise<Product[]> => {
	const { data } = await axiosInstanse.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } });
	
	return data;
}