import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import s from './SortPopup.module.scss'

interface ISortPopup {
	className?: string
}

export const SortPopup: React.FC<ISortPopup> = ({ className }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className={cn(s.sortPopup, className)}>
					<ArrowUpDown size={16} />
					<b>Сортировка:</b>
					<b className="text-primary">популярное</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className={s.sortPopup__content}>
				<ul className="flex flex-col gap-2">
					<li className="bg-gray-50 hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md">Сначала популярное</li>
					<li className="bg-gray-50 hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md">Сначала недорогие</li>
					<li className="bg-gray-50 hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md">Сначала дорогие</li>
				</ul>
			</PopoverContent>
		</Popover>
	)
}