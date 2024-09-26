import { cn } from "@/lib/utils"
import { IProductsGroupList } from "./ProductsGroupList.types"
import s from './ProductsGroupList.module.scss'
import { ProductCard, Title } from "@/components/shared"

export const ProductsGroupList: React.FC<IProductsGroupList> = ({
	title,
	categoryId,
	items,
	className,
	listClassName,
}) => {
	return (
		<div className={cn(s.productsGroupList, className)}>
			<Title
				text={title}
				size='lg'
				className={s.productsGroupList__title}
			/>
			<div className={cn(s.productsGroupList__list, listClassName)}>
				{items.map((product, index) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
					/>
				))}
			</div>
		</div>
	)
}