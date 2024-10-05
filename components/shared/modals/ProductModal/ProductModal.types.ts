import { IProductWithRelations } from "@/types/prisma";

export interface IProductModal {
	product: IProductWithRelations;
	className?: string;
}