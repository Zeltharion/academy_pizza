import { cn } from "@/shared/lib/utils"
import { Title } from "@/components/shared"
import { IProductForm } from "./ProductForm.types"
import s from './ProductForm.module.scss'
import { Button } from "@/components/ui"

export const ProductForm: React.FC<IProductForm> = ({
	imageUrl,
	name,
	price,
	loading,
	onSubmit,
	className,
}) => {

	return (
		<div className={cn(s.pizzaForm, className)}>
			<div className={s.pizzaForm__image}>
				<img src={imageUrl} alt={name} />
			</div>

			<div className="w-[490px] bg-gray-50 p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<Button
					className={s.pizzaForm__button}
					onClick={() => onSubmit?.()}
					loading={loading}>
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	)
}