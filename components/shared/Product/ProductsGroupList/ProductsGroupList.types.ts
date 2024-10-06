import { IProductWithRelations } from "@/types/prisma"

export interface IProductsGroupList {
	title: string
	categoryId: number
	items: IProductWithRelations[]
	listClassName?: string
	className?: string
}