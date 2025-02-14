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
			<body className={`${nunito.className} antialiased min-h-screen flex flex-col`}>
				<Providers>
					<main className="flex-1">{children}</main>
					<Footer className="mt-auto" />
				</Providers>
			</body>
		</html>
	);
}

