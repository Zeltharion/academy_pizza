import { Button } from "@/components/ui";
import { cn } from "@/shared/lib";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { CartDrawer } from "@/components/shared";

interface ICartButton {
	className?: string;
}

export const CartButton: React.FC<ICartButton> = ({ className }) => {
	return (
		<CartDrawer>
			<Button className={cn('group relative', className)}>
				<b>520 ₽</b>
				<span className='h-full w-[1px] bg-white/30 mx-3' />
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart
						className='relative'
						strokeWidth={2}
						size={16} />
					<b>3</b>
				</div>
				<ArrowRight
					className='right-5 absolute transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
					size={20} />
			</Button>
		</CartDrawer>
	)
}