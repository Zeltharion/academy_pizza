import { CartItemDTO } from "@/shared/dto";

export interface IEmailTemplateSuccess {
	orderId: number;
	totalAmount: number;
	items: CartItemDTO[];
	className?: string;
}