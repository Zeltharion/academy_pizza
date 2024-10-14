import { AdminOrderDetails } from "@/components/shared"
import { prisma } from "@/prisma/prismaClient"
import urls from "@/shared/config/urls"
import { CartItemDTO } from "@/shared/dto"
import { getUserSession } from "@/shared/lib/getUserSession"
import { UserRole } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function AdminOrder({ params: { id } }: { params: { id: string } }) {
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

	const order = await prisma.order.findFirst({
		where: {
			id: Number(id),
		}
	})

	if (!order) {
		return redirect(urls.notFound)
	}

	const items = JSON.parse(order.items as unknown as string) as CartItemDTO[];

	return (
		<AdminOrderDetails values={order} items={items}/>
	)
}