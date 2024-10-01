import { ProductModal } from "@/components/shared";
import { prisma } from "@/prisma/prismaClient";
import { notFound } from "next/navigation";

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			variants: {
				orderBy: {
					createdAt: 'desc',
				},	
			},
		},
	});

	if (!product) {
		return notFound();
	}

	return (
		<ProductModal product={product}/>
	)
}