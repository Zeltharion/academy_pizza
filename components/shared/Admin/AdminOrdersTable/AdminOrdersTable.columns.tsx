import {
	Button,
	Checkbox,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui";
import urls from "@/shared/config/urls";
import { formatNumberToMoney } from "@/shared/lib";
import { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Ellipsis } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Order>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				className="rounded-[8px] w-6 h-6"
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				className="rounded-[8px] w-6 h-6"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("id")}</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Время",
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt"));
			return (
				<div className="capitalize">
					{date.toLocaleString("ru", {
						year: "2-digit",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					})}
				</div>
			);
		},
	},
	{
		accessorKey: "fullName",
		header: "Заказчик",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("fullName")}</div>
		)
	},
	{
		accessorKey: "status",
		header: "Статус",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			switch (status) {
				case "SUCCEEDED":
					return <div>Успешно</div>;
				case "PENDING":
					return <div>В процессе</div>;
				case "CANCELLED":
					return <div>Отменен</div>;
				default:
					return <div className="capitalize">{status}</div>;
			}
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Почта
					<ChevronsUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div>{row.getValue("email")}</div>,
	},
	{
		accessorKey: "totalAmount",
		header: () => <div className="text-right">Сумма</div>,
		cell: ({ row }) => {
			const amount = parseInt(row.getValue("totalAmount"))

			const formatted = formatNumberToMoney(amount)

			return <div className="text-right font-medium">{formatted}</div>
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const order = row.original
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Открыть меню</span>
							<Ellipsis size={16} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Действия</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(order.id))}>
							Скопировать ID Заказа
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(order.paymentId))}>
							Скопировать ID Оплаты
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href={`${urls.admin_orders}/${order.id}`}>
								Подробнее
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]