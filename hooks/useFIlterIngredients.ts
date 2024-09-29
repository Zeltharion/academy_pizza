import { Api } from "@/services/apiClient";
import { Ingredient } from "@prisma/client"
import { useState, useEffect } from "react";
import { useSet } from "react-use";

interface IReturnFilterIngredients {
	ingredients: Ingredient[];
	isLoading: boolean;
	selectedIngredients: Set<string>;
	toggleId: (id: string) => void
}

export const useFilterIngredients = (): IReturnFilterIngredients => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [isLoading, setIsLoading] = useState(false);

	const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

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

	return { ingredients, isLoading, toggleId: toggle, selectedIngredients }
}