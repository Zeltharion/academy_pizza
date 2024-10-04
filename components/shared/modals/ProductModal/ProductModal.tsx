'use client'

import { cn } from "@/shared/lib/utils"
import { Dialog } from "@/components/ui"
import { PizzaForm, ProductForm } from "@/components/shared"
import { IProductWithRelations } from "@/types/prisma"
import { DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import s from './ProductModal.module.scss'

interface IProductModal {
	product: IProductWithRelations;
	className?: string;
}

export const ProductModal: React.FC<IProductModal> = ({ product, className }) => {
	const rounter = useRouter();
	const isPizzaForm = Boolean(product.variants[0].pizzaType);

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => rounter.back()}>
			<DialogContent className={cn(s.productModal, className)}>
				{isPizzaForm ? (
					<PizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						variants={product.variants}
					/>
				) : (
					<ProductForm
						imageUrl={product.imageUrl}
						name={product.name}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}