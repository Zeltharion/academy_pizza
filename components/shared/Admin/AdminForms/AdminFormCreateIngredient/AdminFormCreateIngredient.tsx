'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateIngredient, createIngredient } from "@/app/actions";
import { Ingredient } from "@prisma/client";
import toast from "react-hot-toast";
import { AdminForm, AdminImageUploader, FormInput } from "@/components/shared";
import urls from "@/shared/config/urls";
import { adminOnUploadSuccess, adminOnUploadError, adminOnClickRemoveImage } from "@/shared/lib";
import { TCreateIngredientFormValues, createIngredientFormSchema } from "@/shared/constants";

interface IAdminFormCreateIngredient {
	values?: Ingredient
}

export const AdminFormCreateIngredient: React.FC<IAdminFormCreateIngredient> = ({ values }) => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const form = useForm<TCreateIngredientFormValues>({
		defaultValues: {
			name: values?.name || "",
			imageUrl: values?.imageUrl || "",
			price: values?.price ? String(values?.price) : "",
		},
		resolver: zodResolver(createIngredientFormSchema),
	});

	const onSubmit: SubmitHandler<TCreateIngredientFormValues> = async (data) => {
		try {
			setLoading(true);

			const fields = {
				...data,
				price: Number(data.price),
				imageUrl: imageUrl ?? "",
			};

			if (params.id) {
				await updateIngredient(+params.id, fields);
			} else {
				await createIngredient(fields);
				router.push(urls.admin_ingredients);
			}

			toast.success(`Ингредиент ${data.name} создан`, { icon: "✅" });
		} catch (error) {
			console.log("[CREATE_INGREDIENT] Error: ", error);
			toast.error("Произошла ошибка");
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
			type={'ingredient'}
		>
			<div className="grid grid-cols-subgrid gap-5">
				<FormInput
					name="name"
					label="Название"
					placeholder="Введите название"
					required
				/>
				<FormInput
					name="price"
					label="Цена"
					placeholder="Введите цену"
					required
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
		</AdminForm >
	)
}