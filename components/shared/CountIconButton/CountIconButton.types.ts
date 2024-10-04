import { ICountButtonContainer } from "../CountButtonContainer/CountButtonContainer.types";

export interface ICountIconButton {
	size?: ICountButtonContainer['size'];
	disabled?: boolean;
	type?: 'plus' | 'minus';
	onClick?: () => void;
}