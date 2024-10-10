import { User } from "@prisma/client"
import { axiosInstanse } from "./axiosInstanse"
import { ApiRoutes } from "./apiRoutes"

export const getMe = async () => {
	const { data } = await axiosInstanse.get<User>(ApiRoutes.AUTH_ME)

	return data;
}