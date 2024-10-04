import { Ingredient, ProductVariant } from "@prisma/client";

export interface IPizzaForm {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variants: ProductVariant[];
	loading?: boolean;
	onSubmit: (variantId: number, ingredients: number[]) => void;
	className?: string
}