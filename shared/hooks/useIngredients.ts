import { Api } from "@/shared/services/apiClient";
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"

/**
 * Fetches all ingredients from the API and returns them in an array.
 * @returns an array of Ingredient objects and a boolean indicating if the data is loading
 */
export const useIngredients = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchIngredients() {
			try {
				setIsLoading(true)
				const ingredients = await Api.ingredients.getAll();
				setIngredients(ingredients);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchIngredients();
	}, [])

	return { ingredients, isLoading }
}