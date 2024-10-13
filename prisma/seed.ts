import { hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "./prismaClient";
import {
	categories,
	ingredients,
	products,
	stories,
	storyItems,
	pizzaPepperoniFresh,
	pizzaCheese,
	pizzaChorizoFresh,
	pizzaBurger,
	pizzaDiablo,
	pizzaDoubleChicken,
	pizzaFourSeasons,
	pizzaHamAndCheese,
	pizzaJulienne,
	pizzaMeatMixBavarianSausages
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
		price: randomNumber(200, 600),
		pizzaType,
		size,
	} as Prisma.ProductVariantUncheckedCreateInput;
};

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User Test',
				email: 'user@test.ru',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin Test',
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

	const pizzaCheeseObj = await prisma.product.create({ data: pizzaCheese });
	const pizzaChorizoFreshObj = await prisma.product.create({ data: pizzaChorizoFresh });
	const pizzaPepperoniFreshObj = await prisma.product.create({ data: pizzaPepperoniFresh });
	const pizzaBurgerObj = await prisma.product.create({ data: pizzaBurger });
	const pizzaDiabloObj = await prisma.product.create({ data: pizzaDiablo });
	const pizzaDoubleChickenObj = await prisma.product.create({ data: pizzaDoubleChicken });
	const pizzaFourSeasonsObj = await prisma.product.create({ data: pizzaFourSeasons });
	const pizzaHamAndCheeseObj = await prisma.product.create({ data: pizzaHamAndCheese });
	const pizzaJulienneObj = await prisma.product.create({ data: pizzaJulienne });
	const pizzaMeatMixBavarianSausagesObj = await prisma.product.create({ data: pizzaMeatMixBavarianSausages });

	await prisma.productVariant.createMany({
		data: [
			generateProductVariant({ productId: pizzaCheeseObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaCheeseObj.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizzaCheeseObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaChorizoFreshObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaChorizoFreshObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaChorizoFreshObj.id, pizzaType: 1, size: 40 }),
			generateProductVariant({ productId: pizzaChorizoFreshObj.id, pizzaType: 2, size: 20 }),
			generateProductVariant({ productId: pizzaChorizoFreshObj.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizzaChorizoFreshObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaPepperoniFreshObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaPepperoniFreshObj.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizzaPepperoniFreshObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaBurgerObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaBurgerObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaBurgerObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaDiabloObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaDiabloObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaDiabloObj.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizzaDiabloObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaDoubleChickenObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaDoubleChickenObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaDoubleChickenObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaFourSeasonsObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaFourSeasonsObj.id, pizzaType: 1, size: 40 }),
			generateProductVariant({ productId: pizzaFourSeasonsObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaBurgerObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaBurgerObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaBurgerObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaHamAndCheeseObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaHamAndCheeseObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaHamAndCheeseObj.id, pizzaType: 1, size: 40 }),
			generateProductVariant({ productId: pizzaHamAndCheeseObj.id, pizzaType: 2, size: 20 }),
			generateProductVariant({ productId: pizzaHamAndCheeseObj.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizzaHamAndCheeseObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaJulienneObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaJulienneObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaJulienneObj.id, pizzaType: 2, size: 30 }),
			generateProductVariant({ productId: pizzaJulienneObj.id, pizzaType: 2, size: 40 }),

			generateProductVariant({ productId: pizzaMeatMixBavarianSausagesObj.id, pizzaType: 1, size: 20 }),
			generateProductVariant({ productId: pizzaMeatMixBavarianSausagesObj.id, pizzaType: 1, size: 30 }),
			generateProductVariant({ productId: pizzaMeatMixBavarianSausagesObj.id, pizzaType: 2, size: 40 }),

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
			generateProductVariant({ productId: 18 }),
			generateProductVariant({ productId: 19 }),
			generateProductVariant({ productId: 20 }),
			generateProductVariant({ productId: 21 }),
			generateProductVariant({ productId: 22 }),
			generateProductVariant({ productId: 23 }),
			generateProductVariant({ productId: 24 }),
			generateProductVariant({ productId: 25 }),
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

	await prisma.story.createMany({
		data: stories
	})

	await prisma.storyItem.createMany({
		data: storyItems
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

main().then(async () => {
	await prisma.$disconnect();
}).catch(async (e) => {
	console.error(e);
	await prisma.$disconnect();
	process.exit(1);
})