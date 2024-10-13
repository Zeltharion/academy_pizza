import { ingredientImage, pizzaImage, productImage, storiesImage, storyItemsImage } from "../shared/lib/getImagePath";

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
	{
		name: 'Бекон',
		price: 79,
		imageUrl: ingredientImage.bacon,
	},
	{
		name: 'Креветки',
		price: 199,
		imageUrl: ingredientImage.shrimps,
	},
	{
		name: 'Баварские колбаски',
		price: 79,
		imageUrl: ingredientImage.bavarianSausages,
	},
	{
		name: 'Оливки',
		price: 79,
		imageUrl: ingredientImage.olives,
	}
].map((obj, index) => ({ id: index + 1, ...obj }));


export const products = [
	{
		name: 'Омлет с ветчиной и грибами',
		imageUrl: productImage.omeletteWithHamAndMushrooms,
		description: 'Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла',
		categoryId: 2,
	},
	{
		name: 'Омлет с пепперони',
		imageUrl: productImage.omeletteWithPepperoni,
		description: 'Сытный и сбалансированный завтрак — омлет с поджаристой корочкой, пикантная пепперони, томаты и моцарелла',
		categoryId: 2,
	},
	{
		name: 'Омлет с беконом',
		imageUrl: productImage.omeletteWithBacon,
		description: 'Классическое сочетание горячего омлета с поджаристой корочкой и бекона с добавлением моцареллы и томатов на завтрак',
		categoryId: 2,
	},
	{
		name: 'Омлет с сыром',
		imageUrl: productImage.omeletteWithCheese,
		description: 'Горячий завтрак из омлета с поджаристой корочкой, моцарелла, кубики брынзы, сыры чеддер и пармезан',
		categoryId: 2,
	},
	{
		name: 'Дэнвич ветчина и сыр',
		imageUrl: productImage.danwichHamAndCheese,
		description: 'Поджаристая чиабатта и знакомое сочетание ветчины, цыпленка, моцареллы со свежими томатами, соусом ранч и чесноком',
		categoryId: 3,
	},
	{
		name: 'Куриные наггетсы',
		imageUrl: productImage.chickenNuggets,
		description: 'Нежное куриное мясо в хрустящей панировке',
		categoryId: 3,
	},
	{
		name: 'Куриные крылья барбекю',
		imageUrl: productImage.chickenWingsBarbecue,
		description: 'Куриные крылышки со специями и ароматом копчения',
		categoryId: 3,
	},
	{
		name: 'Картофель из печи с соусом',
		imageUrl: productImage.bakedPotatoWithSauce,
		description: 'Запеченная в печи картошечка с пряными специями. В комплекте сырный соус',
		categoryId: 3,
	},
	{
		name: 'Додстер',
		imageUrl: productImage.dodster,
		description: 'Легендарная горячая закуска с цыпленком, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке',
		categoryId: 3,
	},
	{
		name: 'Острый Додстер',
		imageUrl: productImage.spicyDodster,
		description: 'Горячая закуска с цыпленком, перчиком халапеньо, маринованными огурчиками, томатами, моцареллой и соусом барбекю в тонкой пшеничной лепешке',
		categoryId: 3,
	},
	{
		name: 'Грибной Стартер',
		imageUrl: productImage.starterWithMushrooms,
		description: 'Горячая закуска с шампиньонами, моцареллой и соусом ранч в тонкой пшеничной лепешке',
		categoryId: 3,
	},
	{
		name: 'Сырный Стартер',
		imageUrl: productImage.starterWithCheese,
		description: 'Горячая закуска с очень сырной начинкой. Моцарелла, пармезан, чеддер и соус ранч в тонкой пшеничной лепешке',
		categoryId: 3,
	},
	{
		name: 'Салат Цезарь',
		imageUrl: productImage.saladCaesar,
		description: 'Цыпленок, свежие листья салата айсберг, томаты черри, сыры чеддер и пармезан, соус цезарь, пшеничные гренки, итальянские травы',
		categoryId: 3,
	},
	{
		name: 'Ланчбокс с куриными кусочками',
		imageUrl: productImage.lunchboxChickenPieces,
		description: 'Горячий сытный обед из куриных крылышек со специями и ароматом копчения, пряного картофеля из печи и соуса барбекю',
		categoryId: 3,
	},
	{
		name: 'Ланчбокс с куриными крыльями',
		imageUrl: productImage.lunchboxChickenWings,
		description: 'Горячий сытный обед из нежных куриных кусочков, пряного картофеля из печи и сырного соуса',
		categoryId: 3,
	},
	{
		name: 'Банановый молочный коктейль',
		imageUrl: productImage.bananaMilkshake,
		description: 'Протеиновый молочный коктейль с банановыми цукатами и ванилью',
		categoryId: 4,
	},
	{
		name: 'Молочный коктейль Пина Колада',
		imageUrl: productImage.pinaColadaMilkshake,
		description: 'Тропическое сочетание кокоса и ананаса в нежном милкшейке',
		categoryId: 4,
	},
	{
		name: 'Карамельное яблоко молочный коктейль',
		imageUrl: productImage.caramelAppleMilkshake,
		description: 'Освежающий молочный коктейль с насыщенным вкусом карамельного яблока',
		categoryId: 4,
	},
	{
		name: 'Молочный коктейль с печеньем Орео',
		imageUrl: productImage.oreoCookieMilkshake,
		description: 'Как вкуснее есть печенье? Его лучше пить! Попробуйте молочный коктейль с мороженым и дробленым печеньем «Орео»',
		categoryId: 4,
	},
	{
		name: 'Классический молочный коктейль',
		imageUrl: productImage.classicMilkshake,
		description: 'В мире так много коктейлей, но классика — вечна. Попробуйте наш молочный напиток с мороженым',
		categoryId: 4,
	},
	{
		name: 'Ирландский Капучино',
		imageUrl: productImage.irishCappuccino,
		description: 'Ароматный капучино с нежными нотками ирландского крема',
		categoryId: 5,
	},
	{
		name: 'Кофе Карамельный капучино',
		imageUrl: productImage.caramelCappuccino,
		description: 'Если не шоколад, то карамель! А капучино с карамельным сиропом особенно хорош',
		categoryId: 5,
	},
	{
		name: 'Кофе Кокосовый латте',
		imageUrl: productImage.coconutLatte,
		description: 'Горячий напиток на основе эспрессо с увеличенной порцией молока и кокосовым сиропом',
		categoryId: 5,
	},
	{
		name: 'Кофе Американо',
		imageUrl: productImage.americano,
		description: 'Пара глотков горячего Американо, и вы будете готовы покорять этот день',
		categoryId: 5,
	},
	{
		name: 'Кофе Латте',
		imageUrl: productImage.latte,
		description: 'Когда хочется нежную молочную пенку, на помощь приходит классический латте',
		categoryId: 5,
	},
]


