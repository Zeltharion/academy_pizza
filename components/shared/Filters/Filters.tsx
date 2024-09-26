import { cn } from "@/lib/utils"
import s from './Filters.module.scss'
import { FilterCheckbox, FiltersCheckboxGroup, Title } from "@/components/shared"
import { Input, RangeSlider } from "@/components/ui"

interface IFilters {
	className?: string
}

export const Filters: React.FC<IFilters> = ({ className }) => {
	const checkboxes = [
		{
			text: "Сырный соус",
			value: "1",
		},
		{
			text: "Моцарелла",
			value: "2",
		},
		{
			text: "Чеснок",
			value: "3",
		},
		{
			text: "Солёные огурчики",
			value: "4",
		},
		{
			text: "Красный лук",
			value: "5",
		},
		{
			text: "Томаты",
			value: "6",
		},
		{
			text: "Сырный соус",
			value: "1",
		},
		{
			text: "Моцарелла",
			value: "2",
		},
		{
			text: "Чеснок",
			value: "3",
		},
		{
			text: "Солёные огурчики",
			value: "4",
		},
		{
			text: "Красный лук",
			value: "5",
		},
		{
			text: "Томаты",
			value: "6",
		},
	]

	return (
		<div className={cn(s.filters, className)}>
			<Title
				text="Фильтры"
				size="sm"
				className="mb-5 font-bold"
			/>

			<div className={s.checkboxes}>
				<FilterCheckbox
					text="Можно собирать"
					value="1"
				/>
				<FilterCheckbox
					text="Новинки"
					value="2"
				/>
			</div>

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
						defaultValue={0}
					/>
					<Input
						type="number"
						placeholder="1000"
						min={100}
						max={1000}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[0, 1000]}
				/>
			</div>

			<FiltersCheckboxGroup
				title="Ингредиенты"
				className="mt-5"
				limit={6}
				defaultItems={checkboxes}
				items={checkboxes}
			/>
		</div>
	)
}