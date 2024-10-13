export type AdminDeleteButtonType = 'user' | 'category' | 'product' | 'ingredient' | 'product-variants';

export interface IAdminDeleteButton {
	id: number;
	type: AdminDeleteButtonType;
	className?: string;
}