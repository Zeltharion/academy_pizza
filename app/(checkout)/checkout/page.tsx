'use client'

import {  Input, Textarea } from "@/components/ui";
import { CheckoutItem, CheckoutSidebar, Container, Title, WhiteBlock } from "@/components/shared";
import { useCart } from "@/shared/hooks";
import { getCartItemsDetail } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import s from './checkoutPage.module.scss'

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

	const handleOnClickCountButton = (id: number, type: 'plus' | 'minus', quantity: number) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

		const item = items.find(item => item.id === id);
		if (item) { item.disabled = true; }

		updateItemQuantity(id, newQuantity);
	}

	return (
		<Container className={s.checkoutPage}>
			<Title
				text="Оформление заказа"
				size="lg"
				className={s.checkoutPage__title}
			/>

			<div className={s.checkoutPage__blocks}>
				<div className={s.checkoutPage__blocks__left}>
					<WhiteBlock title="1. Корзина">
						<div className={s.checkoutItems}>
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
									onClickCountButton={(type) => handleOnClickCountButton(item.id, type, item.quantity)}
									onClickDeleteButton={() => removeCartItem(item.id)}
								/>
							))}
						</div>
					</WhiteBlock>

					<WhiteBlock title="2. Персональные данные">
						<div className={s.personalData__inputs}>
							<Input name="firstName" className="text-base" placeholder="Имя" />
							<Input name="lastName" className="text-base" placeholder="Фамилия" />
							<Input name="email" className="text-base" placeholder="E-mail" />
							<Input name="phone" className="text-base" placeholder="Телефон" />
						</div>
					</WhiteBlock>

					<WhiteBlock title="3. Адрес доставки">
						<div className={s.adress__inputs}>
							<Input name="adress" className="text-base" placeholder="Адрес" />
							<Textarea
								className="text-base"
								placeholder="Комментарий к заказу"
								rows={5}
							/>
						</div>
					</WhiteBlock>
				</div>

				<div className={s.checkoutPage__blocks__right}>
					<CheckoutSidebar totalAmount={totalAmount}/>
				</div>
			</div>
		</Container>
	)
}