type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ITitle {
	size?: TitleSize;
	className?: string;
	text: string;
}