'use client'

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol, ShowPasswordButton } from "@/components/shared"
import { Input } from "@/components/ui"
import { cn } from "@/shared/lib"
import { IFormInput } from "./FormInput.types"
import s from './FormInput.module.scss'

export const FormInput: React.FC<IFormInput> = ({
	name,
	label,
	required,
	className,
	type = 'text',
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

	const [showPassword, setShowPassword] = useState(false);

	const onClickShowPassword = () => setShowPassword(!showPassword);

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
					type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
					className={cn(s.formInput__input, inputError && 'border-red-400')}
					{...register(name)}
					{...props}
				/>
				<div className={s.formInput__buttons}>
					{type === 'password' && <ShowPasswordButton showPassword={showPassword} onClick={onClickShowPassword} />}
					{inputValue && <ClearButton onClick={onClickClearButton} />}
				</div>
			</div>
			{inputError && <ErrorText text={inputError} className="mt-1" />}
		</div>
	)
}
