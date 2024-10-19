'use client'

import { FormProvider } from 'react-hook-form';
import { AdminFormHeader } from '@/components/shared';
import { cn } from '@/shared/lib';
import { IAdminForm } from './AdminForm.types';
import s from './AdminForm.module.scss';
import { Info } from 'lucide-react';

export const AdminForm: React.FC<React.PropsWithChildren<IAdminForm>> = ({
	form,
	onSubmit,
	isEdit,
	loading,
	children,
	deleteId,
	type,
	description,
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
				{description && (
					<div className={s.adminForm__description}>
						<Info size={20} />
						<p>{description}</p>
					</div>
				)}
				<div className={cn(s.adminForm, className)}>
					{children}
				</div>
			</form>
		</FormProvider>
	);
};