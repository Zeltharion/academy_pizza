'use client'

import { useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol } from "@/components/shared"
import { Input } from "@/components/ui"
import { cn } from "@/shared/lib"
import { IFormInput } from "./FormInput.types"
import s from './FormInput.module.scss'

export const FormInput: React.FC<IFormInput> = ({
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

	const inputValue = watch(name);
	const inputError = errors[name]?.message as string;

	const onClickClearButton = () => {
		setValue(name, '', { shouldValidate: true });
	}

	return (
		<div className={cn(s.formInput, className)}>
			{label && (
				<p className={s.formInput__label}>
					{label} {required && <RequiredSymbol />}
				</p>
			)}
			<div className="relative">
				<Input
					className={cn(s.formInput__input)}
					{...register(name)}
					{...props}
				/>
				{inputValue && <ClearButton onClick={onClickClearButton} />}
			</div>
			{inputError && <ErrorText text={inputError} className="mt-1" />}
		</div>
	)
}