import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn, oauthImage } from '@/shared/lib';
import { IOAuthButton } from './OAuthButton.types';
import s from './OAuthButton.module.scss'

export const OAuthButton: React.FC<IOAuthButton> = ({
	provider,
	callbackUrl,
	loading,
	redirect = true,
	className
}) => {
	return (
		<Button
			type="button"
			variant="secondary"
			className={cn(s.oauthButton, loading && s.loading, className)}
			onClick={() => signIn(provider, {
				callbackUrl,
				redirect
			})}
		>
			<img
				src={oauthImage[provider]}
				alt={`${provider} logo`}
				className="w-6 h-6"
			/>
			{loading ? <Loader2 width={20} height={20} className='animate-spin' /> : `Войти с ${provider.charAt(0).toUpperCase()}${provider.slice(1)}`}
		</Button>
	);
};
