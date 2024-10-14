export interface IProductForm {
	imageUrl: string;
	name: string;
	price: number;
	description?: string;
	loading?: boolean;
	onSubmit?: VoidFunction;
	className?: string
}