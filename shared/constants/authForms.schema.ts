import { z } from 'zod'

export const passwordSchema = z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' });

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Введите корректную почту' }),
	password: z.string(),
});

export const formRegisterSchema = formLoginSchema.merge(
	z.object({
		fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
		confirmPassword: passwordSchema,
	}),
).refine((data) => data.password === data.confirmPassword, {
	message: 'Пароли не совпадают',
	path: ['confirmPassword'],
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;