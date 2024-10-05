'use client'

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui";
import { Button } from "@/components/ui";
import { CartDrawerItem } from "@/components/shared";
import { cn, getCartItemsDetail, getCartTotalItemsWord } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import s from './CartDrawer.module.scss'

interface ICartDrawer {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<ICartDrawer>> = ({
	className,
	children
}) => {
	const { totalAmount, items, fetchCartItems, updateItemQuantity, removeCartItem } = useCartStore();

	useEffect(() => {
		fetchCartItems();
	}, [fetchCartItems]);

	const handleOnClickCountButton = (id: number, type: 'plus' | 'minus', quantity: number) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

		const item = items.find(item => item.id === id);
		if (item) { item.disabled = true; }
		
		updateItemQuantity(id, newQuantity);
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className={cn(s.cartDrawer__content, className)}>
				<SheetHeader>
					<SheetTitle>
						В корзине{' '}
						<span className="font-bold">
							{items.length} {getCartTotalItemsWord(items.length)}
						</span>
					</SheetTitle>
				</SheetHeader>

				<div className={s.cartDrawer__items}>
					{items.map((item) => (
						<CartDrawerItem
							id={item.id}
							key={item.id}
							imageUrl={item.imageUrl}
							details={
								item.pizzaType && item.pizzaSize
									? getCartItemsDetail(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize,
									)
									: ''
							}
							disabled={item.disabled}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
							onClickCountButton={(type) => handleOnClickCountButton(item.id, type, item.quantity)}
							onClickDeleteButton={() => removeCartItem(item.id)}
						/>
					))}
				</div>

				<SheetFooter className={s.cartDrawer__footer}>
					<div className="w-full">
						<div className={s.cartDrawer__footer__totalPrice}>
							<span className={s.cartDrawer__footer__totalPrice__label}>
								Итого
								<div className={s.cartDrawer__footer__totalPrice__line} />
							</span>
							<span className={s.cartDrawer__footer__totalPrice__price}>{totalAmount} ₽</span>
						</div>
					</div>

					<Link href="/cart">
						<Button
							type="submit"
							className={s.cartDrawer__footer__button}
						>
							Оформить заказ
							<ArrowRight className="w-5 ml-2" />
						</Button>
					</Link>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}