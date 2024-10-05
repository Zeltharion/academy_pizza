import { prisma } from "@/prisma/prismaClient";

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

/**
 * Finds categories with products that match the given search parameters.
 *
 * @param params - GetSearchParams object with query, sortBy, sizes, pizzaTypes, ingredients, priceFrom, and priceTo properties.
 * @example findPizzas({
 *  	query: 'pizza',
 *  	sortBy: 'price',
 *  	sizes: '30',
 *  	pizzaTypes: '1',
 *  	ingredients: '1,2,3',
 *  	priceFrom: '100',
 *  	priceTo: '200' 
 * })
 * @returns An array of categories with products that match the given search parameters.
 */

export const findPizzas = async (params: GetSearchParams) => {
	const ingredientsIdArr = params.ingredients?.split(',').map(Number);
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
	const sizes = params.sizes?.split(',').map(Number);

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIdArr ? {
						some: {
							id: {
								in: ingredientsIdArr
							}
						}
					} : undefined,
					variants: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							}
						}
					}
				},
				include: {
					ingredients: true,
					variants: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				}
			},
		},
	});

	return categories;
}