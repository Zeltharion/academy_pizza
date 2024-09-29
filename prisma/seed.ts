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

	const pizzaIds = [pizza1.id, pizza2.id, pizza3.id];
	const pizzaTypes: productVariantPizzaType[] = [1, 2];
	const sizes: productVariantSize[] = [20, 30, 40];

	const otherProductIds = Array.from({ length: 17 }, (_, i) => i + 1);

	const productVariants = [
		...pizzaIds.flatMap(productId =>
			pizzaTypes.flatMap(pizzaType =>
				sizes.map(size => generateProductVariant({ productId, pizzaType, size }))
			)
		),
		...otherProductIds.map(productId => generateProductVariant({ productId }))
	];

	await prisma.productVariant.createMany({ data: productVariants })
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
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