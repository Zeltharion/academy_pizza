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
		<div className={cn(s.productForm, className)}>
			<div className={s.productForm__image}>
				<img src={imageUrl} alt={name} />
			</div>

			<div className={s.productForm__info}>
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<Button
					className={s.productForm__button}
					onClick={() => onSubmit?.()}
					loading={loading}>
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	)
}