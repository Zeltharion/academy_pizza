'use client'

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import s from './SortPopup.module.scss'

interface ISortPopup {
	className?: string
}

export const SortPopup: React.FC<ISortPopup> = ({ className }) => {
	const [sortType, setSortType] = useState<"popular" | "priceAsc" | "priceDesc">("popular")

	const handleSortChange = (type: typeof sortType) => {
		setSortType(type)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className={cn(s.sortPopup, className)}>
					<ArrowUpDown size={16} />
					<b>Сортировка:</b>
					<b className="text-primary">{sortType === "popular" ? "популярное" : sortType === "priceAsc" ? "дешевые" : "дорогие"}</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className={s.sortPopup__content}>
				<ul className="flex flex-col gap-2">
					<li className={cn("bg-gray-50 hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md", {
						"bg-secondary text-primary": sortType === "popular"
					})}
						onClick={() => handleSortChange("popular")}
					>Сначала популярное</li>
					<li className={cn("bg-gray-50 hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md", {
						"bg-secondary text-primary": sortType === "priceAsc"
					})}
						onClick={() => handleSortChange("priceAsc")}
					>Сначала недорогие</li>
					<li className={cn("bg-gray-50 hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md", {
						"bg-secondary text-primary": sortType === "priceDesc"
					})}
						onClick={() => handleSortChange("priceDesc")}
					>Сначала дорогие</li>
				</ul>
			</PopoverContent>
		</Popover>
	)
}
