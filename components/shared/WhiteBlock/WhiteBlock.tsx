import { Title } from '@/components/shared';
import { cn } from '@/shared/lib';
import { IWhiteBlock } from './WhiteBlock.types';
import s from './WhiteBlock.module.scss';

export const WhiteBlock: React.FC<React.PropsWithChildren<IWhiteBlock>> = ({
	title,
	endAdornment,
	className,
	contentClassName,
	children,
}) => {
	return (
		<div className={cn(s.whiteBlock, className)}>
			{title && (
				<div className={s.whiteBlock__header}>
					<Title text={title} size="sm" className="font-bold" />
					{endAdornment}
				</div>
			)}

			<div className={cn(s.whiteBlock__content, contentClassName)}>{children}</div>
		</div>
	);
};
