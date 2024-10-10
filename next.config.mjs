/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		DADATA_API_TOKEN: process.env.DADATA_API_TOKEN,
		RESEND_API_TOKEN: process.env.RESEND_API_TOKEN,
		YOOKASSA_API_TOKEN: process.env.YOOKASSA_API_TOKEN,
		YOOKASSA_RETURN_URL: process.env.YOOKASSA_RETURN_URL,
		YOOKASSA_SHOP_ID: process.env.YOOKASSA_SHOP_ID,
	},
};

export default nextConfig;
