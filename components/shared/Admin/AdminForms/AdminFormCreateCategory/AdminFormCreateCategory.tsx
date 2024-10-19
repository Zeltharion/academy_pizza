'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateCategory, createCategory } from "@/app/actions";
import { Category } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AdminForm, FormInput } from "@/components/shared";
import { TCreateCategoryFormValues, createCategoryFormSchema } from "@/shared/constants";
import urls from "@/shared/config/urls";

interface IAdminFormCreateCategory {
	values?: Category;
}

export const AdminFormCreateCategory: React.FC<IAdminFormCreateCategory> = ({ values }) => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const form = useForm<TCreateCategoryFormValues>({
		defaultValues: {
			name: values?.name || '',
		},
		resolver: zodResolver(createCategoryFormSchema),
	});

	const onSubmit: SubmitHandler<TCreateCategoryFormValues> = async (data) => {
		try {
			setLoading(true);

			if (params.id) {
				await updateCategory(+params.id, data);
			} else {
				await createCategory(data);
				router.push(urls.admin_categories);
				form.reset();
			}

			toast.success(`Категория ${data.name} создана`, { icon: '✅' });
		} catch (error) {
			console.log('[CREATE_CATEGORY] Error: ', error);
			toast.error('Произошла ошибка');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AdminForm
			form={form}
			onSubmit={onSubmit}
			isEdit={!!values}
			loading={loading}
			deleteId={Number(params.id)}
			type={'category'}
		>
			<FormInput
				name="name"
				label="Название категории"
				placeholder="Введите название"
				required
			/>
		</AdminForm>
	)
}