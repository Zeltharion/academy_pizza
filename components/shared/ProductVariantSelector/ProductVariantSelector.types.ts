type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
}

export interface IProductVariantSelector {
	variants: readonly Variant[];
	onClick?: (value: Variant['value']) => void;
	selectedValue?: Variant['value'];
	className?: string;
}