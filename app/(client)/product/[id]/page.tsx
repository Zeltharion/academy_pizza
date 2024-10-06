import { notFound } from "next/navigation";
import { prisma } from "@/prisma/prismaClient";
import { Container, ProductFormsContainer } from "@/components/shared";
import s from './productIdPage.module.scss'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							variants: true,
						},
					},
				},
			},
			variants: {
				orderBy: {
					createdAt: 'desc',
				},
			}
		},
	})

	if (!product) return notFound();

	return (
		<Container className={s.productCard}>
			<ProductFormsContainer product={product}/>
		</Container>
	)
}