import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/shared/lib/getUserSession";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { AdminFormCreateProductVariant } from "@/components/shared";
import urls from "@/shared/config/urls";

export default async function AdminProducVariants() {
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

	const products = await prisma.product.findMany({
		include: {
			variants: true
		}
	})

	return (
		<AdminFormCreateProductVariant products={products}/>
	)
}