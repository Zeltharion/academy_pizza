'use client'

import { cn } from "@/lib/utils"
import { Dialog } from "@/components/ui"
import { Title } from "@/components/shared"
import { Product } from "@prisma/client"
import { DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import s from './ProductModal.module.scss'

interface IProductModal {
	product: Product;
	className?: string;
}

export const ProductModal: React.FC<IProductModal> = ({ product, className }) => {
	const rounter = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => rounter.back()}>
			<DialogContent className={cn(s.productModal, className)}>
				<Title text={product.name}/>
			</DialogContent>
		</Dialog>
	)
}