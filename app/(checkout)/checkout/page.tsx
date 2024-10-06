'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Container,
	Title,
	CheckoutCart,
	CheckoutFormAddress,
	CheckoutFormPersonal,
	CheckoutSidebar,
} from "@/components/shared";
import { checkoutFormSchema, TCheckoutFormValues } from '@/shared/constants';
import { useCart } from "@/shared/hooks";
import s from './checkoutPage.module.scss'

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();

	const form = useForm<TCheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: ''
		}
	})

	const onSubmit = (data: TCheckoutFormValues) => {
		console.log(data)
	}

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
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

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={s.checkoutPage__blocks}>
						<div className={s.checkoutPage__blocks__left}>
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={loading}
								items={items}
							/>
							<CheckoutFormPersonal />
							<CheckoutFormAddress />
						</div>

						<div className={s.checkoutPage__blocks__right}>
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}