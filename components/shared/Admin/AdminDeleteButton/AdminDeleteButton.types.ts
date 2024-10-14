export type AdminDeleteButtonType = 'user' | 'category' | 'product' | 'ingredient' | 'product-variants' | 'order' | 'orders';

export interface IAdminDeleteButton extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'id'> {
	id: number | number[];
	type: AdminDeleteButtonType;
	className?: string;
}