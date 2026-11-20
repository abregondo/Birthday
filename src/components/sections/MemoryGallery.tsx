import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { PHOTOS, type Photo } from '../../config/site.config'
import GoldOrnament from '../ui/GoldOrnament'
import Lightbox from '../ui/Lightbox'
import PlaceholderFrame from '../ui/PlaceholderFrame'

const EASE = [0.22, 1, 0.36, 1] as const

const TILT = [-1.4, 1, -0.6]

function PhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: Photo
  index: number
  onOpen: () => void
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(photo.src) && !failed
  const tilt = TILT[index % TILT.length]

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 46, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: EASE }}
      whileHover={{ y: -8, rotate: 0 }}
      className="group mb-6 block w-full break-inside-avoid rounded-[14px] border border-gold/30 bg-cream p-3 pb-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:border-gold/70 hover:shadow-[0_26px_60px_rgba(0,0,0,0.55),0_0_28px_rgba(198,161,91,0.25)] focus:outline-none focus:ring-2 focus:ring-gold/70"
    >
      <div className="relative overflow-hidden rounded-[8px]">
        {showImage ? (
          <img
            src={photo.src}
            alt="A memory of us"
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            style={{
              aspectRatio:
                photo.size === 'tall'
                  ? '3 / 4'
                  : photo.size === 'wide'
                    ? '4 / 3'
                    : '1 / 1',
            }}
          />
        ) : (
          <div className="transition-transform duration-700 group-hover:scale-[1.04]">
            <PlaceholderFrame shape={photo.size ?? 'normal'} />
          </div>
        )}
        <span className="pointer-events-none absolute inset-0 rounded-[8px] ring-1 ring-gold/25 ring-inset" />
      </div>
    </motion.button>
  )
}

export default function MemoryGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section
      id="memories"
      className="relative px-4 py-24 sm:py-32"
      aria-labelledby="memories-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-body text-[11px] tracking-[0.42em] text-gold uppercase">
            Our Memories
          </p>
          <h2
            id="memories-title"
            className="gold-text mt-4 font-display text-4xl font-semibold sm:text-5xl md:text-6xl"
          >
            A Gallery of Us
          </h2>
          <GoldOrnament className="mx-auto mt-7" />
          <p className="mt-6 font-body text-[15px] leading-relaxed text-cream/75">
            Every picture here holds a little piece of us — moments I never
            want to forget.
          </p>
        </motion.header>

        {/* masonry */}
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {PHOTOS.map((photo, index) => (
            <PhotoCard
              key={`${photo.src}-${index}`}
              photo={photo}
              index={index}
              onOpen={() => setLightboxIndex(index)}
            />
          ))}
        </div>

        {PHOTOS.length === 0 && (
          <p className="mt-14 text-center font-hand text-2xl text-cream/60">
            Nothing here yet — but soon, I&apos;ll fill it with us.
          </p>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && PHOTOS[lightboxIndex] && (
          <Lightbox
            photos={PHOTOS}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
