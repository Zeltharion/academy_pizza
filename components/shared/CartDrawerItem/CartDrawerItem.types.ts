import { ICartItem } from "../CartItemDetails/CartItemDetails.types";

export interface ICartDrawerItem extends ICartItem {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickDeleteButton?: () => void
	className?: string
}
