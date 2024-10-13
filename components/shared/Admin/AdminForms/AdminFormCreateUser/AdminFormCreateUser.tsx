'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createUser, updateUser } from "@/app/actions";
import { User, UserRole } from "@prisma/client"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AdminForm, FormInput, FormSelect } from "@/components/shared";
import { createUserFormSchema, TCreateUserFormValues } from "@/shared/constants";
import urls from "@/shared/config/urls";

interface IAdminFormCreateUser {
	values?: User;
}

export const AdminFormCreateUser: React.FC<IAdminFormCreateUser> = ({ values }) => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const userRoles = Object.values(UserRole).map((value) => ({ value, label: value }));

	const form = useForm<TCreateUserFormValues>({
		defaultValues: {
			fullName: values?.fullName || '',
			email: values?.email || '',
			password: '',
			role: values?.role || '',
		},
		resolver: zodResolver(createUserFormSchema),
	});

	const onSubmit: SubmitHandler<TCreateUserFormValues> = async (data) => {
		try {
			setLoading(true);

			const values = {
				...data,
				role: data.role as UserRole,
			};

			if (params.id) {
				await updateUser(+params.id, values);
			} else {
				await createUser(values);
				router.push(urls.admin_users);
			}

		} catch (error) {
			console.log('[CREATE_USER] Error: ', error);
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
			type={'user'}
		>
			<FormInput
				name="fullName"
				label="Имя и фамилия"
				placeholder="Иван Иванов"
				required
			/>
			<FormInput
				name="email"
				label="E-Mail"
				placeholder="email@example.com"
				required
			/>
			<FormSelect
				name="role"
				label="Роль"
				placeholder="Выберите роль..."
				items={userRoles}
				required
			/>
			<FormInput
				type="password"
				name="password"
				label="Пароль"
				placeholder="Введите пароль нового пользователя"
				required
			/>
		</AdminForm>
	)
}