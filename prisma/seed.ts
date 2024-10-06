import { hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "./prismaClient";
import {
	categories,
	ingredients,
	pizzaObject1,
	pizzaObject2,
	pizzaObject3,
	products
} from "./constants";

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

type productVariantSize = 20 | 30 | 40;
type productVariantPizzaType = 1 | 2;

const generateProductVariant = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number;
	pizzaType?: productVariantPizzaType;
	size?: productVariantSize;
}) => {
	return {
		productId,
		price: randomNumber(400, 800),
		pizzaType,
		size,
	} as Prisma.ProductVariantUncheckedCreateInput;
};

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Test User',
				email: 'user@test.ru',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin',
				email: 'admin@test.ru',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	});

	await prisma.category.createMany({ data: categories });
	await prisma.ingredient.createMany({ data: ingredients });
	await prisma.product.createMany({ data: products });

	const pizza1 = await prisma.product.create({ data: pizzaObject1 });
	const pizza2 = await prisma.product.create({ data: pizzaObject2 });
	const pizza3 = await prisma.product.create({ data: pizzaObject3 });


	await prisma.productVariant.createMany({
		data: [
			generateProductVariant({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: 1 }),
			generateProductVariant({ productId: 2 }),
			generateProductVariant({ productId: 3 }),
			generateProductVariant({ productId: 4 }),
			generateProductVariant({ productId: 5 }),
			generateProductVariant({ productId: 6 }),
			generateProductVariant({ productId: 7 }),
			generateProductVariant({ productId: 8 }),
			generateProductVariant({ productId: 9 }),
			generateProductVariant({ productId: 10 }),
			generateProductVariant({ productId: 11 }),
			generateProductVariant({ productId: 12 }),
			generateProductVariant({ productId: 13 }),
			generateProductVariant({ productId: 14 }),
			generateProductVariant({ productId: 15 }),
			generateProductVariant({ productId: 16 }),
			generateProductVariant({ productId: 17 }),
		]
	})

	await prisma.cart.createMany({
		data: [
			{
				token: 'cartUser1',
				userId: 1,
				totalAmount: 0,
			},
			{
				token: 'cartUser2',
				userId: 2,
				totalAmount: 0,
			},
		]
	})

	await prisma.cartItem.create({
		data: {
			productVariantId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			}
		}
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	}).catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	})