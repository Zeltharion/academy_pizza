import { Ingredient, Product, ProductVariant } from "@prisma/client";

export type IProductWithRelations = Product & { variants: ProductVariant[]; ingredients: Ingredient[] }	