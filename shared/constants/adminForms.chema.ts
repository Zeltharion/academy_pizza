import { z } from 'zod';

export const adminNameSchema = z.string().min(2, { message: 'Введите название' });
export const adminPriceSchema = z.string().min(1, { message: 'Введите цену' });
export const adminImageUrlSchema = z.string().min(1, { message: 'Введите ссылку на картинку' });

export const createUserFormSchema = z.object({
	fullName: z.string().min(4, { message: 'Введите корректное имя' }),
	email: z.string().email({ message: 'Введите корректный EMail' }),
	password: z.string().min(4, { message: 'Введите корректный пароль' }),
	role: z.string().min(4, { message: 'Выберите роль' }),
});

export const createProductVariantFormSchema = z.object({
	price: adminPriceSchema,
	size: z.string().optional(),
	pizzaType: z.string().optional(),
	productId: z.string().min(1, { message: 'Выберите продукт' }),
});

export const createProductFormSchema = z.object({
	name: adminNameSchema,
	imageUrl: adminImageUrlSchema,
	category: z.string().min(1, { message: 'Выберите категорию' }),
});

export const createIngredientFormSchema = z.object({
	name: adminNameSchema,
	imageUrl: adminImageUrlSchema,
	price: adminPriceSchema,
});

export const createCategoryFormSchema = z.object({
	name: adminNameSchema,
});

export type TCreateUserFormValues = z.infer<typeof createUserFormSchema>;
export type TCreateProductVariantFormValues = z.infer<typeof createProductVariantFormSchema>;
export type TCreateProductFormValues = z.infer<typeof createProductFormSchema>;
export type TCreateIngredientFormValues = z.infer<typeof createIngredientFormSchema>;
export type TCreateCategoryFormValues = z.infer<typeof createCategoryFormSchema>;