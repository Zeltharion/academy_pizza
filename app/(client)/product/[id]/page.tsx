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

	const relatedProducts = await prisma.product.findMany({
		where: {
			categoryId: product.category.id,
			id: { not: product.id },
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
	});


	return (
		<Container className={s.productCard}>
			<ProductFormsContainer product={product} className={s.productCard__forms} />
			<ProductsGroupList
				title="Попробуйте также"
				categoryId={relatedProducts.map((product) => product.categoryId)[0]}
				items={relatedProducts as IProductWithRelations[]}
				listClassName={s.recommendations__list}
			/>
		</Container>
	)
}