import { cn } from '@/shared/lib/utils'
import s from './PizzaImage.module.scss'
import { IPizzaImage } from './PizzaImage.types'

export const PizzaImage: React.FC<IPizzaImage> = ({ src, size, className }) => {
	return (
		<div className={cn(s.productImage, className)}>
			<img
				src={src}
				alt="product image"
				className={cn(s.productImage__image, {
					[s.small__image]: size === 20,
					[s.medium__image]: size === 30,
					[s.large__image]: size === 40,
				})}
			/>

			<div className={cn(s.productImage__border, s.large__border)}/>
			<div className={cn(s.productImage__border, s.medium__border)}/>
		</div>
	)
}