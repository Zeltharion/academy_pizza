import { SelectProps } from "@radix-ui/react-select";

type SelectItem = {
	value: string;
	label: React.ReactNode;
};

export interface IFormSelect extends SelectProps {
	label?: string;
	required?: boolean;
	name: string;
	items: Array<SelectItem>;
	placeholder?: string;
}