import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'
import { Button } from '../../ui'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
import { Container } from '..'
import s from './Header.module.scss'

interface IHeader {
	classname?: string
}

export const Header: React.FC<IHeader> = ({ classname }) => {
	return (
		<header className={cn(s.header, classname)}>
			<Container className={s.container}>
				<div className={s.left__side}>
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
				</div>
				<div className={s.right__side}>
					<Button variant="outline" className={s.loginBtn}>
						<User size={16} />
						Войти
					</Button>

					<Button className='group relative'>
						<b>520 ₽</b>
						<span className='h-full w-[1px] bg-white/30 mx-3' />
						<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
							<ShoppingCart
								className='relative'
								strokeWidth={2}
								size={16} />
							<b>3</b>
						</div>
						<ArrowRight
							className='right-5 absolute transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
							size={20} />
					</Button>
				</div>
			</Container>
		</header>
	)
}