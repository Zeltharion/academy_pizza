import { cn } from '@/shared/lib/utils'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from 'lucide-react'
import { Button } from '@/components/ui'
import { CartButton, Container, Logo, SearchInput } from '@/components/shared'
import { IHeader } from './Header.types'
import s from './Header.module.scss'

export const Header: React.FC<IHeader> = ({ hasSearchInput = true, hasCartButton = true, classname }) => {
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
					<Button variant="outline" className={s.loginBtn}>
						<User size={16} />
						Войти
					</Button>
					{hasCartButton && <CartButton />}
				</div>
			</Container>
		</header>
	)
}