'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'
import { Skeleton } from '@/components/ui'
import { Container } from '@/components/shared'
import { Api, IStory } from '@/shared/services'
import s from './Stories.module.scss'

export const Stories: React.FC = () => {
	const [stories, setStories] = useState<IStory[]>([])
	const [open, setOpen] = useState(false);
	const [selectedStory, setSelectedStory] = useState<IStory>();

	useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAllStories();
			setStories(data);
		}

		fetchStories()
	}, [])

	const onClickStory = (story: IStory) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	}

	return (
		<>
			<Container className={s.stories}>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<Skeleton key={index} className="w-[200px] h-[250px]" />
					))}
				{stories.map((story) => (
					<img
						key={story.id}
						onClick={() => onClickStory(story)}
						height={250}
						width={180}
						src={story.previewImageUrl}
						alt={String(story.id)}
					/>
				))}
			</Container>
			{open && (
				<div className={s.stories__modal}>
					<div className="relative w-[520px]">
						<button
							className={s.stories__modal__closeBtn}
							onClick={() => setOpen(false)}
						>
							<X className={s.stories__modal__closeBtn__icon} />
						</button>
						<ReactStories
							onAllStoriesEnd={() => setOpen(false)}
							stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
							defaultInterval={5000}
							width={520}
							height={800}
						/>
					</div>
				</div>
			)}
		</>
	)
}