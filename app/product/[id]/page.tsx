import { Container } from "@/components/shared";

export default function ProductPage({ params: { id } }: { params: { id: string } }) {
	return (
		<Container>
			<h1>Product {id}</h1>
		</Container>
	)
}