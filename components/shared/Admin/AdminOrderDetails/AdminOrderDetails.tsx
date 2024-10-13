import { Order } from "@prisma/client";
import { Badge } from "@/components/ui";
import { DELIVERY_PRICE, TAX, Title } from "@/components/shared";
import { cn, formatNumberToMoney } from "@/shared/lib";
import { CartItemDTO } from "@/shared/dto";
import { mapPizzaSize, mapPizzaType } from "@/shared/constants";
import s from './AdminOrderDetails.module.scss'

interface IAdminOrderDetails {
	values: Order;
	items: CartItemDTO[];
	className?: string;
}

export const AdminOrderDetails: React.FC<IAdminOrderDetails> = ({
	values,
	items,
	className
}) => {
	if (!values) {
		return null;
	}

	return (
		<div className={cn(s.adminOrderDetails, className)}>
			<div className="p-10">
				<div className={s.adminOrderDetails__title}>
					<Title
						text={`Заказ #${values.id}`}
						size="xl"
						className="font-extrabold"
					/>
					<Badge className={cn(s.adminOrderDetails__status, {
						SUCCEEDED: [s.status__succeeded],
						CANCELLED: [s.status__cancelled],
						PENDING: [s.status__pending],
					}[values.status])}
					>
						{{
							SUCCEEDED: 'Успешно',
							CANCELLED: 'Отменен',
							PENDING: 'В процессе',
						}[values.status]}
					</Badge>
				</div>

				<div className={s.adminOrderDetails__personalInfo}>
					<span>Адрес: <b>{values.address}</b></span>
					<span>Имя: <b>{values.fullName}</b></span>
					<span>Почта: <b>{values.email}</b></span>
					<span>Телефон: <b>{values.phone}</b></span>
					<span>Комментарий: <b>{values.comment}</b></span>
				</div>

				{items.map(item => (
					<div key={item.id}>
						<ul className={s.adminOrderDetails__products__wrapper}>
							<img
								src={item.productVariant.product.imageUrl}
								alt={item.productVariant.product.name}
								className={s.adminOrderDetails__products__image}
							/>
							<div className={s.adminOrderDetails__products}>
								<div className={s.adminOrderDetails__products__title_wrapper}>
									<Title
										text={item.productVariant.product.name}
										size="sm"
										className={s.adminOrderDetails__products__title}
									/>
									{item.productVariant.pizzaType && item.productVariant.size && (
										<p>{mapPizzaType[item.productVariant.pizzaType as keyof typeof mapPizzaType]}, {" "}
											{mapPizzaSize[item.productVariant.size as keyof typeof mapPizzaSize].toLocaleLowerCase()}{" "}
											({item.productVariant.size} см)
										</p>
									)}
								</div>
								<div className={s.adminOrderDetails__products__ingredients}>
									{item.ingredients.map((ingredient) => (
										<div key={ingredient.id} className={s.adminOrderDetails__products__ingredients__item}>
											<img
												src={ingredient.imageUrl}
												alt={ingredient.name}
											/>
											<span className="text-sm">+{formatNumberToMoney(ingredient.price)}</span>
										</div>
									))}
								</div>
								<div className={s.adminOrderDetails__products__price}>
									<b>Кол-во:{" "}
										<span className={s.adminOrderDetails__products__price__quantity}>
											{item.quantity} шт.
										</span>
									</b>
									<b>Цена:{" "}
										<span className={s.adminOrderDetails__products__price__priceWithQuantity}>{
											formatNumberToMoney(item.productVariant.price * item.quantity)}
										</span>
									</b>
								</div>
							</div>
						</ul>
					</div>
				))}
			</div>
			<hr />
			<div className={s.adminOrderDetails__summary}>
				<div className={s.adminOrderDetails__summary__wrapper}>
					<Title
						text="Сборы:"
						size="sm"
						className="font-semibold"
					/>
					<span className="text-neutral-400 text-xl">{formatNumberToMoney(Math.floor((values.totalAmount * TAX) / 100))}</span>
				</div>
				<div className={s.adminOrderDetails__summary__wrapper}>
					<Title
						text="Доставка:"
						size="sm"
						className="font-semibold"
					/>
					<span className="text-neutral-400 text-xl">{formatNumberToMoney(DELIVERY_PRICE)}</span>
				</div>
				<div className={s.adminOrderDetails__summary__wrapper}>
					<Title
						text="Итог:"
						size="md"
						className="font-extrabold"
					/>
					<b className="text-primary text-3xl">{formatNumberToMoney(values.totalAmount)}</b>
				</div>
			</div>
		</div>
	)
}