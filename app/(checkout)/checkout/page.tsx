'use client'

import { useEffect, useState } from 'react';
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
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services';

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false);
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();
	const { data: session } = useSession()

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

	useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(' ');

			form.setValue('firstName', firstName);
			form.setValue('lastName', lastName);
			form.setValue('email', data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [session, form])

	const onSubmit = async (data: TCheckoutFormValues) => {
		try {
			setSubmitting(true)
			const url = await createOrder(data);
			toast.success('Заказ оформлен', { icon: '✅' })

			if (url !== null && url !== undefined) {
				location.href = url;
			}
		} catch (error) {
			console.log('[CHECKOUT_ERROR]:', error);
			setSubmitting(false);
			toast.error('Не удалось оформить заказ', { icon: '❌' })
		}
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
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}