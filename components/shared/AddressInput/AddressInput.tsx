'use client'

import { AddressSuggestions } from 'react-dadata'
import { ErrorText } from '@/components/shared';
import { IAddressInput } from './AdressInput.types';
import { cn } from '@/shared/lib';
import s from './AddressInput.module.scss'
import 'react-dadata/dist/react-dadata.css'

export const AddressInput: React.FC<IAddressInput> = ({
	onChange,
	error,
	className
}) => {
	return (
		<div className={cn(s.addressInput, className)}>
			<AddressSuggestions
				token={process.env.DADATA_API_TOKEN!}
				count={5}
				onChange={(data) => onChange?.(data?.value)}
				delay={100}
			/>
			{error && <ErrorText text={error} />}
		</div>
	)
}