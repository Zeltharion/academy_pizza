export interface ICountButtonContainer {
	value?: number;
	size?: 'sm' | 'lg';
	className?: string;
	onClick?: (type: 'plus' | 'minus') => void;
}