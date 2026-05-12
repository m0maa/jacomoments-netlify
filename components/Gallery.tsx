'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import staticPhotos from '@/data/static-photos.json'

interface Photo {
  filename: string
  category: string
  url: string
}

interface Category {
  id: string
  name: string
  slug: string
}

const categoryNames: Record<string, string> = {
  'nunta': 'Nunți',
  'botez': 'Botezuri',
  'sedinta': 'Ședințe Foto',
  'evenimente': 'Evenimente',
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const categories: Category[] = useMemo(() => {
    const uniqueCategories = new Set(staticPhotos.photos.map(p => p.category))
    return [
      { id: 'all', name: 'Toate', slug: 'all' },
      ...Array.from(uniqueCategories).map((slug): Category => ({
        id: slug,
        name: categoryNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1),
        slug,
      })),
    ]
  }, [])

  const currentPhotos: Photo[] = useMemo(() => {
    if (selectedCategory === 'all') {
      return staticPhotos.photos
    }
    return staticPhotos.photos.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section className="relative min-h-screen py-32 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-dots opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] text-accent mb-4">PORTOFOLIU</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
            Galerie Foto
          </h1>
          <div className="w-16 h-px bg-secondary/50 mx-auto" />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-2 transition-all duration-300 tracking-wider text-sm ${
                selectedCategory === category.slug
                  ? 'bg-secondary text-primary'
                  : 'border border-secondary/30 hover:border-secondary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {currentPhotos.map((photo, index) => (
            <motion.div
              key={`${photo.filename}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => setLightboxImage(photo.url)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.category}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 w-full"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Lightbox image"
                className="max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
