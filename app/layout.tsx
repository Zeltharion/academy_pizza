import { Nunito } from "next/font/google";
import { Footer, Providers } from "@/components/shared";
import "./globals.css";

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link data-rh="true" rel="icon" href="/favicon.ico" />
			</head>
			<body className={`${nunito.className} antialiased`}>
				<Providers>
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
