export interface IAuthModal {
	open: boolean;
	onClose: () => void;
	className?: string
}
export type AuthType = 'login' | 'register';
