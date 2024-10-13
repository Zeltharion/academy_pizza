'use client'

import { FormProvider } from 'react-hook-form';
import { AdminFormHeader } from '@/components/shared';
import { cn } from '@/shared/lib';
import { IAdminForm } from './AdminForm.types';
import s from './AdminForm.module.scss';

export const AdminForm: React.FC<React.PropsWithChildren<IAdminForm>> = ({
	form,
	onSubmit,
	isEdit,
	loading,
	children,
	deleteId,
	type,
	className,
}) => {
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={s.adminForm__wrapper}>
				<AdminFormHeader
					isEdit={isEdit}
					loading={loading}
					deleteId={deleteId}
					type={type}
				/>
				<div className={cn(s.adminForm, className)}>
					{children}
				</div>
			</form>
		</FormProvider>
	);
};