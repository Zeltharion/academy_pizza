import { cn } from "@/shared/lib";
import { IEmailTemplate } from "./EmailTemplate.types";
import s from "./EmailTemplate.module.scss";
import logoFull from '@/public/assets/images/logoFull.png'

export const EmailTemplate: React.FC<React.PropsWithChildren<IEmailTemplate>> = ({
	title,
	children,
	className
}) => (
	<html>
		<section className={cn(s.emailTemplate, className)}>
			<div className="flex gap-5">
				<img src={logoFull.src} alt="logo" className="h-7" />
				<h1>{title}</h1>
			</div>
			<hr />
			<div className={s.emailTemplate__children}>
				{children}
			</div>
			<hr />
			<footer>
				<p className={s.emailTemplate__footer}>© 2024. Academy Pizza</p>
			</footer>
		</section>
	</html>
);
