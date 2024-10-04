import { prisma } from "@/prisma/prismaClient"
import { calculateCartItemTotalPrice } from "@/shared/lib";

/**
 * Updates the total amount of a user's cart in the database.
 * @param {string} token - The user's cart token.
 * @example updateCartTotalAmount("cartToken123")
 * @returns {Promise<Cart>} The updated cart.
 */

export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
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
	})

	if (!userCart) { return }

	const totalAmount = userCart?.items.reduce((acc, item) => {
		return acc + calculateCartItemTotalPrice(item);
	}, 0)

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount,
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
}