import { ProductVariant } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "@/components/shared/ProductVariantSelector/ProductVariantSelector.types";

/**
 * Given an array of ProductVariant and a PizzaType, returns an array of objects with 'name', 'value', and 'disabled' properties.
 * The 'disabled' property is true if no variant with the given PizzaType has the given pizza size.
 * @param variants - An array of ProductVariant
 * @param type - A PizzaType
 * @example getAvailablePizzaSizes(variants, 1)
 * @returns An array of objects with 'name', 'value', and 'disabled' properties
 */
export const getAvailablePizzaSizes = (variants: ProductVariant[], type: PizzaType):Variant[] => {
	const filteredPizzesByType = variants.filter((variant) => variant.pizzaType === type);
	
	return pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzesByType.some((pizza) => Number(pizza.size) === Number(item.value)),
	}))
}