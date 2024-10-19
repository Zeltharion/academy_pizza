import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button, SheetClose } from "@/components/ui";
import { Title } from "@/components/shared";
import { cn } from "@/shared/lib"
import s from './CartEmpty.module.scss'

interface ICartEmpty {
	className?: string;
	drawer?: boolean;
}

export const CartEmpty: React.FC<ICartEmpty> = ({
	drawer = false,
	className
}) => {

	return (
		<div className={cn(s.cartEmpty, className)}>
			<Image
				src="/assets/images/emptyCartBox.png"
				alt="Empty cart"
				width={120}
				height={120}
			/>
			<Title
				size="md"
				text="Корзина пустая"
				className={s.cartEmpty__title}
			/>
			<p className={s.cartEmpty__text}>
				Добавьте хотя бы одну пиццу в корзину, а можно и две :&#41;
			</p>
			{drawer ? (
				<SheetClose>
					<Button className={s.cartEmpty__button} size="lg">
						<ArrowLeft className="w-5 mr-2" />
						Вернуться назад
					</Button>
				</SheetClose>
			) : (
				<Button className={s.cartEmpty__button} size="lg">
					<ArrowLeft className="w-5 mr-2" />
					Вернуться назад
				</Button>
			)}
		</div>
	)
}