'use client'

import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza"
import { IngredientCard, PizzaImage, ProductVariantSelector, Title } from "@/components/shared"
import { Button } from "@/components/ui"
import { getPizzaDetails, cn } from "@/shared/lib"
import { usePizzaOptions } from "@/shared/hooks"
import { IPizzaForm } from "./PizzaForm.types"
import s from './PizzaForm.module.scss'

export const PizzaForm: React.FC<IPizzaForm> = ({
	imageUrl,
	name,
	ingredients,
	variants,
	onSubmit,
	loading,
	className,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentVariantId,
		addIngredient,
		setSize,
		setType,
	} = usePizzaOptions(variants)

	const { pizzaDetails, totalPrice } = getPizzaDetails(type, size, selectedIngredients, variants, ingredients);

	const handleOnClickAddToCart = () => {
		if (currentVariantId) {
			onSubmit(currentVariantId, Array.from(selectedIngredients));
		}
	}

	return (
		<div className={cn(s.pizzaForm, className)}>
			<PizzaImage src={imageUrl} size={size} />

			<div className={s.pizzaForm__info}>
				<Title text={name} size="md" className={s.pizzaForm__title} />
				<p className={s.pizzaForm__details}>{pizzaDetails}</p>

				<div className={s.pizzaForm__variants}>
					<ProductVariantSelector
						variants={availableSizes}
						value={String(size)}
						onClick={value => setSize(Number(value) as PizzaSize)}
					/>
					<ProductVariantSelector
						variants={pizzaTypes}
						value={String(type)}
						onClick={value => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className={s.pizzaForm__ingredientsWrapper}>
					<div className={s.pizzaForm__ingredients}>
						{ingredients.map((ingredient) => (
							<IngredientCard
								key={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								imageUrl={ingredient.imageUrl}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					className={s.pizzaForm__button}
					onClick={handleOnClickAddToCart}
					loading={loading}>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	)
}