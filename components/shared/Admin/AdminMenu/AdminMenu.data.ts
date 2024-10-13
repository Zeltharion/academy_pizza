import urls from "@/shared/config/urls";
import {
	Folder,
	Home,
	LayoutDashboard,
	Leaf,
	Package,
	ShoppingCart,
	Users
} from "lucide-react";

export const ADMIN_MENU_ITEMS = [
	{
		text: 'Главная',
		icon: Home,
		link: urls.admin_home,
	},
	{
		text: 'Пользователи',
		icon: Users,
		link: urls.admin_users,
	},
	{
		text: 'Категории',
		icon: Folder,
		link: urls.admin_categories,
	},
	{
		text: 'Продукты',
		icon: Package,
		link: urls.admin_products,
	},
	{
		text: 'Вариации',
		icon: LayoutDashboard,
		link: urls.admin_product_variants,
	},
	{
		text: 'Ингредиенты',
		icon: Leaf,
		link: urls.admin_ingredients,
	},
	{
		text: 'Заказы',
		icon: ShoppingCart,
		link: urls.admin_orders,
	},
]