'use client'

import { Input, RangeSlider } from "@/components/ui"
import { FiltersCheckboxGroup, Title } from "@/components/shared"
import { useIngredients, useFilters, useQueryFilters } from "@/hooks"
import { cn } from "@/lib/utils"
import s from './Filters.module.scss'

interface IFiltersProps {
	className?: string
}

export const Filters: React.FC<IFiltersProps> = ({ className }) => {
	const { ingredients, isLoading} = useIngredients();
	const filters = useFilters()
	useQueryFilters(filters);

	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

	const updatePrices = (prices: number[]) => {
		filters.setSelectedPrices('priceFrom', prices[0])
		filters.setSelectedPrices('priceTo', prices[1])
	}

	return (
		<div className={cn(s.filters, className)}>
			<Title
				text="Фильтры"
				size="sm"
				className="mb-5 font-bold"
			/>

			<FiltersCheckboxGroup
				title="Тесто"
				name="selectedPizzaTypes"
				className="mb-5"
				onClickCheckbox={filters.setSelectedPizzaTypes}
				selectedValues={filters.selectedPizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<FiltersCheckboxGroup
				title="Размеры"
				name="selectedSizes"
				className="mb-5"
				onClickCheckbox={filters.setSelectedSizes}
				selectedValues={filters.selectedSizes}
				items={[
					{ text: '20см', value: '20' },
					{ text: '30см', value: '30' },
					{ text: '40см', value: '40' },
				]}
			/>

			<div className={s.priceRange}>
				<p className={s.priceRange__title}>
					Цена от и до:
				</p>
				<div className={s.priceRange__inputs}>
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={String(filters.selectedPrices.priceFrom)}
						onChange={(e) => filters.setSelectedPrices('priceFrom', Number(e.target.value))}
					/>
					<Input
						type="number"
						placeholder="1000"
						min={100}
						max={1000}
						value={String(filters.selectedPrices.priceTo)}
						onChange={(e) => filters.setSelectedPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.selectedPrices.priceFrom || 0, filters.selectedPrices.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			<FiltersCheckboxGroup
				title="Ингредиенты"
				name="ingredients"
				className="mt-5"
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={isLoading}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
			/>
		</div>
	)
}