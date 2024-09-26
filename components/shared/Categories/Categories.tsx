'use client'

import { cn } from "@/lib/utils"
import s from './Categories.module.scss'
import { useCategoryStore } from "@/store/category";

interface ICategories {
	className?: string;
}

const cats = [
	{ id: 1, name: 'Пиццы' },
	{ id: 2, name: 'Комбо' },
	{ id: 3, name: 'Закуски' },
	{ id: 4, name: 'Коктейли' },
	{ id: 5, name: 'Кофе' },
	{ id: 6, name: 'Напитки' },
	{ id: 7, name: 'Десерты' },
]

export const Categories: React.FC<ICategories> = ({ className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId)

	return (
		<div className={cn(s.categories, className)}>
			{cats.map((cats, index) => (
				<a className={cn(s.categoryItem, categoryActiveId === cats.id && s.active)}
					key={index}
					href={`/#${cats.name}`}>
					<button>
						{cats.name}
					</button>
				</a>
			))}
		</div>
	)
}