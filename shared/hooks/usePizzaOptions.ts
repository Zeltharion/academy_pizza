import { Variant } from "@/components/shared/ProductVariantSelector/ProductVariantSelector.types";
import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductVariant } from "@prisma/client";

interface IReturnData {
	size: PizzaSize;
	type: PizzaType;
	selectedIngredients: Set<number>;
	availableSizes: Variant[];
	currentVariantId?: number;
	addIngredient: (id: number) => void;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
}

/**
 * Returns state and functions to manage pizza options.
 *
 * @param variants - Array of product variants
 *
 * @example usePizzaOptions(variants)
 * @returns IReturnData object with:
 * - size: current pizza size,
 * - type: current pizza type,
 * - selectedIngredients: Set of selected ingredients,
 * - availableSizes: Array of available sizes,
 * - addIngredient: (id: number) => void function to add ingredient to selected ingredients,
 * - setSize: (size: PizzaSize) => void function to set pizza size,
 * - setType: (type: PizzaType) => void function to set pizza type
 */
export const usePizzaOptions = (variants: ProductVariant[]): IReturnData => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
	const availableSizes = getAvailablePizzaSizes(variants, type);

	const currentVariantId = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.id;

	useEffect(() => {
		const isAvailableSize = availableSizes.find((item) => Number(item.value) === size && !item.disabled);
		const availableSize = availableSizes.find((item) => !item.disabled);

		if (availableSize && !isAvailableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return { size, type, selectedIngredients, addIngredient, setSize, setType, availableSizes, currentVariantId };
}