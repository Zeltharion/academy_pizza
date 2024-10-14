import { AdminDeleteButtonType } from "../AdminDeleteButton/AdminDeleteButton.types";

export interface IAdminFormHeader {
	isEdit?: boolean;
	deleteId: number;
	type: AdminDeleteButtonType;
	loading?: boolean;
	className?: string;
}