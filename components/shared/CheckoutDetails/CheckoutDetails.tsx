import { cn } from '@/shared/lib'
import { ICheckoutDetails } from './CheckoutDetails.types'
import s from './CheckoutDetails.module.scss'

export const CheckoutDetails: React.FC<ICheckoutDetails> = ({
	title,
	value,
	Icon,
	className
}) => {
	return (
		<div className={cn(s.checkoutDetails, className)}>
			<span className={s.checkoutDetails__info}>
				<div className={s.checkoutDetails__text}>
					{Icon && <Icon className={s.checkoutDetails__icon} />}
					{title}
				</div>
				<div className={s.checkoutDetails__line} />
			</span>

			<span className={s.checkoutDetails__price}>{value}</span>
		</div>
	)
}