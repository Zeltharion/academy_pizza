import { ButtonProps } from '@/components/ui/button'

type OAuthProvider = 'github' | 'google'

export interface IOAuthButton extends Omit<ButtonProps, 'children'> {
	provider: OAuthProvider;
	callbackUrl: string;
	redirect?: boolean;
	className?: string
}
