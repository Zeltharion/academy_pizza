import { Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface IAdminUploadUtilsType {
	imageUrl: string;
}

export const adminOnUploadSuccess = <T extends IAdminUploadUtilsType>(setValue: UseFormSetValue<T>) => (url: string) => {
	setValue("imageUrl" as Path<T>, url as PathValue<T, Path<T>>);
	console.log("[UPLOAD_FILE] Success: ", url);
	toast.error("Файл успешно загружен", {
		icon: "✅",
	});
};

export const adminOnUploadError = () => (error: Error) => {
	console.log("[UPLOAD_FILE] Error: ", error);
	toast.error("Не удалось загрузить файл", {
		icon: "😩",
	});
};

export const adminOnClickRemoveImage = <T extends IAdminUploadUtilsType>(setValue: UseFormSetValue<T>) => () => {
	setValue("imageUrl" as Path<T>, "" as PathValue<T, Path<T>>);
};
