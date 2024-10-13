'use server'

import { cookies } from "next/headers";
import { prisma } from "@/prisma/prismaClient";
import { OrderStatus, Prisma } from "@prisma/client";
import { EmailTemplatePayment, EmailTemplateVerificationCode } from "@/components/shared";
import { TCheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/getUserSession";
import { hashSync } from "bcrypt";
import { revalidatePath } from "next/cache";
import urls from "@/shared/config/urls";

// CLIENT ACTIONS //

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

// USERS ADMIN ACTIONS //
export async function updateUser(id: number, data: Prisma.UserUpdateInput) {
	try {
		await prisma.user.update({
			where: {
				id,
			},
			data: {
				...data,
				verified: new Date(),
				...(data.password && { password: hashSync(String(data.password), 10) }),
			},
		});
	} catch (error) {
		console.log('[UPDATE_USER] Server error: ', error);
		throw new Error('Server error while updating user');
	}
}

export async function createUser(data: Prisma.UserCreateInput) {
	try {
		await prisma.user.create({
			data: {
				...data,
				verified: new Date(),
				password: hashSync(data.password, 10),
			},
		});

		revalidatePath(urls.admin_users);
	} catch (error) {
		console.log('[CREATE_USER] Server error:', error);
		throw new Error('Server error while creating user');
	}
}

export async function deleteUser(id: number) {
	try {
		await prisma.user.delete({
			where: {
				id,
			},
		});

		revalidatePath(urls.admin_users)
	} catch (error) {
		console.log('[DELETE_USER] Server error: ', error);
		throw new Error('Server error while deleting user');
	}
}

// CATEGORIES ADMIN ACTIONS //
export async function updateCategory(id: number, data: Prisma.CategoryUpdateInput) {
	try {
		await prisma.category.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('[UPDATE_CATEGORY] Server error: ', error);
		throw new Error('Server error while updating category');
	}
}

export async function createCategory(data: Prisma.CategoryCreateInput) {
	try {
		await prisma.category.create({
			data,
		});

		revalidatePath(urls.admin_categories);
	} catch (error) {
		console.log('[CREATE_CATEGORY] Server error:', error);
		throw new Error('Server error while creating category');
	}
}

export async function deleteCategory(id: number) {
	try {
		await prisma.category.delete({
			where: {
				id,
			},
		});

		revalidatePath(urls.admin_categories);
	} catch (error) {
		console.log('[DELETE_CATEGORY] Server error: ', error);
		throw new Error('Server error while deleting category');
	}
}

// PRODUCTS ADMIN ACTIONS //
export async function updateProduct(id: number, data: Prisma.ProductUpdateInput) {
	try {
		await prisma.product.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('[UPDATE_PRODUCT] Server error: ', error);
		throw new Error('Server error while updating product');
	}
}

export async function createProduct(data: Prisma.ProductCreateInput) {
	try {
		await prisma.product.create({
			data,
		});

		revalidatePath(urls.admin_products);
	} catch (error) {
		console.log('[CREATE_PRODUCT] Server error: ', error);
		throw new Error('Server error while creating product');
	}
}

export async function deleteProduct(id: number) {
	try {
		await prisma.product.delete({
			where: {
				id,
			},
		});

		revalidatePath(urls.admin_products);
	} catch (error) {
		console.log("[DELETE_PRODUCT] Server error: ", error);
		throw new Error("Server error while deleting product");
	}
}

// PRODUCT VARIANTS ADMIN ACTIONS //

export async function updateProductVariant(id: number, data: Prisma.ProductVariantUpdateInput) {
	try {
		await prisma.productVariant.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('[UPDATE_PRODUCT_VARIANT] Server error: ', error);
		throw new Error('Server error while updating product variant');
	}
}

export async function createProductVariant(data: Prisma.ProductVariantUncheckedCreateInput) {
	try {
		await prisma.productVariant.create({
			data: {
				price: data.price,
				size: data.size,
				pizzaType: data.pizzaType,
				productId: data.productId,
			},
		});

		revalidatePath(urls.admin_product_variants);
	} catch (error) {
		console.log('[CREATE_PRODUCT_VARIANT] Server error: ', error);
		throw new Error('Server error while creating product variant');
	}
}

export async function deleteProductVariant(id: number) {
	try {
		await prisma.productVariant.delete({
			where: {
				id,
			},
		});

		revalidatePath(urls.admin_product_variants);
	} catch (error) {
		console.log('[DELETE_PRODUCT_VARIANT] Server error: ', error);
		throw new Error('Server error while deleting product variant');
	}
}

// INGREDIENTS ADMIN ACTIONS //

export async function updateIngredient(id: number, data: Prisma.IngredientUpdateInput) {
	try {
		await prisma.ingredient.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('[UPDATE_INGREDIENT] Server error: ', error);
		throw new Error('Server error while updating ingredient');
	}
}

export async function createIngredient(data: Prisma.IngredientCreateInput) {
	try {
		await prisma.ingredient.create({
			data: {
				name: data.name,
				imageUrl: data.imageUrl,
				price: data.price,
			},
		});

		revalidatePath(urls.admin_ingredients);
	} catch (error) {
		console.log('[CREATE_INGREDIENT] Server error: ', error);
		throw new Error('Server error while creating ingredient');
	}
}

export async function deleteIngredient(id: number) {
	try {
		await prisma.ingredient.delete({
			where: {
				id,
			},
		});

		revalidatePath(urls.admin_ingredients);
	} catch (error) {
		console.log('[DELETE_INGREDIENT] Server error: ', error);
		throw new Error('Server error while deleting ingredient');
	}
}