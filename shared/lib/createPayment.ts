import { PaymentData } from "@/types/yookassa";
import axios from "axios";

interface ICreatePayment {
	description: string;
	orderId: number;
	amount: number;
}

export async function createPayment(details: ICreatePayment) {
	const { data } = await axios.post<PaymentData>('https://api.yookassa.ru/v3/payments', {
		amount: {
			value: details.amount,
			currency: 'RUB',
		},
		capture: true,
		description: details.description,
		metadata: {
			order_id: details.orderId,
		},
		confirmation: {
			type: 'redirect',
			return_url: process.env.YOOKASSA_RETURN_URL as string,
		}
	}, {
		auth: {
			username: process.env.YOOKASSA_SHOP_ID as string,
			password: process.env.YOOKASSA_API_TOKEN as string,
		},
		headers: {
			'Idempotence-key': Math.random().toString(36).substring(7) + new Date().getTime().toString(),
		}
	})

	return data;
}