/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DADATA_API_TOKEN: process.env.DADATA_API_TOKEN,
	},
};

export default nextConfig;