export const pizzaPepperoniFresh = {
	name: 'Пепперони фреш',
	imageUrl: pizzaImage.pepperoniFresh,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(0, 5),
	},
}

export const pizzaCheese = {
	name: 'Сырная',
	imageUrl: pizzaImage.cheese,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(5, 10),
	},
}

export const pizzaChorizoFresh = {
	name: 'Чоризо фреш',
	imageUrl: pizzaImage.chorizoFresh,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(10, 25),
	},
}

export const pizzaBurger = {
	name: 'Бургер-пицца',
	imageUrl: pizzaImage.burger,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(0, 6),
	}
}

export const pizzaDiablo = {
	name: 'Диабло',
	imageUrl: pizzaImage.diablo,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(6, 13),
	}
}

export const pizzaDoubleChicken = {
	name: 'Двойной цыпленок',
	imageUrl: pizzaImage.doubleChicken,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(1, 8),
	}
}

export const pizzaFourSeasons = {
	name: 'Четыре сезона',
	imageUrl: pizzaImage.fourSeasons,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(8, 13),
	}
}

export const pizzaHamAndCheese = {
	name: 'Ветчина с сыром',
	imageUrl: pizzaImage.hamAndCheese,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(2, 13),
	}
}

export const pizzaJulienne = {
	name: 'Жюльен',
	imageUrl: pizzaImage.julienne,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(11, 21),
	}
}

export const pizzaMeatMixBavarianSausages = {
	name: 'Мясной микс с баварскими колбасками',
	imageUrl: pizzaImage.meatMixBavarianSausages,
	categoryId: 1,
	ingredients: {
		connect: ingredients.slice(9, 18),
	}
}


export const stories = [
	{
		previewImageUrl: storiesImage.coffe,
	},
	{
		previewImageUrl: storiesImage.monthFact,
	},
	{
		previewImageUrl: storiesImage.pizzafest,
	},
	{
		previewImageUrl: storiesImage.rememberYou,
	},
	{
		previewImageUrl: storiesImage.specialForYou,
	},
	{
		previewImageUrl: storiesImage.withoutMeat,
	},
]


export const storyItems = [
	{
		storyId: 1,
		sourceUrl: storyItemsImage.item1,
	},
	{
		storyId: 1,
		sourceUrl: storyItemsImage.item2,
	},
	{
		storyId: 1,
		sourceUrl: storyItemsImage.item3,
	},
	{
		storyId: 2,
		sourceUrl: storyItemsImage.item4,
	},
	{
		storyId: 2,
		sourceUrl: storyItemsImage.item5,
	},
	{
		storyId: 3,
		sourceUrl: storyItemsImage.item1,
	},
	{
		storyId: 3,
		sourceUrl: storyItemsImage.item3,
	}
]