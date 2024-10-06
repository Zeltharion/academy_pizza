import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "@/components/shared"
import { PizzaSize, PizzaType } from "@/shared/constants/pizza"
import { cn, getCartItemsDetail } from "@/shared/lib"
import { ICheckoutCart } from "./CheckoutCart.types"
import s from './CheckoutCart.module.scss'

export const CheckoutCart: React.FC<ICheckoutCart> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className
}) => {
	return (
		<WhiteBlock title="1. Корзина">
			<div className={cn(s.checkoutCart, className)}>
				{loading ? [...Array(items.length)].map((_, index) => (<CheckoutItemSkeleton key={index} />)) :
					<>
						{items.map((item) => (
							<CheckoutItem
								id={item.id}
								key={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemsDetail(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize,
								)}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
								onClickDeleteButton={() => removeCartItem(item.id)}
							/>
						))}
					</>
				}
			</div>
		</WhiteBlock>
	)
}