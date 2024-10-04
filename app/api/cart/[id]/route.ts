import { prisma } from "@/prisma/prismaClient";
import { updateCartTotalAmount } from "@/shared/lib/updateCartTotalAmount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const data = (await req.json()) as { quantity: number };
		const token = req.cookies.get("cartToken")?.value;
		
		if (!token) { return NextResponse.json({ message: 'Cart token not found' }, { status: 404 }); }

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(params.id),
			},
		})
		
		if (!cartItem) { return NextResponse.json({ message: 'Cart item not found' }, { status: 404 }); }
		
		await prisma.cartItem.update({
			where: {
				id: Number(params.id),
			},
			data: {
				quantity: data.quantity,
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.error('[API_CART_PATCH] Server error: ', error);
		return NextResponse.json({ message: 'Server error while updating cart' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) { return NextResponse.json({ message: 'Cart token not found' }, { status: 404 }); }

		await prisma.cartItem.delete({
			where: {
				id: Number(params.id),
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.error('[API_CART_DELETE] Server error', error);
		return NextResponse.json({ message: 'Server error while deleting cart item' }, { status: 500 });
	}
}