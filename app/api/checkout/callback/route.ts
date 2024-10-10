import { EmailTemplateSuccess } from "@/components/shared";
import { prisma } from "@/prisma/prismaClient";
import { CartItemDTO } from "@/shared/dto";
import { sendEmail } from "@/shared/lib";
import { PaymentCallbackData } from "@/types/yookassa";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		})

		if (!order) {
			return NextResponse.json({ message: 'Order not found' }, { status: 404 });
		}

		const isSucceeded = body.object.status === 'succeeded';

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
			},
		})

		const items = JSON.parse(order.items as unknown as string)  as CartItemDTO[];

		if (isSucceeded) {
			await sendEmail(order.email, 'Academy Pizza | Заказ успешно оплачен', EmailTemplateSuccess({
				orderId: order.id,
				items,
				totalAmount: order.totalAmount,
			}))
		}

		return NextResponse.json({ message: 'Success' });
	} catch (error) {
		console.error('[API_CHECKOUT_CALLBACK] Server error: ', error);
		return NextResponse.json({ message: 'Server error while checkout cart' }, { status: 500 });
	}
}