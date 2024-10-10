'use client'

import { updateUserInfo } from "@/app/actions";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";
import { FormInput, Title } from "@/components/shared";
import { formRegisterSchema, TFormRegisterValues } from "@/shared/constants";
import { cn } from "@/shared/lib";
import { IProfileForm } from "./ProfileForm.types";
import s from './ProfileForm.module.scss'

export const ProfileForm: React.FC<IProfileForm> = ({
	data,
	className
}) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			confirmPassword: '',
		}
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password
			})

			toast.success("Данные обновлены", {
				icon: "✅",
			})

		} catch (error) {
			console.error("[PROFILE_FORM]: ", error);
			toast.error("Ошибка при обновлении данных", {
				icon: "❌",
			})
		}
	}

	const onClickSignOut = () => {
		signOut({ callbackUrl: '/' })
	}

	return (
		<div className={cn(s.profileForm, className)}>
			<div className={s.profileForm__wrapper}>
				<Title
					text="Личные данные"
					size="md"
					className="font-bold"
				/>
				<FormProvider {...form}>
					<form className={s.profileForm__body} onSubmit={form.handleSubmit(onSubmit)}>
						<FormInput name="email" label="E-Mail" required />
						<FormInput name="fullName" label="Полное имя" required />

						<FormInput
							type="password"
							name="password"
							label="Новый пароль"
							placeholder="Введите новый пароль"
							required
						/>
						<FormInput
							type="password"
							name="confirmPassword"
							label="Повторите пароль"
							placeholder="Повторите ваш новый пароль"
							required
						/>

						<Button loading={form.formState.isSubmitting} className="text-base mt-5" type="submit">
							Сохранить
						</Button>

						<Button
							type="button"
							className={s.profileForm__signOutBtn}
							variant="secondary"
							onClick={onClickSignOut}
							loading={form.formState.isSubmitting}
						>
							Выйти
						</Button>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}