'use client'

import { useState } from "react"
import { cn } from "@/shared/lib/utils"
import { Input, Skeleton } from "@/components/ui"
import { FilterCheckbox } from "@/components/shared"
import { IFiltersCheckboxGroup } from "./FiltersCheckboxGroup.types"
import s from './FiltersCheckboxGroup.module.scss'

export const FiltersCheckboxGroup: React.FC<IFiltersCheckboxGroup> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	loading = false,
	searchInputPlaceholder = "Поиск...",
	onClickCheckbox,
	selectedValues,
	className,
	name,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const itemsList = showAll ? items.filter((item) =>
		item.text.toLowerCase().includes(searchValue.toLowerCase()))
		: (defaultItems || items).slice(0, limit);

	return (
		<div className={cn(s.filtersCheckboxGroup, className)}>
			<p className={s.filtersCheckboxGroup__title}>{title}</p>
			{loading ? (
				<>
					{Array(limit).fill(0).map((_, index) => (
						<div className={s.filtersCheckboxGroup__skeleton} key={index}>
							<Skeleton className={s.filtersCheckboxGroup__skeleton__checkbox} />
							<Skeleton className={s.filtersCheckboxGroup__skeleton__text} />
						</div>
					))}
					<Skeleton className={s.filtersCheckboxGroup__skeleton__moreBtn} />
				</>
			) : (
				<>
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
									name={name}
									endAdornment={item.endAdornment}
									checked={selectedValues?.has(item.value)}
									onCheckedChange={() => onClickCheckbox?.(item.value)}
								/>
							))
						}
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
				</>
			)}
		</div>
	)
}