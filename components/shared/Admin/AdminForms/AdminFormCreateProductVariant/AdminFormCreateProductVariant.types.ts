import { Product, ProductVariant } from "@prisma/client";

export interface IAdminFormCreateProductVariant {
	values?: ProductVariant;
	products: Product[];
}