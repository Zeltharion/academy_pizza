'use client';

import { X } from 'lucide-react';
import * as CartItemDetails from '@/components/shared/Cart/CartItemDetails';
import { cn } from '@/shared/lib';
import { ICheckoutItem } from './CheckoutItem.type';
import s from './CheckoutItem.module.scss'

export const CheckoutItem: React.FC<ICheckoutItem> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	className,
	disabled,
	onClickCountButton,
	onClickDeleteButton,
}) => {
	return (
		<div className={cn(s.checkoutItem, { [s.disabledItem]: disabled }, className)}>
			<div className={s.checkoutItem__info}>
				<CartItemDetails.Image src={imageUrl} />
				<CartItemDetails.Info details={details} name={name} />
			</div>

			<CartItemDetails.Price value={price} />

			<div className={s.checkoutItem__buttons}>
				<CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
				<button type="button" onClick={onClickDeleteButton}>
					<X className={s.checkoutItem__deleteBtn} size={20} />
				</button>
			</div>
		</div>
	);
};
