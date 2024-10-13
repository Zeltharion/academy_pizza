'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminIsSubPath, cn } from "@/shared/lib";
import { ADMIN_MENU_ITEMS } from "./AdminMenu.data";
import s from './AdminMenu.module.scss';

interface IAdminMenu {
	className?: string;
}

export const AdminMenu: React.FC<IAdminMenu> = ({ className }) => {
	const pathname = usePathname();

	return (
		<nav className={cn(s.adminMenu, className)}>
			{ADMIN_MENU_ITEMS.map((item) => (
				<Link
					key={item.text}
					className={cn(
						s.adminMenu__item,
						adminIsSubPath(pathname, item.link) ? s.adminMenu__item__active : ''
					)}
					aria-current={adminIsSubPath(pathname, item.link) ? 'page' : undefined}
					href={item.link}
				>
					<item.icon size={16} />
					{item.text}
				</Link>

			))}
		</nav>
	);
}