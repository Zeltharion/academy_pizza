'use client'

import { cn } from "@/lib/utils"
import { IProductVariantSelector } from "./ProductVariantSelector.types"
import s from './ProductVariantSelector.module.scss'

export const ProductVariantSelector: React.FC<IProductVariantSelector> = ({
	items,
	onClick,
	selectedValue,
	className,
}) => {
	return (
		<div className={cn(s.productVariantSelector, className)}>
			{items.map((item) => (
				<button
					key={item.value}
					onClick={() => onClick?.(item.value)}
					className={cn(s.productVariantSelector__button, {
							[s.active]: item.value === selectedValue,
							[s.disabled]: item.disabled,
						})}>
					{item.name}
				</button>
			))}
		</div>
	)
}