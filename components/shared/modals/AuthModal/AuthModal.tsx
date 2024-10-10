'use client'

import { useState } from 'react'
import { Button, Dialog, DialogContent } from '@/components/ui'
import { LoginForm, OAuthButton, RegisterForm } from '@/components/shared'
import { cn } from '@/shared/lib'
import { AuthType, IAuthModal } from './AuthModal.types'
import s from './AuthModal.module.scss'

export const AuthModal: React.FC<IAuthModal> = ({
	open,
	onClose,
	className
}) => {
	const [type, setType] = useState<AuthType>('login')

	const onSwitchAuthType = () => {
		setType(type === 'login' ? 'register' : 'login');
	}

	const handleClose = () => {
		onClose();
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className={cn(s.authModal, className)}>
				{type === 'login' ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />}
				<Button
					type='button'
					variant='outline'
					onClick={onSwitchAuthType}
					className='h-12 text-base'
				>
					{type === 'login' ? 'Зарегистрироваться' : 'Войти'}
				</Button>

				<div className={s.authModal__Separator}>
					<hr />
					<span>или</span>
					<hr />
				</div>

				<div className={s.authModal__OAuthButtons}>
					<OAuthButton
						provider="github"
						callbackUrl="/"
					/>
					<OAuthButton
						provider="google"
						callbackUrl="/"
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}