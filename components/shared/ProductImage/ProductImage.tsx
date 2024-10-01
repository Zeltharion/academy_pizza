import { cn } from '@/lib/utils'
import s from './ProductImage.module.scss'

interface IProductImage {
	src: string;
	size: number;
	className?: string;
}

export const ProductImage: React.FC<IProductImage> = ({ src, size, className }) => {
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