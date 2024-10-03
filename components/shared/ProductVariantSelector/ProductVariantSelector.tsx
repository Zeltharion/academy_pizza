'use client'

import { cn } from "@/shared/lib/utils"
import { IProductVariantSelector } from "./ProductVariantSelector.types"
import s from './ProductVariantSelector.module.scss'

export const ProductVariantSelector: React.FC<IProductVariantSelector> = ({
	variants,
	onClick,
	selectedValue,
	className,
}) => {
	return (
		<div className={cn(s.productVariantSelector, className)}>
			{variants.map((item) => (
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