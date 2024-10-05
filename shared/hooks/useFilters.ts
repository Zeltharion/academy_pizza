import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface IPriceRange {
	priceFrom?: number;
	priceTo?: number;
}

interface IQueryFilters extends IPriceRange {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}

export interface IFilters {
	selectedSizes: Set<string>;
	selectedIngredients: Set<string>;
	selectedPizzaTypes: Set<string>;
	selectedPrices: IPriceRange;
}

interface IReturnFilters extends IFilters {
	setSelectedPrices: (name: keyof IPriceRange, value: number) => void;
	setSelectedPizzaTypes: (value: string) => void;
	setSelectedSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
}

/**
 * Returns filters state and functions to update it.
 *
 * @returns IReturnFilters object with:
 * - selectedPrices: IPriceRange object with current price range,
 * - selectedPizzaTypes: Set<string> with current selected pizza types,
 * - selectedSizes: Set<string> with current selected sizes,
 * - selectedIngredients: Set<string> with current selected ingredients,
 * - setSelectedPrices: (name: keyof IPriceRange, value: number) => void function to update selectedPrices,
 * - setSelectedPizzaTypes: (value: string) => void function to update selectedPizzaTypes,
 * - setSelectedSizes: (value: string) => void function to update selectedSizes,
 * - setSelectedIngredients: (value: string) => void function to update selectedIngredients,
 */
export const useFilters = (): IReturnFilters => {
	const searchParams = useSearchParams() as unknown as Map<keyof IQueryFilters, string>;
	const [selectedIngredients, { toggle: toggleSelectedIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(',')));

	const [selectedSizes, { toggle: toggleSelectedSizes }] = useSet(
		new Set<string>(searchParams.get('sizes')?.split(',') || []));

	const [selectedPizzaTypes, { toggle: toggleSelectedPizzaTypes }] = useSet(
		new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []));

	const [selectedPrices, setSelectedPrices] = useState<IPriceRange>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	const updateSelectedPrices = (name: keyof IPriceRange, value: number) => {
		setSelectedPrices((prev) => ({ ...prev, [name]: value }));
	};

	return useMemo(() => ({
		selectedPrices,
		selectedPizzaTypes,
		selectedSizes,
		selectedIngredients,
		setSelectedPrices: updateSelectedPrices,
		setSelectedPizzaTypes: toggleSelectedPizzaTypes,
		setSelectedSizes: toggleSelectedSizes,
		setSelectedIngredients: toggleSelectedIngredients,
	}), [selectedSizes, selectedPizzaTypes, selectedPrices, selectedIngredients]);
}