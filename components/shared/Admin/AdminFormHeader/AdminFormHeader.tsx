import { Button } from "@/components/ui";
import { AdminDeleteButton, Title } from "@/components/shared";
import { cn } from "@/shared/lib";
import { IAdminFormHeader } from "./AdminFormHeader.types";
import s from './AdminFormHeader.module.scss'

export const AdminFormHeader: React.FC<IAdminFormHeader> = ({
	isEdit,
	loading,
	deleteId,
	type,
	className
}) => {
	return (
		<div className={cn(s.adminFormHeader, className)}>
			<Title
				className="font-extrabold"
				text={isEdit ? "Редактирование" : "Создание"}
				size="lg"
			/>
			<div className={s.adminFormHeader__buttons}>
				<AdminDeleteButton id={deleteId} type={type} />
				<Button loading={loading}>Сохранить</Button>
			</div>
		</div>
	)
}