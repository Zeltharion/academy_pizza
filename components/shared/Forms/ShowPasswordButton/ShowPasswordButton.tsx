import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/shared/lib';
import { IShowPasswordButton } from './ShowPasswordButton.types';
import s from './ShowPasswordButton.module.scss';

export const ShowPasswordButton: React.FC<IShowPasswordButton> = ({
	onClick,
	showPassword = false,
	className,
}) => {
	return (
		<button
			className={cn(s.showPasswordButton, className)}
			type="button"
			onClick={onClick}
		>
			{showPassword ? <EyeOffIcon /> : <EyeIcon />}
		</button>
	);
}