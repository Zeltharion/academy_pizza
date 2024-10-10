'use client'

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";
import { FormInput, Title } from "@/components/shared";
import { formLoginSchema, TFormLoginValues } from "@/shared/constants";
import s from './LoginForm.module.scss'

interface ILoginForm {
	onClose?: VoidFunction;
}

export const LoginForm: React.FC<ILoginForm> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (!resp?.ok) { throw Error(); }
			toast.success("Вы вошли в аккаунт", {
				icon: "✅",
			})

			onClose?.();
		} catch (error) {
			console.error("[LOGIN_FORM]: ", error);
			toast.error("Не удалось войти в аккаунт", {
				icon: "❌",
			});
		}
	}

	return (
		<FormProvider {...form}>
			<form className={s.loginForm} onSubmit={form.handleSubmit(onSubmit)} onKeyDown={(e) => e.key === 'Enter' && form.handleSubmit(onSubmit)}>
				<div className={s.loginForm__header}>
					<div className="mr-2">
						<Title
							text="Вход в аккаунт"
							size="md"
							className="font-bold"
						/>
						<p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
					</div>
					<img
						src="/assets/images/email.png"
						alt="email icon"
						className="w-14 h-14"
					/>
				</div>

				<FormInput
					name="email"
					label="E-mail"
					placeholder="email@example.com"
					required
				/>
				<FormInput
					name="password"
					type="password"
					label="Пароль"
					placeholder="Введите пароль"
					required
				/>

				<Button
					type="submit"
					loading={form.formState.isSubmitting}
					className={s.loginForm__button}
				>
					Войти
				</Button>

			</form>
		</FormProvider>
	)
}