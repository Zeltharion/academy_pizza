import { cn } from '@/shared/lib/utils';
import React from 'react';
import s from './Container.module.scss'

interface Props {
	className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<div className={cn(s.container, className)}>
			{children}
		</div>
	);
};
