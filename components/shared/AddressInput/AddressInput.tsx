'use client'

import { AddressSuggestions } from 'react-dadata'
import { ErrorText } from '@/components/shared';
import { Input } from '@/components/ui';
import { cn } from '@/shared/lib';
import { IAddressInput } from './AdressInput.types';
import s from './AddressInput.module.scss'
import 'react-dadata/dist/react-dadata.css'

export const AddressInput: React.FC<IAddressInput> = ({
	onChange,
	error,
	className
}) => {
	return (
		<div className={s.addressInput}>
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