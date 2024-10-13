"use client"

import * as React from "react"
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	Input,
	Button,
	Skeleton
} from "@/components/ui"

import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
} from "lucide-react"
import toast from "react-hot-toast"
import { Order } from "@prisma/client"
import { Api } from "@/shared/services"
import { columns } from "./AdminOrdersTable.columns"
import s from './AdminOrdersTable.module.scss'

export const AdminOrdersTable: React.FC = () => {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [orders, setOrders] = React.useState<Order[]>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		async function fetchOrders() {
			setIsLoading(true);
			try {
				const data = await Api.orders.getAllOrders()
				setOrders(data);
			} catch (error) {
				console.error("[ADMIN_ORDERS_TABLE] Error: ", error);
				toast.error("Произошла ошибка при получении списка заказов");
			} finally {
				setIsLoading(false);
			}
		}

		fetchOrders();
	}, [setOrders, setIsLoading])

	const table = useReactTable({
		data: orders,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		initialState: {
			columnVisibility: { id: false },
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className={s.adminOrdersTable}>
			<div className={s.adminOrdersTable__header}>
				<Input
					placeholder="Поиск по почте..."
					value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("email")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							Настроить <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value: any) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className={s.adminOrdersTable__body}>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : isLoading ? (
							<TableRow key={"loading"}>
								{columns.map((column) => (
									<TableCell key={column.id}>
										<Skeleton className="w-full h-[20px]" />
									</TableCell>
								))}
							</TableRow>
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Ничего не найдено.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2">
				<span className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredRowModel().rows.length} заказ(ов)
				</span>
				<div className="space-x-2">
					<Button
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft size={16} />
					</Button>
					<Button
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight size={16} />
					</Button>
				</div>
			</div>
		</div>
	)
}
