import { Container, ProfileForm } from "@/components/shared";
import { prisma } from "@/prisma/prismaClient";
import urls from "@/shared/config/urls";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage() {
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

	return (
		<Container>
			<Suspense>
				<ProfileForm data={user} />
			</Suspense>
		</Container>
	)
}