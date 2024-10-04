import { Ingredient, ProductVariant } from "@prisma/client";

export interface IPizzaForm {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variants: ProductVariant[];
	onClickAddToCart?: VoidFunction;
	className?: string
}