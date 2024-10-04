import { cn } from '@/shared/lib/utils'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { User } from 'lucide-react'
import { CartButton, Container, SearchInput } from '@/components/shared'
import s from './Header.module.scss'
import Link from 'next/link'

interface IHeader {
	classname?: string
}

export const Header: React.FC<IHeader> = ({ classname }) => {
	return (
		<header className={cn(s.header, classname)}>
			<Container className={s.container}>
				<Link href='/' className={s.left__side}>
					<Image
						src='/logo.png'
						alt='logo'
						width={35}
						height={35}
						priority />
					<div className={s.logo}>
						<h1>Next Pizza</h1>
						<p>вкусней уже некуда</p>
					</div>
				</Link>


				<div className="mx-10 flex-1">
					<SearchInput />
				</div>

				<div className={s.right__side}>
					<Button variant="outline" className={s.loginBtn}>
						<User size={16} />
						Войти
					</Button>
					<CartButton />
				</div>
			</Container>
		</header>
	)
}