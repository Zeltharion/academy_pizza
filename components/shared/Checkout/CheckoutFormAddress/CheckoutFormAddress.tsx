'use client'

import { cn } from "@/shared/lib"
import { WhiteBlock, FormTextarea, AddressInput } from "@/components/shared"
import s from './CheckoutFormAddress.module.scss'
import { Controller, useFormContext } from "react-hook-form"

interface ICheckoutFormAddress {
	className?: string
}

export const CheckoutFormAddress: React.FC<ICheckoutFormAddress> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title="3. Адрес доставки">
			<div className={cn(s.checkoutFormAddress, className)}>
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) =>
						<AddressInput
							onChange={field.onChange}
							error={fieldState.error?.message}
						/>
					}
				/>
				<FormTextarea
					name="comment"
					placeholder="Комментарий к заказу"
					rows={5}
				/>
			</div>
		</WhiteBlock>
	)
}