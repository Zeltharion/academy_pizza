import { axiosInstanse } from "./axiosInstanse"
import { ApiRoutes } from "./apiRoutes";
import { Ingredient } from "@prisma/client";

export const getAll = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstanse.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
	
	return data;
}