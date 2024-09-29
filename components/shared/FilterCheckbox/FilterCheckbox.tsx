import React from 'react';
import { Checkbox } from '@/components/ui';
import { IFilterCheckbox } from './FilterCheckbox.types';
import s from './FilterCheckbox.module.scss';

export const FilterCheckbox: React.FC<IFilterCheckbox> = ({
	text,
	value,
	endAdornment,
	onCheckedChange,
	checked,
	name,
}) => {
	return (
		<div className={s.filterCheckbox}>
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className={s.filterCheckbox__checkbox}
				id={`checkbox-${String(name)}-${String(value)}`}
			/>
			<label
				htmlFor={`checkbox-${String(name)}-${String(value)}`}
				className={s.filterCheckbox__label}>
				{text}
			</label>
			{endAdornment}
		</div>
	);
};
