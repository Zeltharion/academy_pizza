import { User } from "@prisma/client";

export interface IProfileForm {
	data: User;
	className?: string;
}