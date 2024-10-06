'use client'

import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared';
import { cn } from '@/shared/lib';
import { IFormTextarea } from './FormTextarea.types';
import s from './FormTextarea.module.scss';

export const FormTextarea: React.FC<IFormTextarea> = ({
	name,
	label,
	required,
	className,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext();

	const inputError = errors?.[name]?.message as string;
	const inputValue = watch(name);

	const onClickClearButton = () => {
		setValue(name, '', { shouldValidate: true });
	}

	return (
		<div className={cn(s.formTextarea, className)}>
			<p className={s.formTextarea__label}>
				{label} 
				{required && <RequiredSymbol />}
			</p>
			<div className="relative">
				<Textarea
					className={cn(s.formTextarea__textarea)}
					{...register(name)}
					{...props}
				/>
				{inputValue && <ClearButton onClick={onClickClearButton} />}
			</div>
			{inputValue && <ErrorText text={inputError} className="mt-1" />}
		</div>
	);
};
