import { AdminMenu, Container, Header } from "@/components/shared"
import s from '@/app/(admin)/layout.module.scss'
import { Suspense } from "react"

export const metadata = {
  title: 'Academy Pizza | Admin',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense>
        <Header
          hasSearchInput={false}
          hasCartButton={false}
        />
      </Suspense>
      <Container className={s.adminLayout__wrapper}>
        <AdminMenu />
        <section className={s.adminLayout__content}>
          {children}
        </section>
      </Container>
    </>
  )
}
