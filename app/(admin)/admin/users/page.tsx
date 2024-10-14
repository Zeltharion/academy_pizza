import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/shared/lib/getUserSession";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { AdminFormCreateUser } from "@/components/shared";
import urls from "@/shared/config/urls";

export default async function AdminUsers() {
	const session = await getUserSession()
	if (!session) {
		return redirect(urls.notFound)
	}

	const userBySession = await prisma.user.findFirst({
		where: {
			id: Number(session.id),
		}
	})

	if (!userBySession) { return redirect(urls.notFound) }
	if (userBySession.role !== UserRole.ADMIN) { return redirect(urls.notFound) }

	return (
		<AdminFormCreateUser />
	)
}