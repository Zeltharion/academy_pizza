'use client'

import toast from "react-hot-toast";
import { useCartStore } from "@/shared/store";
import { PizzaForm, ProductForm } from "@/components/shared";
import { IProductFormsContainer } from "./ProductFormsContainer.type";

export const ProductFormsContainer: React.FC<IProductFormsContainer> = ({
	product,
	onSubmit: _onSubmit,
	className,
}) => {
	const { addCartItem, loading } = useCartStore();

	const firstVariant = product.variants[0];
	const isPizzaForm = Boolean(firstVariant.pizzaType);

	const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
		try {
			const variantId = productVariantId ?? firstVariant.id;

			await addCartItem({
				productVariantId: variantId,
				ingredients
			});

			toast.success('Добавлен в корзину');
			_onSubmit?.();
		} catch (error) {
			toast.error('Не удалось добавить товар в корзину');
			console.log("Error while adding to cart: ", error);
		}
	}

	return (
		<>
			{isPizzaForm ? (
				<PizzaForm
					imageUrl={product.imageUrl}
					name={product.name}
					ingredients={product.ingredients}
					variants={product.variants}
					onSubmit={onSubmit}
					className={className}
					loading={loading}
				/>
			) : (
				<ProductForm
					imageUrl={product.imageUrl}
					name={product.name}
					onSubmit={onSubmit}
					description={product.description || ''}
					price={firstVariant.price}
					className={className}
					loading={loading}
				/>
			)}
		</>
	)
}