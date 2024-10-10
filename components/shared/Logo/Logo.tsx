import Image from 'next/image';
import Link from 'next/link';
import s from './Logo.module.scss';

export const Logo: React.FC = () => {
	return (
		<Link href='/' className={s.logo}>
			<Image
				src='/logo.png'
				alt='logo'
				width={35}
				height={35}
				priority />
			<div className={s.logo__text}>
				<h1>Academy Pizza</h1>
				<p>вкусней уже некуда</p>
			</div>
		</Link>
	);
}