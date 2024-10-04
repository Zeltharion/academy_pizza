import { cn } from "@/shared/lib";
import s from './CartDrawer.module.scss'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

interface ICartDrawer {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<ICartDrawer>> = ({
	className,
	children
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className={s.cartDrawer__content}>
				<SheetHeader>
					<SheetTitle>
						В корзине
						<span className="font-bold">{' 2 '} товара</span>
					</SheetTitle>
				</SheetHeader>

				<SheetFooter className={s.cartDrawer__footer}>
					<div className="w-full">
						<div className={s.cartDrawer__footer__totalPrice}>
							<span className={s.cartDrawer__footer__totalPrice__label}>
								Итого
								<div className={s.cartDrawer__footer__totalPrice__line} />
							</span>
							<span className={s.cartDrawer__footer__totalPrice__price}>500 ₽</span>
						</div>
					</div>

					<Link href="/cart">
						<Button
							type="submit"
							className={s.cartDrawer__footer__button}
						>
							Оформить заказ
							<ArrowRight className="w-5 ml-2"/>
						</Button>
					</Link>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}