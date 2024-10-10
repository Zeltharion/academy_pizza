import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button, Skeleton } from "@/components/ui";
import { CircleUser, User } from "lucide-react";
import { IProfileButton } from "./ProfileButton.types";
import s from './ProfileButton.module.scss'

export const ProfileButton: React.FC<IProfileButton> = ({
	onClickSignIn,
	className
}) => {
	const { data: session, status } = useSession()

	return (
		<div className={className}>
			{status === "loading" ? (
				<Skeleton className="h-10 w-[100px]" />
			) : !session ? (
				<Button
					onClick={onClickSignIn}
					variant="outline"
					className={s.loginBtn}
				>
					<User size={16} />
					Войти
				</Button>
			) : (
				<Link href="/profile">
					<Button variant="secondary" className={s.profileBtn}>
						<CircleUser size={18} />
						Профиль
					</Button>
				</Link>
			)}
		</div>
	)
}

