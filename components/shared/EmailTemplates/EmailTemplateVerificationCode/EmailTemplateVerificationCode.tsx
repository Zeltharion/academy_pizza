import { EmailTemplate } from "@/components/shared";

interface IEmailTemplateVerificationCode {
	code: string;
}

export const EmailTemplateVerificationCode: React.FC<IEmailTemplateVerificationCode> = ({ code }) => {
	return (
		<EmailTemplate title="Код подтверждения">
			<p>Ваш код подтверждения: <b>{code}</b></p>
			<a href={`${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_API_URL}/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
			<p>Если вы не регистрировались на нашем сайте, пожалуйста, проигнорируйте это письмо</p>
		</EmailTemplate>
	)
}