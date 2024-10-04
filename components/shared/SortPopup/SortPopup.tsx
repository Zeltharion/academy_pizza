import { cn } from "@/shared/lib/utils"
import s from './SortPopup.module.scss'
import { ArrowUpDown } from "lucide-react"

interface ISortPopup {
	className?: string
}

export const SortPopup: React.FC<ISortPopup> = ({ className }) => {

	return (
		<div className={cn(s.sortPopup, className)}>
			<ArrowUpDown size={16}/>
			<b>Сортировка:</b>
			<b className="text-primary">популярное</b>
		</div>
	)
}