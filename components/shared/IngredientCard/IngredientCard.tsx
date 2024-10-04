import { cn } from "@/shared/lib/utils"
import { CircleCheck } from "lucide-react"
import { IIngredientCard } from "./IngredientCard.types"
import s from './IngredientCard.module.scss'

export const IngredientCard: React.FC<IIngredientCard> = ({
	imageUrl,
	name,
	price,
	active = false,
	onClick,
	className,
}) => {
	return (
		<div className={cn(s.ingredientCard, className, { [s.active]: active })}
			onClick={onClick}>
			{active && <CircleCheck className={s.ingredientCard__activeIcon} />}
			<img
				src={imageUrl}
				width={110}
				height={110}
				alt=""
			/>
			<span className={s.ingredientCard__name}>{name}</span>
			<span className={s.ingredientCard__price}>{price} ₽</span>
		</div>
	)
}