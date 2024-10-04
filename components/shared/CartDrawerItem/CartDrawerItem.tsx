import { cn } from "@/shared/lib"
import { X } from "lucide-react"
import * as CartItem from '../CartItemDetails'
import { ICartItem } from "../CartItemDetails/CartItemDetails.types"
import s from './CartDrawerItem.module.scss'

interface ICartDrawerItem extends ICartItem {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickDeleteButton?: () => void
	className?: string
}

export const CartDrawerItem: React.FC<ICartDrawerItem> = ({
	name,
	imageUrl,
	price,
	quantity,
	details,
	onClickCountButton,
	onClickDeleteButton,
	className,
}) => {
	return (
		<div className={cn(s.cartDrawer__item, className)}>
			<CartItem.Image src={imageUrl} />
			<div className="flex-1">
				<div className="flex items-start justify-between">
					<CartItem.Info details={details} name={name} />
					<X
						className={s.cartDrawer__item__deleteBtn}
						size={16}
						onClick={onClickDeleteButton}
					/>
				</div>

				<hr className="my-3" />

				<div className={s.cartDrawer__item__footer}>
					<CartItem.CountButton onClick={onClickCountButton} value={quantity}/>
					<div className="flex items-center gap-3">
						<CartItem.Price value={price} />
					</div>
				</div>
			</div>
		</div>
	)
}