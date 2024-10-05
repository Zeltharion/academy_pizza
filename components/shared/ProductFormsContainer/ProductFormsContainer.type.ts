import { IProductWithRelations } from "@/types/prisma";

export interface IProductFormsContainer {
	product: IProductWithRelations;
	onSubmit?: VoidFunction;
}