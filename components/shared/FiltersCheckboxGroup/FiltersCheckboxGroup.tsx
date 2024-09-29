'use client'

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui"
import s from './FiltersCheckboxGroup.module.scss'
import { IFiltersCheckboxGroup } from "./FiltersCheckboxGroup.types"
import { FilterCheckbox } from "@/components/shared"
import { useState } from "react"

export const FiltersCheckboxGroup: React.FC<IFiltersCheckboxGroup> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = "Поиск...",
	onChange,
	defaultValue,
	className,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const itemsList = showAll ? items.filter((item) =>
		item.text.toLowerCase().includes(searchValue.toLowerCase()))
		: defaultItems?.slice(0, limit);

	return (
		<div className={cn(s.filtersCheckboxGroup, className)}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
						onChange={onChangeSearchInput}
					/>
				</div>
			)}

			<div className={s.filterCheckboxes}>
				{itemsList.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={(e) => console.log(e)}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? s.showAllItems : ''}>
					<button
						className="text-primary mt-3"
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? "Скрыть" : "+ Показать все"}
					</button>
				</div>
			)}
		</div>
	)
}