const urls = {
	admin_home: '/admin',
	admin_users: '/admin/users',
	admin_categories: '/admin/categories',
	admin_products: '/admin/products',
	admin_product_variants: '/admin/product-variants',
	admin_ingredients: '/admin/ingredients',
	admin_orders: '/admin/orders',

	client_home: '/',
	client_product: '/product',
	client_checkout: '/checkout',
	client_profile: '/profile',

	notFound: '/not-found',
	forbidden: '/forbidden',
} as const;

export type Urls = typeof urls;
export default urls;