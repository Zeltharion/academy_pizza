'use client'

import { Controller, useFormContext } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui";
import { ErrorText, RequiredSymbol } from "@/components/shared";
import { IFormSelect } from "./FormSelect.types";
import s from './FormSelect.module.scss';

export const FormSelect: React.FC<IFormSelect> = ({
	label,
	required,
	name,
	items,
	placeholder,
	...props
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const inputError = errors?.[name]?.message as string;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<div className={s.formSelect}>
					<p className={s.formSelect__label}>
						{label} {required && <RequiredSymbol />}
					</p>

					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
						{...props}
					>
						<SelectTrigger className="h-12">
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>
							{items.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{inputError && <ErrorText text={inputError} className="mt-1" />}
				</div>
			)}
		>
		</Controller>
	)
}