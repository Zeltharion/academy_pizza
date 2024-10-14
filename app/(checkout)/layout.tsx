import { Container, Header } from "@/components/shared"
import { Suspense } from "react"

export const metadata = {
	title: 'Academy Pizza | Корзина',
}

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="min-h-screen bg-light">
			<Container>
				<Suspense>
					<Header
						classname="border-b-gray-200"
						hasSearchInput={false}
						hasCartButton={false}
					/>
				</Suspense>
				{children}
			</Container>
		</main>
	)
}
