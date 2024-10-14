import Link from "next/link"
import { Container, Title } from "@/components/shared"
import { cn, footerSocialImage } from "@/shared/lib"
import s from './Footer.module.scss'

interface IFooter {
	className?: string
}

export const Footer: React.FC<IFooter> = ({ className }) => {
	return (
		<footer className={cn(s.footer, className)}>
			<div className={s.footer__main}>
				<Container className={s.footer__main__nav}>
					<div className={s.footer__main__nav__block}>
						<Title
							size="xs"
							className={s.footer__main__nav__block__title}
							text="Academy Pizza"
						/>
						<Link href="#">О нас</Link>
						<Link href="#">Блог</Link>
					</div>
					<div className={s.footer__main__nav__block}>
						<Title
							size="xs"
							className={s.footer__main__nav__block__title}
							text="Работа"
						/>
						<Link href="#" >В пиццерии</Link>
					</div>
					<div className={s.footer__main__nav__block}>
						<Title
							size="xs"
							className={s.footer__main__nav__block__title}
							text="Партнерам"
						/>
						<Link href="#">Франшиза</Link>
						<Link href="#">Инвестиции</Link>
						<Link href="#">Поставщикам</Link>
						<Link href="#">Предложить помещение</Link>
					</div>
					<div className={s.footer__main__nav__block}>
						<Title
							size="xs"
							className={s.footer__main__nav__block__title}
							text="Это интересно"
						/>
						<Link href="https://github.com/Zeltharion/academy_pizza">О проекте</Link>
						<Link href="https://nextjs.org/">NextJS</Link>
						<Link href="https://www.prisma.io/">Prisma</Link>
						<Link href="https://react.dev/">React</Link>
					</div>
				</Container>
			</div>
			<div className={s.footer__details}>
				<Container className={s.footer__details__nav}>
					<div className={s.footer__details__nav__copyright}>
						<Title
							size="xs"
							className="uppercase font-extrabold mr-3"
							text="academy pizza"
						/>
						<span>&copy; 2024</span>
					</div>
					<div className={s.footer__details__nav__documents}>
						<Link href="#">Правовая информация</Link>
						<Link href="#">Калорийность</Link>
						<Link href="#">Помощь</Link>
					</div>
					<div className={s.footer__details__nav__socials}>
						<Link
							href="https://github.com/Zeltharion/academy_pizza"
							target="_blank"
							className={s.footer__details__nav__socials__icon}
						>
							<img
								src={footerSocialImage.github}
								alt="github"
							/>
						</Link>
						<Link href="#" className={s.footer__details__nav__socials__icon}>
							<img
								src={footerSocialImage.youtube}
								alt="youtube"
							/>
						</Link>
					</div>
				</Container>
			</div>
		</footer>
	)
}