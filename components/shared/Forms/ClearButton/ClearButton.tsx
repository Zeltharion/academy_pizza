import { cn } from '@/shared/lib';
import { X } from 'lucide-react';
import s from './ClearButton.module.scss'

interface IClearButton {
	onClick?: VoidFunction;
	className?: string;
}

export const ClearButton: React.FC<IClearButton> = ({ onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={cn(s.clearButton, className)}>
			<X className="h-5 w-5" />
		</button>
	);
};
