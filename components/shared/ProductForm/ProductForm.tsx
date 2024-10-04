import { cn } from "@/shared/lib/utils"
import { Title } from "@/components/shared"
import { IProductForm } from "./ProductForm.types"
import s from './ProductForm.module.scss'
import { Button } from "@/components/ui"

export const ProductForm: React.FC<IProductForm> = ({
	imageUrl,
	name,
	onClickAdd,
	className,
}) => {
	const textDetails = "30см, традиционное тесто 30";
	const totalPrice = 350;

	return (
		<div className={cn(s.pizzaForm, className)}>
			<div className={s.pizzaForm__image}>
				<img src={imageUrl} alt={name} />
			</div>

			<div className="w-[490px] bg-gray-50 p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<p className="text-gray-400">{textDetails}</p>

				<Button className={s.pizzaForm__button}>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	)
}