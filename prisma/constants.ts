import { ingredientImage, pizzaImage, productImage } from "./images";

export const categories = [
	{ name: 'Пиццы' },
	{ name: 'Завтрак' },
	{ name: 'Закуски' },
	{ name: 'Коктейли' },
	{ name: 'Напитки' },
]

export const ingredients = [
	{
		name: 'Сырный бортик',
		price: 179,
		imageUrl: ingredientImage.cheeseSide,
	},
	{
		name: 'Сливочная моцарелла',
		price: 79,
		imageUrl: ingredientImage.creamyMozzarella,
	},
	{
		name: 'Сыры чеддер и пармезан',
		price: 79,
		imageUrl: ingredientImage.cheddarAndParmesanCheeses,
	},
	{
		name: 'Острый перец халапеньо',
		price: 59,
		imageUrl: ingredientImage.jalapenoPepper,
	},
	{
		name: 'Нежный цыпленок',
		price: 79,
		imageUrl: ingredientImage.chicken,
	},
	{
		name: 'Шампиньоны',
		price: 59,
		imageUrl: ingredientImage.champignons,
	},
	{
		name: 'Ветчина',
		price: 79,
		imageUrl: ingredientImage.ham,
	},
	{
		name: 'Пикантная пепперони',
		price: 79,
		imageUrl: ingredientImage.pepperoni,
	},
	{
		name: 'Острая чоризо',
		price: 79,
		imageUrl: ingredientImage.spicyChorizo,
	},
	{
		name: 'Маринованные огурчики',
		price: 59,
		imageUrl: ingredientImage.pickledCucumbers,
	},
	{
		name: 'Свежие томаты',
		price: 59,
		imageUrl: ingredientImage.freshTomatoes,
	},
	{
		name: 'Красный лук',
		price: 59,
		imageUrl: ingredientImage.redOnion,
	},
	{
		name: 'Сочные ананасы',
		price: 59,
		imageUrl: ingredientImage.pineapples,
	},
	{
		name: 'Итальянские травы',
		price: 39,
		imageUrl: ingredientImage.italianHerbs,
	},
	{
		name: 'Сладкий перец',
		price: 59,
		imageUrl: ingredientImage.sugarPepper,
	},
	{
		name: 'Кубики брынзы',
		price: 79,
		imageUrl: ingredientImage.brynzaCubes,
	},
	{
		name: 'Митболы',
		price: 79,
		imageUrl: ingredientImage.meatBalls,
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	{
		name: 'Омлет с ветчиной и грибами',
		imageUrl: productImage.omletWithHamAndMushrooms,
		categoryId: 2,
	},
	{
		name: 'Омлет с пепперони',
		imageUrl: productImage.omletWithPepperoni,
		categoryId: 2,
	},
	{
		name: 'Дэнвич ветчина и сыр',
		imageUrl: productImage.danwichHamAndCheese,
		categoryId: 3,
	},
	{
		name: 'Куриные наггетсы',
		imageUrl: productImage.chickenNuggets,
		categoryId: 3,
	},
	{
		name: 'Картофель из печи с соусом',
		imageUrl: productImage.bakedPotatoWithSauce,
		categoryId: 3,
	},
	{
		name: 'Додстер',
		imageUrl: productImage.dodster,
		categoryId: 3,
	},
	{
		name: 'Острый Додстер',
		imageUrl: productImage.spicyDodster,
		categoryId: 3,
	},
	{
		name: 'Банановый молочный коктейль',
		imageUrl: productImage.bananaMilkshake,
		categoryId: 4,
	},
	{
		name: 'Карамельное яблоко молочный коктейль',
		imageUrl: productImage.caramelAppleMilkshake,
		categoryId: 4,
	},
	{
		name: 'Молочный коктейль с печеньем Орео',
		imageUrl: productImage.oreoCookieMilkshake,
		categoryId: 4,
	},
	{
		name: 'Классический молочный коктейль',
		imageUrl: productImage.classicMilkshake,
		categoryId: 4,
	},
	{
		name: 'Ирландский Капучино',
		imageUrl: productImage.irishCappuccino,
		categoryId: 5,
	},
	{
		name: 'Кофе Карамельный капучино',
		imageUrl: productImage.caramelCappuccino,
		categoryId: 5,
	},
	{
		name: 'Кофе Кокосовый латте',
		imageUrl: productImage.coconutLatte,
		categoryId: 5,
	},
	{
		name: 'Кофе Американо',
		imageUrl: productImage.americano,
		categoryId: 5,
	},
	{
		name: 'Кофе Латте',
		imageUrl: productImage.latte,
		categoryId: 5,
	},
]

export const pizzaObject1 = {
	name: 'Пепперони фреш',
	imageUrl: pizzaImage.pepperoniFresh,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(0, 5),
	},
}

export const pizzaObject2 = {
	name: 'Сырная',
	imageUrl: pizzaImage.cheese,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(5, 10),
	},
}

export const pizzaObject3 = {
	name: 'Чоризо фреш',
	imageUrl: pizzaImage.chorizoFresh,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(10, 40),
	},
}