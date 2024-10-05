import { prisma } from "@/prisma/prismaClient"

/**
 * Finds a cart by token or creates a new one if it doesn't exist.
 *
 * @param {string} token - The token of the cart to find or create.
 * @example findOrCreateCart("cartToken123")
 * @returns {Promise<Cart>} The found or created cart.
 */
export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
	})

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token,
			},
		})
	}

	return userCart;
}