'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Import components dynamically to avoid SSR issues with LanguageContext
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false })
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false })
const GalleryPreview = dynamic(() => import('@/components/GalleryPreview'), { ssr: false })
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: false })
const PricingSection = dynamic(() => import('@/components/PricingSection'), { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: false })
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })

export default function HomePage() {
  return (
    <main className="min-h-screen bg-primary text-secondary overflow-hidden">
      <div className="fixed inset-0 pointer-events-none geometric-pattern opacity-30" />
      <div className="fixed inset-0 pointer-events-none geometric-dots opacity-20" />

      <Navigation />
      <HeroSection />
      <GalleryPreview />
      <AboutSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
