import type { Metadata } from "next";
import { Header } from "@/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Academy Pizza",
};

export default function ClientLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
