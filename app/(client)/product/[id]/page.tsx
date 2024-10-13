import { notFound } from "next/navigation";
import { IProductWithRelations } from "@/types/prisma";
import { prisma } from "@/prisma/prismaClient";
import { Container, ProductFormsContainer, ProductsGroupList } from "@/components/shared";
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
			<ProductFormsContainer product={product} className={s.productCard__forms}/>
			<ProductsGroupList
				title="Попробуйте также"
				categoryId={product.category.id}
				items={product.category.products as IProductWithRelations[]}
				listClassName={s.recommendations__list}
			/>
		</Container>
	)
}