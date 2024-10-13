import {
	deleteCategory,
	deleteIngredient,
	deleteProduct,
	deleteProductVariant,
	deleteUser
} from "@/app/actions";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/shared/lib";
import { IAdminDeleteButton } from "./AdminDeleteButton.types"
import s from './AdminDeleteButton.module.scss'

export const AdminDeleteButton: React.FC<IAdminDeleteButton> = ({
	id,
	type,
	className
}) => {
	const handleOnClick = async (id: number) => {
		if (type === 'user') {
			await deleteUser(id);
		} else if (type === 'category') {
			await deleteCategory(id);
		} else if (type === 'product') {
			await deleteProduct(id);
		} else if (type === 'ingredient') {
			await deleteIngredient(id);
		} else if (type === 'product-variants') {
			await deleteProductVariant(id);
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