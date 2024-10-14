import { ApiRoutes } from "./apiRoutes"
import { axiosInstanse } from "./axiosInstanse"
import { Story, StoryItem } from "@prisma/client"

export type IStory = Story & {
	items: StoryItem[]
}

export const getAllStories = async () => {
	const { data } = await axiosInstanse.get<IStory[]>(ApiRoutes.STORIES)
	return data
}