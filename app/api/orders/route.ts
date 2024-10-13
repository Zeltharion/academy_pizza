import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
	const orders = await prisma.order.findMany();

	return NextResponse.json(orders);
}