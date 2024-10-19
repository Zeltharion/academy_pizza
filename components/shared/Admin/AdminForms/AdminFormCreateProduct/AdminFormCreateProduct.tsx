'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product, Category } from "@prisma/client";
import { updateProduct, createProduct } from "@/app/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AdminForm, AdminImageUploader, FormInput, FormSelect } from "@/components/shared";
import { TCreateProductFormValues, createProductFormSchema } from "@/shared/constants";
import { adminOnUploadSuccess, adminOnUploadError, adminOnClickRemoveImage } from "@/shared/lib";
import urls from "@/shared/config/urls";

interface IAdminFormCreateProduct {
	values?: Product
	category: Category[];
}

export const AdminFormCreateProduct: React.FC<IAdminFormCreateProduct> = ({ values, category }) => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [loading, setLoading] = useState(false)

	const categoryItems = category.map((category) => ({
		value: category.id.toString(),
		label: category.name
	}));
	
	const form = useForm<TCreateProductFormValues>({
		defaultValues: {
			name: values?.name || "",
			imageUrl: values?.imageUrl || "",
			category: String(values?.categoryId),
			description: values?.description || "",
		},
		resolver: zodResolver(createProductFormSchema),
	});

	const onSubmit: SubmitHandler<TCreateProductFormValues> = async (data) => {
		try {
			setLoading(true);

			const fields = {
				...data,
				category: {
					connect: {
						id: Number(data.category)
					}
				},
			};

			if (params.id) {
				await updateProduct(+params.id, fields);
			} else {
				await createProduct(fields);
				router.push(urls.admin_products);
				form.reset();
			}

			console.log(data);
			toast.success(`Продукт ${data.name} создан`, { icon: "✅" });
		} catch (error) {
			console.log("[CREATE_PRODUCT] Error: ", error);
			toast.error("Произошла ошибка");
			console.log(data);
		} finally {
			setLoading(false);
		}
	};

	const onUploadSuccess = adminOnUploadSuccess(form.setValue);
	const onUploadError = adminOnUploadError();
	const onClickRemoveImage = adminOnClickRemoveImage(form.setValue);

	const imageUrl = form.watch("imageUrl");

	return (
		<AdminForm
			form={form}
			onSubmit={onSubmit}
			isEdit={!!values}
			loading={loading}
			deleteId={Number(params.id)}
			description="При создании продукта обязательно должна быть создана хотябы одна вариация продукта."
			type={'product'}
		>
			<div className="grid grid-cols-subgrid gap-5">
				<FormInput
					name="name"
					label="Название продукта"
					placeholder="Введите название продукта"
					required
				/>
				<FormSelect
					name="category"
					label="Категория"
					placeholder="Выберите категорию..."
					items={categoryItems}
					required
				/>
				<FormInput
					name="description"
					label="Добавьте описание"
					placeholder="Введите описание продукта"
				/>
			</div>
			<div className="flex items-center justify-center">
				<AdminImageUploader
					imageUrl={imageUrl}
					onClickRemoveImage={onClickRemoveImage}
					onUploadSuccess={(url) => onUploadSuccess(url)}
					onUploadError={onUploadError}
					errorMessage={form.formState.errors.imageUrl?.message as string}
				/>
			</div>
		</AdminForm>
	)
}