import { cn } from "@/lib/utils"
import s from './Categories.module.scss'

interface ICategories {
	className?: string;
}

const cats = ['Пиццы', 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты']
const activeIndex = 0;

export const Categories: React.FC<ICategories> = ({ className }) => {

	return (
		<div className={cn(s.categories, className)}>
			{cats.map((cat, index) => (
				<a className={cn(s.categoryItem,
					activeIndex === index && s.active
				)}
					key={index}>
					<button>
						{cat}
					</button>
				</a>
			))}
		</div>
	)
}