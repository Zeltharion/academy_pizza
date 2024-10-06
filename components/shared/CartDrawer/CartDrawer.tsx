'use client'

import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
	Button,
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui";
import { CartDrawerItem, Title } from "@/components/shared";
import { cn, getCartItemsDetail, getCartTotalItemsWord } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import s from './CartDrawer.module.scss'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
	const [rederecting, setRederecting] = useState(false);
	
	const handleOnClickCountButton = (id: number, type: 'plus' | 'minus', quantity: number) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

		const item = items.find(item => item.id === id);
		if (item) { item.disabled = true; }

		updateItemQuantity(id, newQuantity);
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className={cn(s.cartDrawer__content, { [s.emptyWrapper]: !totalAmount })}>
				{totalAmount > 0 && (
					<SheetHeader>
						<SheetTitle>
							В корзине{' '}
							<span className="font-bold">
								{items.length} {getCartTotalItemsWord(items.length)}
							</span>
						</SheetTitle>
					</SheetHeader>
				)}

				{!totalAmount && (
					<div className={s.cartDrawer__empty}>
						<Image
							src="/assets/images/emptyCartBox.png"
							alt="Empty cart"
							width={120}
							height={120}
						/>
						<Title
							size="md"
							text="Корзина пустая"
							className={s.cartDrawer__emptyTitle}
						/>
						<p className={s.cartDrawer__emptyText}>
							Добавьте хотя бы один пиццу в корзину, а можно и две :&#41;
						</p>
						<SheetClose>
							<Button className={s.cartDrawer__emptyButton} size="lg">
								<ArrowLeft className="w-5 mr-2" />
								Вернуться назад
							</Button>
						</SheetClose>
					</div>
				)}

				{totalAmount > 0 && (
					<>
						<div className={s.cartDrawer__items}>
							{items.map((item) => (
								<CartDrawerItem
									id={item.id}
									key={item.id}
									imageUrl={item.imageUrl}
									details={getCartItemsDetail(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize,
									)}
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

							<Link href="/checkout">
								<Button
									type="submit"
									loading={rederecting}
									onClick={() => setRederecting(true)}
									className={s.cartDrawer__footer__button}
								>
									Оформить заказ
									<ArrowRight className="w-5 ml-2" />
								</Button>
							</Link>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	)
}