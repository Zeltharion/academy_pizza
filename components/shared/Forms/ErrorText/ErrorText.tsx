import { cn } from '@/shared/lib';

interface IErrorText {
	text: string;
	className?: string;
}

export const ErrorText: React.FC<IErrorText> = ({ text, className }) => {
	return <p className={cn('text-red-500 text-[13px]', className)}>{text}</p>;
};
