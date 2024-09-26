import { cn } from "@/lib/utils"
import s from './TopBar.module.scss'
import { Categories, Container, SortPopup } from ".."

interface ITopBar {
	className?: string
}

export const TopBar: React.FC<ITopBar> = ({ className }) => {
	return (
		<div className={cn(s.topBar, className)}>
			<Container className={s.container}>
				<Categories />
				<SortPopup />
			</Container>
		</div>
	)
}
