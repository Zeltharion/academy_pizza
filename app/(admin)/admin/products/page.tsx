import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/shared/lib/getUserSession";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { AdminFormCreateProduct } from "@/components/shared";
import urls from "@/shared/config/urls";

export default async function AdminProducts() {
	const session = await getUserSession()
	if (!session) {
		return redirect(urls.notFound)
	}

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session.id),
		}
	})

	if (!user) {
		return redirect(urls.notFound)
	}

	if (user.role !== UserRole.ADMIN) {
		return redirect(urls.notFound)
	}

	const category = await prisma.category.findMany()

	return (
		<AdminFormCreateProduct category={category}/>	
	)
}