import { FormInput, WhiteBlock } from "@/components/shared"
import { cn } from "@/shared/lib"
import s from './CheckoutFormPersonal.module.scss'

interface ICheckoutFormPersonal {
	className?: string
}

export const CheckoutFormPersonal: React.FC<ICheckoutFormPersonal> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональные данные">
			<div className={cn(s.checkoutFormPersonal, className)}>
				<FormInput name="firstName" placeholder="Имя" />
				<FormInput name="lastName" placeholder="Фамилия" />
				<FormInput name="email" placeholder="E-mail" />
				<FormInput name="phone" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	)
}