import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button, Skeleton } from "@/components/ui";
import { CircleUser, User } from "lucide-react";
import { cn } from "@/shared/lib";
import urls from "@/shared/config/urls";
import { IProfileButton } from "./ProfileButton.types";
import s from './ProfileButton.module.scss'

export const ProfileButton: React.FC<IProfileButton> = ({
	onClickSignIn,
	className
}) => {
	const { data: session, status } = useSession()

	return status === "loading" ? (
		<Skeleton className="h-10 w-[100px]" />
	) : !session ? (
		<Button
			onClick={onClickSignIn}
			variant="outline"
			className={cn(s.profileBtn, className)}
		>
			Войти
		</Button>
	) : (
		<Link href={urls.client_profile}>
			<Button variant="secondary" className={cn(s.profileBtn, className)}>
				<CircleUser size={18} />
				Профиль
			</Button>
		</Link>
	)
}
	
