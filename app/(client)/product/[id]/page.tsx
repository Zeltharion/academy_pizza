import { Container, ProductImage, ProductVariantSelector, Title } from "@/components/shared";
import { prisma } from "@/prisma/prismaClient";
import { notFound } from "next/navigation";
import s from './productIdPage.module.scss'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } })
	if (!product) return notFound();

	return (
		<Container className={s.productCard}>
			<div className="flex flex-1">
				<ProductImage
					src={product.imageUrl}
					size={40}
				/>
				<div className="w-[490px] bg-gray-50 p-7">
					<Title
						text={product.name}
						size="md"
						className="font-extrabold mb-1"
					/>
					<p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
					<ProductVariantSelector
						selectedValue="1"
						items={[
							{
								name: 'Маленькая',
								value: '1',
							},
							{
								name: 'Средняя',
								value: '2',
							},
							{
								name: 'Большая',
								value: '3',
								disabled: true,
							},
						]}
					/>
				</div>
			</div>
		</Container>
	)
}