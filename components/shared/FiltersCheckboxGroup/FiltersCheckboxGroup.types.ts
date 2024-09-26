import { IFilterCheckbox } from "../FilterCheckbox/FilterCheckbox.types";

type Item = IFilterCheckbox;

export interface IFiltersCheckboxGroup {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string[];
	className?: string;
}

