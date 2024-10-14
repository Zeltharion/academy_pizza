'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
	AuthModal,
	CartButton,
	Container,
	Logo,
	ProfileButton,
	SearchInput
} from '@/components/shared'
import { cn } from '@/shared/lib/utils'
import { IHeader } from './Header.types'
import s from './Header.module.scss'

export const Header: React.FC<IHeader> = ({
	hasSearchInput = true,
	hasCartButton = true,
	classname
}) => {
	const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		let toastMessage = '';

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен, начинаем готовить!';
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена.';
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/');
				toast.success(toastMessage);
				router.push('/');
			}, 1000);
		}
	}, [router, searchParams]);

	return (
		<header className={cn(s.header, classname)}>
			<Container className={s.header__container}>
				<Logo />

				{hasSearchInput &&
					<div className={s.header__search}>
						<SearchInput />
					</div>
				}

				<div className={s.header__rightSide}>
					<AuthModal 
						open={isOpenAuthModal}
						onClose={() => setIsOpenAuthModal(false)}
					/>
					<ProfileButton onClickSignIn={() => setIsOpenAuthModal(true)}/>
					{hasCartButton && <CartButton />}
				</div>
			</Container>
		</header>
	)
}