import Link from "next/link"
import { Plus } from "lucide-react"
import { cn, formatIngredientsArrayToText, formatNumberToMoney } from "@/shared/lib"
import { Title } from "@/components/shared"
import { Button } from "@/components/ui"
import { IProductCard } from "./ProductCard.types"
import s from './ProductCard.module.scss'
import urls from "@/shared/config/urls"

export const ProductCard: React.FC<IProductCard> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className
}) => {
	return (
		<div className={cn(s.productCard, className)}>
			<Link href={urls.client_product + `/${id}`}>
				<div className={s.productCard__image}>
					<img
						className="w-[215px] h-[215px]"
						src={imageUrl}
						alt={name} />
				</div>
				<Title
					text={name}
					size="sm"
					className={s.productCard__title}
				/>
				<p className={s.productCard__igredients}>
					{formatIngredientsArrayToText(ingredients)}
				</p>

				<div className={s.productCard__footer}>
					<span className="text-[20px]">
						от <b>{formatNumberToMoney(price)}</b>
					</span>
					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1" />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	)
}