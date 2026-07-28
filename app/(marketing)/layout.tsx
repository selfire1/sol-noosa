import Providers from '@/lib/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
    </Providers>
  )
}
