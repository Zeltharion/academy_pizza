import { Container, ProfileForm } from "@/components/shared";
import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await getUserSession()
	if (!session) {
		return redirect('/forbidden')
	}

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session.id),
		}
	})

	if (!user) {
		return redirect('/forbidden')
	}

	return (
		<Container>
			<ProfileForm data={user}/>
		</Container>
	)
}