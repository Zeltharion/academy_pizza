import { IFilterCheckbox } from "../FilterCheckbox/FilterCheckbox.types";

type Item = IFilterCheckbox;

export interface IFiltersCheckboxGroup {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	selectedValues?: Set<string>
	defaultValue?: string[];
	className?: string;
	name?: string;
}

