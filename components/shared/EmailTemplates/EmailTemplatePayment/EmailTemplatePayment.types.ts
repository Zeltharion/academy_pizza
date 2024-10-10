export interface IEmailTemplatePayment {
	orderId: number;
	totalAmount: number;
	paymentUrl: string;
	className?: string	
}