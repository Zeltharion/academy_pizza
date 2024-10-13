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
	description,
	className
}) => {
	return (
		<Link href={urls.client_product + `/${id}`}>
			<article className={cn(s.productCard, className)}>
				<main>
					<picture className={s.productCard__image}>
						<img src={imageUrl} alt={name} />
					</picture>
					<Title
						text={name}
						size="sm"
						className={s.productCard__title}
					/>
					<p className={s.productCard__igredients}>
						{formatIngredientsArrayToText(ingredients)}
						{description}
					</p>
				</main>
				<footer className={s.productCard__footer}>
					<span className={s.productCard__footer__price}>
						от <b>{formatNumberToMoney(price)}</b>
					</span>
					<Button variant="secondary" className={s.productCard__footer__cartBtn}>
						<Plus size={20} className="mr-1" />
						Добавить
					</Button>
				</footer>
			</article>
		</Link>
	)
}