'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import staticPhotos from '@/data/static-photos.json'

export default function GalleryPreview() {
  const previewPhotos = useMemo(() => staticPhotos.photos.slice(0, 6), [])

  return (
    <section id="portofoliu" className="relative py-32 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-dots opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] text-accent mb-4">PORTOFOLIU</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Momentele Capturate
          </h2>
          <div className="w-16 h-px bg-secondary/50 mx-auto mb-6" />
          <p className="text-secondary/70 max-w-2xl mx-auto">
            Fiecare eveniment are o poveste unică. Iată câteva dintre momentele pe care le-am capturat.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {previewPhotos.map((photo, index) => (
            <motion.div
              key={`${photo.filename}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden group"
            >
              <img
                src={photo.url}
                alt={photo.category}
                className="object-cover transition-transform duration-700 group-hover:scale-110 w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/portofoliu">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-secondary text-primary hover:bg-white transition-all duration-300 tracking-wider text-sm"
            >
              VEZI TOT PORTOFOLIUL
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
