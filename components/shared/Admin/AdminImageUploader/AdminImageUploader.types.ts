export interface IAdminImageUploader {
	imageUrl: string;
	onClickRemoveImage: VoidFunction;
	onUploadSuccess: (url: string)  => void;
	onUploadError: (error: Error) => void;
	errorMessage: string | undefined;
}