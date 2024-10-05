'use client'

import { useRouter } from "next/navigation"
import { cn } from "@/shared/lib/utils"
import { Dialog } from "@/components/ui"
import { ProductFormsContainer } from "@/components/shared"
import { DialogContent } from "@/components/ui/dialog"
import { IProductModal } from "./ProductModal.types"
import s from './ProductModal.module.scss'

export const ProductModal: React.FC<IProductModal> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent className={cn(s.productModal, className)}>
				<ProductFormsContainer
					product={product}
					onSubmit={() => router.back()}
				/>
			</DialogContent>
		</Dialog>
	)
}