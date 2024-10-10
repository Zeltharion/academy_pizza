import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IFilters } from "./useFilters";
import qs from "qs";

/**
 * Updates the query string of the current page with the current filters.
 * @param filters - The current filters.
 */
export const useQueryFilters = (filters: IFilters) => {
	const isMounted = useRef(false);
	const router = useRouter()

	useEffect(() => {
		if(isMounted.current) {
			const params = {
				...filters.selectedPrices,
				pizzaTypes: Array.from(filters.selectedPizzaTypes),
				sizes: Array.from(filters.selectedSizes),
				ingredients: Array.from(filters.selectedIngredients),
			}
			const query = qs.stringify(params, { arrayFormat: 'comma' })
			router.push(`?${query}`, { scroll: false });
		}

		isMounted.current = true;
	}, [filters, router])
}