'use client'

import { cn } from "@/lib/utils"
import s from './Categories.module.scss'
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";

interface ICategories {
	items: Category[];
	className?: string;
}

export const Categories: React.FC<ICategories> = ({ className, items }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId)

	return (
		<div className={cn(s.categories, className)}>
			{items.map((categories, index) => (
				<a className={cn(s.categoryItem, categoryActiveId === categories.id && s.active)}
					key={index}
					href={`/#${categories.name}`}>
					<button>
						{categories.name}
					</button>
				</a>
			))}
		</div>
	)
}