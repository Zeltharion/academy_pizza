'use client'

import { Trash2 } from "lucide-react"
import { ErrorText } from "@/components/shared"
import { UploadButton } from "@/shared/lib/uploadthing"
import { IAdminImageUploader } from "./AdminImageUploader.types"
import s from './AdminImageUploader.module.scss'

export const AdminImageUploader: React.FC<IAdminImageUploader> = ({
	imageUrl,
	onClickRemoveImage,
	onUploadSuccess,
	onUploadError,
	errorMessage,
}) => {
	return imageUrl ? (
		<div className={s.adminImageUploader__image}>
			<img src={imageUrl} />
			<button
				onClick={onClickRemoveImage}
				className={s.adminImageUploader__image__removeBtn}
			>
				<Trash2 className={s.adminImageUploader__image__removeBtn__icon} />
			</button>
		</div>
	) : (
		<div>
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={(res) => onUploadSuccess(res[0].url)}
				onUploadError={onUploadError}
				className={s.adminImageUploader__uploadBtn}
				content={{
					button({ ready }) {
						if (ready) return <div>Выберите файл</div>;
						return "Загрузка...";
					},
					allowedContent({ ready, fileTypes, isUploading}) {
						if (!ready) return "Ожидание...";
						if (isUploading) return "Загружаем...";
						return `Файлы: ${fileTypes.join(", ")}`;
					},
				}}
			/>
			{errorMessage && <ErrorText text={errorMessage} />}
		</div>
	)
}