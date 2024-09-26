'use client'

import React, { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { cn } from "@/lib/utils"
import { IProductsGroupList } from "./ProductsGroupList.types"
import s from './ProductsGroupList.module.scss'
import { ProductCard, Title } from "@/components/shared"
import { useCategoryStore } from '@/store/category'

export const ProductsGroupList: React.FC<IProductsGroupList> = ({
	title,
	categoryId,
	items,
	className,
	listClassName,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.5,
		root: null,
		rootMargin: '0px',
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, intersection?.isIntersecting, title]);

	return (
		<section className={cn(s.productsGroupList, className)}
			ref={intersectionRef}
			id={title}>
			<Title
				text={title}
				size='lg'
				className={s.productsGroupList__title}
			/>
			<div className={cn(s.productsGroupList__list, listClassName)}>
				{items.map((product, index) => (
					<ProductCard
						key={product.id + index}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
					/>
				))}
			</div>
		</section>
	)
}