const mapPizzaSize = {
	20: 'Маленькая',
	30: 'Средняя',
	40: 'Большая',
} as const;

const mapPizzaType = {
	1: 'Традиционное',
	2: 'Тонкое',
} as const;

const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	id: Number(name),
	name,
	value,
}))
 
export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;

export { mapPizzaSize, mapPizzaType, pizzaSizes }