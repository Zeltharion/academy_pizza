'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { updateProductVariant, createProductVariant } from "@/app/actions";
import { AdminForm, FormInput, FormSelect } from "@/components/shared";
import { TCreateProductVariantFormValues, createProductVariantFormSchema, mapPizzaSize, mapPizzaType } from "@/shared/constants";
import urls from "@/shared/config/urls";
import { IAdminFormCreateProductVariant } from "./AdminFormCreateProductVariant.types";

export const AdminFormCreateProductVariant: React.FC<IAdminFormCreateProductVariant> = ({
	values,
	products
}) => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const productSizeItems = Object.keys(mapPizzaSize).map(key => ({
		value: key,
		label: mapPizzaSize[key as unknown as keyof typeof mapPizzaSize]
	}));

	const pizzaTypeItems = Object.keys(mapPizzaType).map(key => ({
		value: key,
		label: mapPizzaType[key as unknown as keyof typeof mapPizzaType]
	}));

	const productItems = products.map((product) => ({
		value: product.id.toString(),
		label: product.name,
	}))

	const form = useForm<TCreateProductVariantFormValues>({
		defaultValues: {
			price: values?.price ? String(values?.price) : '',
			size: values?.size ? String(values?.size) : '',
			pizzaType: values?.pizzaType ? String(values?.pizzaType) : '',
			productId: values?.productId ? String(values?.productId) : '',
		},
		resolver: zodResolver(createProductVariantFormSchema),
	});

	const onSubmit: SubmitHandler<TCreateProductVariantFormValues> = async (data) => {
		try {
			setLoading(true);

			const fields = {
				price: Number(data.price),
				size: Number(data.size),
				pizzaType: Number(data.pizzaType),
				productId: Number(data.productId),
			};

			if (params.id) {
				await updateProductVariant(+params.id, fields);
			} else {
				await createProductVariant(fields);
				router.push(urls.admin_product_variants);
				form.reset();
			}

			toast.success('Вариация продукта с создана', { icon: '✅' });
		} catch (error) {
			console.log('[CREATE_PRODUCT_VARIANT] Error: ', error);
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
			type={'product-variants'}
		>
			<FormInput
				name="price"
				label="Цена"
				placeholder="Введите цену"
				required
			/>
			<FormSelect
				name="size"
				label="Размер"
				placeholder="Выберите размер..."
				items={productSizeItems}
			/>
			<FormSelect
				name="pizzaType"
				label="Тип пиццы"
				placeholder="Выберите тип пиццы..."
				items={pizzaTypeItems}
			/>
			<FormSelect
				name="productId"
				label="Продукт"
				placeholder="Выберите продукт..."
				items={productItems}
			/>
		</AdminForm>
	)
}