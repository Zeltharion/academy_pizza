import { Button, Skeleton } from '@/components/ui'
import { Package, Percent, Truck, ArrowRight } from 'lucide-react'
import { CheckoutDetails, WhiteBlock } from '@/components/shared'
import { cn, formatNumberToMoney } from '@/shared/lib';
import { ICheckoutSidebar } from './CheckoutSidebar.type';
import s from './СheckoutSidebar.module.scss'

export const TAX = 1.5;
export const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<ICheckoutSidebar> = ({
	loading,
	totalAmount,
	className
}) => {
	const taxPrice = Math.floor((totalAmount * TAX) / 100);
	const totalPrice = totalAmount + taxPrice + DELIVERY_PRICE;

	return (
		<WhiteBlock className={cn(s.checkoutSidebar, className)}>
			<div className={s.checkoutSidebar__total}>
				<span className={s.checkoutSidebar__total__text}>Итого:</span>
				{loading ? <Skeleton className="h-8 w-20" /> : <span className={s.checkoutSidebar__total__price}>{formatNumberToMoney(totalPrice)}</span>}
			</div>

			<CheckoutDetails
				title="Стоимость корзины"
				Icon={Package}
				value={formatNumberToMoney(totalAmount)}
				loading={loading}
			/>
			<CheckoutDetails
				title="Сбор"
				Icon={Percent}
				value={formatNumberToMoney(taxPrice)}
				loading={loading}
			/>
			<CheckoutDetails
				title="Доставка"
				Icon={Truck}
				value={formatNumberToMoney(DELIVERY_PRICE)}
				loading={loading}
			/>

			<Button type="submit" className={s.checkoutSidebar__button} loading={loading}>
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	)
}