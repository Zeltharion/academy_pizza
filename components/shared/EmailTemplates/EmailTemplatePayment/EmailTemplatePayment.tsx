import { cn, formatNumberToMoney } from "@/shared/lib";
import { EmailTemplate } from "@/components/shared";
import { IEmailTemplatePayment } from "./EmailTemplatePayment.types";
import s from './EmailTemplatePayment.module.scss'

export const EmailTemplatePayment: React.FC<IEmailTemplatePayment> = ({
	orderId,
	totalAmount,
	paymentUrl,
	className
}) => {
	return (
		<EmailTemplate title={`Заказ #${orderId}`} className={cn(s.emailTemplatePayment, className)}>
			<p>Оплатите заказ на сумму {formatNumberToMoney(totalAmount)}</p>
			<p>Перейдите{' '}
				<a href={paymentUrl}
					target="_blank"
					rel="noreferrer"
					className="text-primary">
					по этой ссылке
				</a>
				{' '}для оплаты заказа.</p>
		</EmailTemplate>
	)
}
