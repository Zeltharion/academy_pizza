import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemValues } from "@/shared/dto";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const useCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{ token },
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						productVariant: {
							include: {
								product: true,
							}
						},
						ingredients: true,
					}
				},
			},
		});

		return NextResponse.json(useCart);
	} catch (error) {
		console.log("[API_CART_GET] Server error: ", error);
		return NextResponse.json({ message: "Error while getting cart" }, { status: 404 });
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;

		if (!token) { token = crypto.randomUUID() }

		const userCart = await findOrCreateCart(token);
		const data = (await req.json()) as CreateCartItemValues;
		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productVariantId: data.productVariantId,
				ingredients: data.ingredients ? {
					every: {
						id: {
							in: data.ingredients,
						},
					}
				} : undefined,
			},
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productVariantId: data.productVariantId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
				},
			});
		}

		const updatedUserCart = await updateCartTotalAmount(token);
		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set('cartToken', token);
		return resp;

	} catch (error) {
		console.log("[API_CART_POST] Server error: ", error);
		return NextResponse.json({ message: "Error while creating cart" }, { status: 404 });
	}
}