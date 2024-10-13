import {
	deleteCategory,
	deleteIngredient,
	deleteOrder,
	deleteOrders,
	deleteProduct,
	deleteProductVariant,
	deleteUser
} from "@/app/actions";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/shared/lib";
import { IAdminDeleteButton } from "./AdminDeleteButton.types"
import s from './AdminDeleteButton.module.scss'
import toast from "react-hot-toast";

export const AdminDeleteButton: React.FC<IAdminDeleteButton> = ({
	id,
	type,
	className
}) => {
	const handleOnClick = async (id: number | number[]) => {
		try {
			if (Array.isArray(id)) {
				if (type === 'orders') {
					await deleteOrders(id);
					toast.success('Выбранные заказы удалены');
				}
			} else {
				if (type === 'user') {
					await deleteUser(id);
					toast.success('Пользователь удален');
				} else if (type === 'category') {
					await deleteCategory(id);
					toast.success('Категория удалена');
				} else if (type === 'product') {
					await deleteProduct(id);
					toast.success('Продукт удален');
				} else if (type === 'ingredient') {
					await deleteIngredient(id);
					toast.success('Ингредиент удален');
				} else if (type === 'product-variants') {
					await deleteProductVariant(id);
					toast.success('Вариация продукта удален');
				} else if (type === 'order') {
					await deleteOrder(id);
					toast.success('Заказ удален');
				}
			}
		} catch (error) {
			toast.error('Ошибка при удалении');
		}
	};

	return (
		<Button
			className={cn(s.adminDeleteButton, className)}
			variant="destructive"
			onClick={() => handleOnClick(id)}
		>
			<Trash2 size={16} />
		</Button>
	)
}
