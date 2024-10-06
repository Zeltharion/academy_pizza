import { ICartItemDetails } from "../../Cart/CartItemDetails/CartItemDetails.types";

export interface ICheckoutItem extends ICartItemDetails {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickDeleteButton?: () => void;
	className?: string;
}