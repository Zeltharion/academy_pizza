import { prisma } from "@/prisma/prismaClient";
import { getUserSession } from "@/shared/lib/getUserSession";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const user = await getUserSession();
		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const data = await prisma.user.findFirst({
			where: {
				id: Number(user.id),
			},
			select: {
				fullName: true,
				email: true,
				password: false,
			},
		})

		return NextResponse.json(data);
	} catch (error) {
		console.error("[API_AUTH_ME]: ", error);
		return NextResponse.json({ message: "[API_AUTH_ME] Server error" }, { status: 500 });
	}
}