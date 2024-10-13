import { UseFormReturn } from "react-hook-form";
import { IAdminFormHeader } from "../AdminFormHeader/AdminFormHeader.types";

export interface IAdminForm extends IAdminFormHeader {
	form: UseFormReturn<any>;
	onSubmit: (data: any) => void;
}