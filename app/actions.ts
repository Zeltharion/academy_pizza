'use server'

import { cookies } from "next/headers";
import { prisma } from "@/prisma/prismaClient";
import { OrderStatus, Prisma } from "@prisma/client";
import { EmailTemplatePayment, EmailTemplateVerificationCode } from "@/components/shared";
import { TCheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/getUserSession";
import { hashSync } from "bcrypt";

export async function createOrder(data: TCheckoutFormValues) {
	try {
		const cookieStore = cookies()
		const cartToken = cookieStore.get('cartToken')?.value;

		if (!cartToken) { throw new Error('Cart token not found'); }

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productVariant: {
							include: {
								product: true
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			}
		});

		if (!userCart) { throw new Error('Cart not found'); }
		if (userCart?.totalAmount === 0) { throw new Error('Cart is empty'); }

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: `${data.firstName} ${data.lastName}`,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items)
			}
		});

		await prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount: 0,
			}
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id
			}
		});

		const paymentData = await createPayment({
			orderId: order.id,
			amount: order.totalAmount,
			description: `Оплата заказа #${order.id}`,
		})

		if (!paymentData) { throw new Error('Payment data not found'); }

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			}
		})

		const paymentUrl = paymentData.confirmation.confirmation_url;

		await sendEmail(data.email, `Academy Pizza | Оплатите ваш заказ #${order.id}`, EmailTemplatePayment({
			orderId: order.id,
			totalAmount: order.totalAmount,
			paymentUrl,
		}));

		return paymentUrl;
	} catch (error) {
		console.log('[CREATE_ORDER] Server error: ', error);
	}
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
	try {
		const currentUser = await getUserSession();
		if (!currentUser) {
			throw new Error('User not found');
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				password: hashSync(body.password, 10)
			}
		})

	} catch (error) {
		console.log('[UPDATE_USER_INFO] Server error: ', error);
		throw new Error('Server error while updating user info');
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			}
		})

		if (user) {
			if (!user.verified) {
				throw new Error('Email is not verified');
			}
			throw new Error('User already exists');
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			}
		})

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				userId: createdUser.id,
				code,
			}
		})

		await sendEmail(
			createdUser.email,
			'Academy Pizza | Подтвердите свою почту',
			EmailTemplateVerificationCode({ code })
		)

	} catch (error) {
		console.log('[REGISTER_USER] Server error: ', error);
		throw new Error('Server error while registering user');
	}
}