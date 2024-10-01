export const metadata = {
  title: 'Next Pizza | Admin',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
    </main>
  )
}
