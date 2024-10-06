import { Container, Header } from "@/components/shared"

export const metadata = {
	title: 'Next Pizza | Корзина',
}

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="min-h-screen bg-[#F4F1EE]">
			<Container>
				<Header
					classname="border-b-gray-200"
					hasSearchInput={false}
					hasCartButton={false}
				/>
				{children}
			</Container>
		</main>
	)
}
