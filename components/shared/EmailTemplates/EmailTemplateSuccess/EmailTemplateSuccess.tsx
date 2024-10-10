import { EmailTemplate } from "@/components/shared";
import { cn, formatNumberToMoney } from "@/shared/lib";
import { IEmailTemplateSuccess } from "./EmailTemplateSuccess.types";
import s from './EmailTemplateSuccess.module.scss'

export const EmailTemplateSuccess: React.FC<IEmailTemplateSuccess> = ({
	orderId,
	items,
	totalAmount,
	className
}) => {
	return (
		<EmailTemplate title="Заказ успешно оплачен" className={cn(s.emailTemplateSuccess, className)}>
			<p>Ваш заказ #{orderId} на сумму {formatNumberToMoney(totalAmount)} оплачен.</p>
			<p>Список товаров:</p>
			<ul className={s.emailTemplateSuccess__list}>
				{items.map(item => (
					<li key={item.id} className={s.emailTemplateSuccess__list__item}>
						<img
							src={item.productVariant.product.imageUrl}
							alt={item.productVariant.product.name}
						/>
						<p>{item.productVariant.product.name} - {formatNumberToMoney(item.productVariant.price)} x {item.quantity} = {formatNumberToMoney(item.productVariant.price * item.quantity)}</p>
					</li>
				))}
			</ul>
		</EmailTemplate>
	)
}
