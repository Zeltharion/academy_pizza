'use client'

import React, { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { ProductCard, Title } from "@/components/shared"
import { useCategoryStore } from '@/shared/store/category'
import { cn } from "@/shared/lib/utils"
import { IProductsGroupList } from "./ProductsGroupList.types"
import s from './ProductsGroupList.module.scss'

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
	}, [categoryId, intersection?.isIntersecting, title, setActiveCategoryId]);

	return (
		<section className={cn(s.productsGroupList, className)} ref={intersectionRef} id={title}>
			<Title
				text={title}
				size='lg'
				className={s.productsGroupList__title}
			/>
			<div className={cn(s.productsGroupList__list, listClassName)}>
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.description || ''}
						imageUrl={product.imageUrl}
						price={product.variants[0].price}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</section>
	)
}