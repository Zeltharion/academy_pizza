'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";
import { Button } from "@/components/ui";
import { FormInput } from "@/components/shared";
import { formRegisterSchema, TFormRegisterValues } from "@/shared/constants";
import s from './RegisterForm.module.scss'

interface IRegisterForm {
	onClose?: VoidFunction;
	onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<IRegisterForm> = ({ onClose }) => {
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.success('Успешная регистрация. Подтвердите свою почту', {
				icon: '✅',
			});

			onClose?.();
		} catch (error) {
			console.error('[REGISTER_FORM] Error: ', error);
			return toast.error('Неверная почта или пароль', {
				icon: '❌',
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form className={s.registerForm} onSubmit={form.handleSubmit(onSubmit)}>
				<FormInput
					name="email"
					label="E-Mail"
					placeholder="email@example.com"
					required
				/>
				<FormInput
					name="fullName"
					label="Полное имя"
					placeholder="Иван Иванов"
					required
				/>
				<FormInput
					name="password"
					label="Пароль"
					placeholder="Введите ваш пароль"
					type="password"
					required
				/>
				<FormInput
					name="confirmPassword"
					label="Подтвердите пароль"
					placeholder="Подтвердите ваш пароль"
					type="password"
					required
				/>
				<Button
					type="submit"
					className="h-12 text-base"
					loading={form.formState.isSubmitting}
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	)
}