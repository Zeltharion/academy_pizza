import { InfoBlock } from "@/components/shared";

export default function UnauthorizedPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Доступ запрещен"
				text="Пожалуйста, войдите в аккаунт или зарегистрируйтесь"
				imageUrl="/assets/images/forbidden.svg"
			/>
		</div>
	)
}