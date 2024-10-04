'use client'

import { cn } from "@/shared/lib/utils"
import { Dialog } from "@/components/ui"
import { PizzaForm, ProductForm } from "@/components/shared"
import { IProductWithRelations } from "@/types/prisma"
import { DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import s from './ProductModal.module.scss'
import { useCartStore } from "@/shared/store"
import toast from "react-hot-toast"

interface IProductModal {
	product: IProductWithRelations;
	className?: string;
}

export const ProductModal: React.FC<IProductModal> = ({ product, className }) => {
	const router = useRouter();
	const firstVariant = product.variants[0];
	const isPizzaForm = Boolean(firstVariant.pizzaType);
	const { addCartItem, loading } = useCartStore();

	const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
		try {
			const variantId = productVariantId ?? firstVariant.id;

			await addCartItem({
				productVariantId: variantId,
				ingredients
			});

			toast.success('Добавлен в корзину');
			router.back()
		} catch (error) {
			toast.error('Не удалось добавить товар в корзину');
			console.log("Error while adding to cart: ", error);
		}
	}

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent className={cn(s.productModal, className)}>
				{isPizzaForm ? (
					<PizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						variants={product.variants}
						onSubmit={onSubmit}
						loading={loading}
					/>
				) : (
					<ProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onSubmit}
						price={firstVariant.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}