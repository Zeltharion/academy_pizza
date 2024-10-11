import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/shared/lib/getUserSession";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Admin() {
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

	if (user.role !== UserRole.ADMIN) {
		return redirect('/forbidden')
	}

	return (
		<div>Admin Dashboard</div>
	);
}