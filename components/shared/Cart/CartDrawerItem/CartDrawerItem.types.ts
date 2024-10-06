import { ICartItemDetails } from "../CartItemDetails/CartItemDetails.types";

export interface ICartDrawerItem extends ICartItemDetails {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickDeleteButton?: () => void
	className?: string
}
