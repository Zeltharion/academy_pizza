import Link from "next/link"
import { cn } from "@/lib/utils"
import { Title } from "@/components/shared"
import { IProductCard } from "./ProductCard.types"
import s from './ProductCard.module.scss'
import { Button } from "@/components/ui"
import { Plus } from "lucide-react"

export const ProductCard: React.FC<IProductCard> = ({
	id,
	name,
	price,
	imageUrl,
	className
}) => {
	return (
		<div className={cn(s.productCard, className)}>
			<Link href={`/product/${id}`}>
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
					Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, красный лук, томаты, чеснок
				</p>

				<div className={s.productCard__footer}>
					<span className="text-[20px]">
						от <b>{price} ₽</b>
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