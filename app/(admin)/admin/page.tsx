import { prisma } from "@/prisma/prismaClient";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { getUserSession } from "@/shared/lib/getUserSession";
import urls from "@/shared/config/urls";
import s from './adminPage.module.scss'

export default async function Admin() {
	const session = await getUserSession()
	if (!session) {
		return redirect(urls.forbidden)
	}

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session.id),
		}
	})

	if (!user) {
		return redirect(urls.forbidden)
	}

	if (user.role !== UserRole.ADMIN) {
		return redirect(urls.forbidden)
	}

	return (
		<div className={s.adminPage__home}>
			<p className={s.adminPage__home__title}>
				<span className={s.adminPage__home__title__name}>{user.fullName}</span>, добро пожаловать в админ панель!
			</p>
			<p className={s.adminPage__home__text}>Для продолжения работы выберите пункт в меню слева.</p>
		</div>
	);
}
