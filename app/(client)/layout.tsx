import type { Metadata } from "next";
import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Next Pizza",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
