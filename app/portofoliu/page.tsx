import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamically import Gallery with SSR disabled
const GalleryNoSSR = dynamic(() => import('@/components/Gallery'), { ssr: false })
const NavigationNoSSR = dynamic(() => import('@/components/Navigation'), { ssr: false })
const FooterNoSSR = dynamic(() => import('@/components/Footer'), { ssr: false })

export const metadata: Metadata = {
  title: 'Portofoliu | Jaco Moments - Fotograf Nuntă',
  description: 'Galerie foto completă cu nunți, botezuri și ședințe foto. Moment autentice și emoții capturate.',
  keywords: 'portofoliu fotograf nuntă, galerie foto, fotograf profesionist',
  openGraph: {
    title: 'Portofoliu | Jaco Moments - Fotograf Nuntă',
    description: 'Galerie foto cu momente autentice de la nunți și evenimente',
    type: 'website',
    locale: 'ro_RO',
  },
}

export default function PortfolioPage() {
  return (
    <>
      <NavigationNoSSR />
      <main className="min-h-screen bg-primary text-secondary">
        <GalleryNoSSR />
      </main>
      <FooterNoSSR />
    </>
  )
}
