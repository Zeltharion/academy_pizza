import { cn } from "@/lib/utils"
import s from './TopBar.module.scss'
import { Categories, Container, SortPopup } from "@/components/shared"
import { Category } from "@prisma/client"

interface ITopBar {
	categories: Category[]
	className?: string
}

export const TopBar: React.FC<ITopBar> = ({ categories, className }) => {
	return (
		<div className={cn(s.topBar, className)}>
			<Container className={s.container}>
				<Categories items={categories}/>
				<SortPopup />
			</Container>
		</div>
	)
}
