export interface IIngredientCard {
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
	className?: string;
}