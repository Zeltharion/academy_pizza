import { Ingredient } from "@prisma/client";

export interface IProductCard {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	ingredients: Ingredient[];
	className?: string;
}