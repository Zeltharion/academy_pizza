import { Ingredient } from "@prisma/client"

export const formatIngredientsArrayToText = (ingredient: Ingredient[]) => {
	if (!ingredient) return '';
	return ingredient.map((ingredient, index) =>
		index === 0 ? ingredient.name : ingredient.name.charAt(0).toLowerCase() + ingredient.name.slice(1)
	).join(', ')
}
